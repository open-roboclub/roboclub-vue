const targaryen = require('targaryen/plugins/jest')

const rules = targaryen.json.loadSync('database.rules.json')

expect.extend({
  toAllowRead: targaryen.toAllowRead,
  toAllowUpdate: targaryen.toAllowUpdate,
  toAllowWrite: targaryen.toAllowWrite
})

describe('A set of rules and data', function() {
  const database = targaryen.getDatabase(rules, {
    users: {
      test: {
        name: 'Test User'
      },
      admin: {
        name: 'Admin'
      }
    },
    admins: {
      admin: true
    }
  })

  it('should not allow un/authenticated user to read admins', function() {
    expect(database.as(targaryen.users.unauthenticated)).not.toAllowRead(
      '/admins'
    )
    expect(database.as({ uid: 'test' })).not.toAllowRead('/admins')

    expect(database.as(targaryen.users.unauthenticated)).not.toAllowRead(
      '/admins/admin'
    )
    expect(database.as({ uid: 'test' })).not.toAllowRead('/admins/admin')
  })

  it('should not allow un/authenticated user to write admins', function() {
    expect(database.as(targaryen.users.unauthenticated)).not.toAllowWrite(
      '/admins/test',
      true
    )
    expect(database.as({ uid: 'test' })).not.toAllowWrite('/admins/test', true)
  })

  it('should not allow admin user to read admins', function() {
    expect(database.as({ uid: 'admin' })).not.toAllowRead('/admins')
  })

  it('should allow admin user to read itself', function() {
    expect(database.as({ uid: 'admin' })).toAllowRead('/admins/admin')
  })

  it('should not allow admin user to write admins', function() {
    expect(database.as({ uid: 'admin' })).not.toAllowWrite('/admins', {})
    expect(database.as({ uid: 'admin' })).not.toAllowWrite('/admins/test', true)
    expect(database.as({ uid: 'admin' })).not.toAllowWrite(
      '/admins/admin',
      true
    )
    expect(database.as({ uid: 'admin' })).not.toAllowWrite('/admins', {
      test: true,
      admin: true
    })
  })
})
