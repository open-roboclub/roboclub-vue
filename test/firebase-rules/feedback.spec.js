const targaryen = require('targaryen/plugins/jest')

const rules = targaryen.json.loadSync('database.rules.json')

expect.extend({
  toAllowRead: targaryen.toAllowRead,
  toAllowUpdate: targaryen.toAllowUpdate,
  toAllowWrite: targaryen.toAllowWrite
})

describe('Feedback Access Tests', function() {
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
    },
    feedback: {
      xu3gb3: 'This is a bad app'
    }
  })

  it('should not allow un/authenticated user to read feedback', function() {
    expect(database.as(targaryen.users.unauthenticated)).not.toAllowRead(
      '/feedback'
    )
    expect(database.as(targaryen.users.unauthenticated)).not.toAllowRead(
      '/feedback/xu3gb3'
    )

    expect(database.as({ uid: 'test' })).not.toAllowRead('/feedback')
    expect(database.as({ uid: 'test' })).not.toAllowRead('/feedback/xu3gb3')
  })

  it('should not allow un/authenticated user to write feedbacks', function() {
    const feedbacks = { jhnl: 'Good', dedhjlh: 'Bad' }

    expect(database.as(targaryen.users.unauthenticated)).not.toAllowWrite(
      '/feedback',
      feedbacks
    )
    expect(database.as({ uid: 'test' })).not.toAllowWrite(
      '/feedback',
      feedbacks
    )

    expect(database.as({ uid: 'test' })).not.toAllowWrite(
      '/feedback/xu3gb3',
      'feedbacks'
    )

    expect(database.as({ uid: 'test' })).not.toAllowWrite(
      '/feedback/xu3gb3',
      null
    )

    expect(database.as(targaryen.users.unauthenticated)).not.toAllowWrite(
      '/feedback/new',
      'New feedback'
    )
  })

  it('should allow authenticated user to write feedback', function() {
    expect(database.as({ uid: 'test' })).toAllowWrite(
      '/feedback/new',
      'feedback'
    )
  })
})
