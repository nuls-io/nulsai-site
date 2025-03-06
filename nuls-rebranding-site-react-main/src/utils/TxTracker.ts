import { JsonRpcApiProvider } from 'ethers'
import EventEmitter from 'eventemitter3'

export interface TxTrackerTx {
  createdAt: number
  hash: string | null
  state: 'pending' | 'confirmed' | 'failed' | 'internalError'
  error: string
  title: string
}

const defaultTx: TxTrackerTx = {
  createdAt: 0,
  hash: '',
  state: 'pending',
  error: '',
  title: '',
}

export default class TxTracker extends EventEmitter<'txChange'> {
  // private interval = 1_000
  private map: { [tx: string]: TxTrackerTx } = {}

  constructor(private readonly provider: JsonRpcApiProvider) {
    super()
  }

  track(txHash: string, title: string = ''): TxTrackerTx {
    if (this.map[txHash]) return this.map[txHash]
    this.map[txHash] = {
      ...defaultTx,
      hash: txHash,
      title,
      createdAt: new Date().getTime(),
    }
    const updateState = async (): Promise<void> => {
      const tx = await this.provider.waitForTransaction(txHash)
      if (tx) {
        this.map[txHash].state = tx.status === 1 ? 'confirmed' : 'failed'

        this.emit('txChange', this.map[txHash])
      }
    }
    updateState().catch((e) => {
      this.map[txHash].state = 'internalError'
      this.map[txHash].error = e.message

      this.emit('txChange', this.map[txHash])
    })
    return this.map[txHash]
  }
}
