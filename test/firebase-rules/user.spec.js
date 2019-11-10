const targaryen = require('targaryen/plugins/jest')

const rules = targaryen.json.loadSync('database.rules.json')

expect.extend({
  toAllowRead: targaryen.toAllowRead,
  toAllowUpdate: targaryen.toAllowUpdate,
  toAllowWrite: targaryen.toAllowWrite
})

describe('Admin Access Tests', function() {
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

  it('should not allow un/authenticated user to read users', function() {
    expect(database.as(targaryen.users.unauthenticated)).not.toAllowRead(
      '/users'
    )
    expect(database.as({ uid: 'test' })).not.toAllowRead('/users/admin')

    expect(database.as(targaryen.users.unauthenticated)).not.toAllowRead(
      '/users/test'
    )
  })

  it('should allow admin user to read users', function() {
    expect(database.as({ uid: 'admin' })).toAllowRead('/users')
    expect(database.as({ uid: 'admin' })).toAllowRead('/users/test')
  })

  it('should not allow un/authenticated user to write users', function() {
    expect(
      database.as(targaryen.users.unauthenticated)
    ).not.toAllowWrite('/users', { xyz: { name: 'Bada' } })
    expect(database.as({ uid: 'test' })).not.toAllowWrite(
      '/users/admin/name',
      'Bhau'
    )

    expect(database.as({ uid: 'test' })).not.toAllowWrite('/users/test', null)
  })

  it('should allow user itself to write to itself', function() {
    expect(database.as({ uid: 'test' })).toAllowWrite('/users/test', {
      name: 'Areeb',
      uid: 'test',
      email: 'jamal.areeb@gmail.com',
      emailVerified: true,
      photoURL: 'http://www.google.com',
      providerData: [
        {
          displayName: 'Areeb',
          email: 'jamal.areeb@gmail.com',
          photoURL: 'https://www.google.com',
          providerId: 'null',
          uid: 'test'
        }
      ]
    })
  })
})
