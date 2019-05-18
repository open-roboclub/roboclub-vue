const targaryen = require('targaryen/plugins/jest')

const rules = targaryen.json.loadSync('database.rules.json')

expect.extend({
  toAllowRead: targaryen.toAllowRead,
  toAllowUpdate: targaryen.toAllowUpdate,
  toAllowWrite: targaryen.toAllowWrite
})

describe('A set of rules and data', function() {
  const database = targaryen.getDatabase(rules, {
    admins: {
      admin: true
    }
  })

  it('should allow un/authenticated user to read public routes', function() {
    const routes = [
      '/news',
      '/projects',
      '/team/current',
      '/ui',
      '/contribution',
      '/robocon',
      '/robovoyage',
      '/downloads'
    ]

    for (const route of routes) {
      expect(database.as(targaryen.users.unauthenticated)).toAllowRead(route)
    }
  })
})
