import db, { environment } from '../config/knex'
import app from './app'

db.raw('SELECT 1')
  .then(() => {
    console.log(`Server Ready on ${environment}`)
  })
  .catch((e) => {
    console.warn('PostgreSQL not connected!')
    console.warn(e)
  })

app.listen(process.env.PORT ?? 8086, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/api/v1/cars`)
})
