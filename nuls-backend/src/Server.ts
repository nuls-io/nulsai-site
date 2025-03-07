import '@tsed/platform-log-request' // remove this import if you don&#x27;t want log request
import '@tsed/platform-express' // /!\ keep this import
import '@tsed/ajv'

import { Configuration } from '@tsed/di'
import { application } from '@tsed/platform-http'
import { join } from 'path'

import { config } from './config/index.js'
import * as rest from './controllers/rest/index.js'

@Configuration({
  ...config,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  ajv: {
    returnsCoercedValues: true,
  },
  mount: {
    '/rest': [...Object.values(rest)],
  },
  middlewares: [
    'cors',
    'cookie-parser',
    'compression',
    'method-override',
    'json-parser',
    { use: 'urlencoded-parser', options: { extended: true } },
  ],
  views: {
    root: join(process.cwd(), '../views'),
    extensions: {
      ejs: 'ejs',
    },
  },
  exclude: ['**/*.spec.ts'],
  statics: {
    '/': [
      {
        root: `./public`,
        // Optional
        hook: '$beforeRoutesInit', // Load statics on the expected hook. Default: $afterRoutesInit
        // ... statics options
      },
    ],
  },
})
export class Server {
  protected app = application()
}
