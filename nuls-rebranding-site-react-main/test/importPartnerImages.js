import fs, { createWriteStream } from 'fs'
import path from 'path'
import axios from 'axios'
const items = JSON.parse(
  fs.readFileSync('./src/views/Partners/items.json').toString()
)

const { investers, strategic, exchange, crossChain } = items

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = createWriteStream(outputLocationPath)

  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then((response) => {
    //ensure that the user can call `then()` only when the file has
    //been downloaded entirely.

    return new Promise((resolve, reject) => {
      response.data.pipe(writer)
      let error = null
      writer.on('error', (err) => {
        error = err
        writer.close()
        reject(err)
      })
      writer.on('close', () => {
        if (!error) {
          resolve(true)
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      })
    })
  })
}

async function main() {
  for (const url of investers) {
    console.log(`Downloading ${url}`)
    const filename = path.basename(url)
    await downloadFile(
      `https://site.nuls.io${url}`,
      `./public/partners/investers/${filename}`
    )
  }
  for (const url of strategic) {
    console.log(`Downloading ${url}`)
    const filename = path.basename(url)
    await downloadFile(
      `https://site.nuls.io${url}`,
      `./public/partners/strategic-partners/${filename}`
    )
  }
  for (const url of exchange) {
    console.log(`Downloading ${url}`)
    const filename = path.basename(url)
    await downloadFile(
      `https://site.nuls.io${url}`,
      `./public/partners/exchanges/${filename}`
    )
  }
  for (const url of crossChain) {
    console.log(`Downloading ${url}`)
    const filename = path.basename(url)
    await downloadFile(
      `https://site.nuls.io${url}`,
      `./public/partners/cross-chain-support/${filename}`
    )
  }
}
main()
