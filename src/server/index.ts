import express from 'express'
import session from 'cookie-session'
import { api, entities } from './api'
import compression from 'compression'
import { remult } from 'remult'
import remultAdmin from 'remult-admin'

export const app = express()
app.use(
  '/api',
  session({
    secret: process.env['SESSION_SECRET'] || 'dev secret',
    maxAge: 365 * 24 * 60 * 60 * 1000, // to remember the user between sessions
  })
)

app.use(api)

app.get('/api/admin/*', api.withRemult, (_, res) =>
  remult.isAllowed('admin') || true
    ? res.send(remultAdmin({ entities, baseUrl: '/api/admin' }))
    : res.send(404)
)

//app.use(helmet())
app.use(compression())
const frontendFiles = process.cwd() + '/dist'
app.use(express.static(frontendFiles))
app.get('/*', (_, res) => {
  res.sendFile(frontendFiles + '/index.html')
})
app.listen(process.env['PORT'] || 3002, () => console.log('Server started'))
