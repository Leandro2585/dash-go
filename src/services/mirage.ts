import { ActiveModelSerializer, createServer, Factory, Model } from 'miragejs'
import faker from '@faker-js/faker'

type User = {
  name: string
  email: string
  created_at: string
}

export const makeHttpServer = () => {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },
    models: {
      user: Model.extend<Partial<User>>({})
    },
    factories: {
      user: Factory.extend({ 
        name() {
          return faker.name.findName()
        }, 
        email() {
          return faker.internet.email().toLowerCase()
        }, 
        createdAt() {
          return faker.date.recent(10)
        }
      })
    },
    seeds(server) {
      server.createList('user', 10)
    },
    routes() {
      this.namespace = 'api'
      this.timing = 750
      this.get('/users', function(schema, req) {
        const { page = 1, per_page = 10 } = req.queryParams
        const total = schema.all('user').length
        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)
        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd)
        return new Response(users, {  headers: { ['x-total-count']: String(total) }, status: 200 })
      });
      this.get('/users/:id')
      this.post('/users')
      this.namespace = ''
      this.passthrough()
    }
  })
  return server
}