const str = 'IQMo6x8u9hUhhIo//cK/gwnMlAAaXr5Ie+IgSdAuNMlP0A=='
const buf = Buffer.from(str, 'base64')

const u8arr = Uint8Array.from(buf)

const hex = buf.toString('hex')

console.log(u8arr)


210328eb1f2ef61521848a3ffdc2bf8309cc94001a5ebe487be22049d02e34c94fd0
0328eb1f2ef61521848a3ffdc2bf8309cc94001a5ebe487be22049d02e34c94fd0