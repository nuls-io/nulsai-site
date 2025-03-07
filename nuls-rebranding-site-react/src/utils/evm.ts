import {
  JsonRpcProvider,
  Provider,
  TransactionReceipt,
  TransactionResponse,
} from 'ethers'
import { sleep } from './index'

async function awaitPollConfirmations(
  debug: (...attr: any[]) => void,
  txHash: string,
  provider: Provider,
  interval = 2_000
): Promise<TransactionReceipt> {
  debug('poll for confirmations...')
  let fetching = true
  let ret: TransactionReceipt
  while (fetching) {
    try {
      const tx = await provider.getTransactionReceipt(txHash)
      if (tx) {
        fetching = false
        ret = tx
        debug('poll received', tx)
        break
      }
      debug('poll null')
    } catch (error) {
      debug(error)
    }
    await sleep(interval)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return ret!
}

async function awaitWaitConfirmations(
  debug: (...attr: any[]) => void,
  tx: TransactionResponse
): Promise<TransactionReceipt> {
  debug('waiting for confirmations...')
  const ret = await tx.wait()
  debug('confirmations received', ret)
  if (!ret) {
    throw new Error('wait confirmations failed')
  }
  return ret
}

export async function awaitConfirmations(
  tx: TransactionResponse,
  interval = 2_000
): Promise<TransactionReceipt> {
  console.log('start waiting for confirmations...')
  const debug = (...attr: any[]) => console.log(new Date().toString(), ...attr)

  debug('tx hash', tx.hash)

  try {
    awaitPollConfirmations(
      debug,
      tx.hash,
      new JsonRpcProvider((window as any).CONSTS.POLL_RPC),
      interval
    ).then((receipt) => receipt)
    const ret = await Promise.any([
      awaitWaitConfirmations(debug, tx),
      awaitPollConfirmations(
        debug,
        tx.hash,
        new JsonRpcProvider((window as any).CONSTS.POLL_RPC),
        interval
      ),
    ])
    return ret
  } catch (error) {
    const e = error as AggregateError
    throw new Error(`${e.message}`)
  }
}
