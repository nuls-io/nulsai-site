import fs, { createWriteStream } from 'fs'
import path from 'path'
import axios from 'axios'

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

const ecoItems = JSON.parse(
  fs.readFileSync('./src/views/Ecosystem/items.json').toString()
)
const comItems = JSON.parse(
  fs.readFileSync('./src/views/Community/councillors.json').toString()
)

async function main() {
  // for (const item of ecoItems) {
  //   const url = `https://site.nuls.io/${item.src}`
  //   console.log(`Downloading ${url}`)
  //   const filename = path.basename(url)
  //   await downloadFile(url, `./public/ecosystem/${filename}`)
  // }
  for (const item of comItems) {
    const url = `https://site.nuls.io/${item.image}`
    console.log(`Downloading ${url}`)
    const filename = path.basename(url)
    await downloadFile(url, `./public/community/${filename}`)
  }
}
main()
