import { Controller } from '@tsed/di'
import { Get } from '@tsed/schema'
import axios from 'axios'
import { load } from 'cheerio'
import { LazyMap } from 'useless-helpers'

import APIResponse from '../../models/APIResponse.js'

@Controller('/media')
export class MediaController {
  static cache: LazyMap<string, any> = new LazyMap(
    async (key) => {
      if (key === 'medium') {
        const resp = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nuls')
        const items = resp.data.items
        return items.map((item: any) => {
          const $ = load(item.description)
          const imgDiv = $('img').first()
          const imgUrl = imgDiv ? imgDiv.attr('src') : ''
          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            imgUrl,
          }
        })
      }
      return 'hello'
    },
    1000 * 60 * 60,
  )
  @Get('/medium')
  async getMediumJson() {
    const data = await MediaController.cache.get('medium')
    return APIResponse.Ok(data)
  }
}
