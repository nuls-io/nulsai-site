import { Controller } from '@tsed/di'
import { Get } from '@tsed/schema'
import axios from 'axios'
import { LazyMap } from 'useless-helpers'

import APIResponse from '../../models/APIResponse.js'

@Controller('/stat')
export class StatController {
  static cache: LazyMap<string, any> = new LazyMap(
    async (key) => {
      if (key !== 'stat') return null
      const accountDataResp = await axios.post('https://public1.nuls.io/jsonapi', {
        jsonrpc: '2.0',
        method: 'getAssetRanking',
        params: [1, 1, 1, 1, 1],
        id: 350,
      })
      const nodeDataResp = await axios.post('https://public1.nuls.io/jsonapi', {
        jsonrpc: '2.0',
        method: 'getConsensusNodeCount',
        params: [1],
        id: 53,
      })
      const blockDataResp = await axios.post('https://public1.nuls.io', { jsonrpc: '2.0', method: 'getInfo', params: [1], id: 350 })
      const nulsScanResp = await axios.get('https://nulscan.io/api/api/nuls/assets/get')
      return {
        totalCount: accountDataResp.data.result.totalCount,
        nodeCount: nodeDataResp.data.result.agentCount,
        blockData: blockDataResp.data.result,
        scanData: nulsScanResp.data.data,
      }
    },
    1000 * 60 * 5,
  )

  @Get('/')
  async getStat() {
    const data = await StatController.cache.get('stat')
    return APIResponse.Ok(data)
  }
}
