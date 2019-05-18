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
    },
    news: {
      qwf323efhif: {
        notice: 'This is a news'
      }
    }
  })

  it('should allow un/authenticated user to read all news', function() {
    expect(database.as(targaryen.users.unauthenticated)).toAllowRead('/news')
    expect(database.as(targaryen.users.unauthenticated)).toAllowRead(
      '/news/qwf323efhif'
    )

    expect(database.as({ uid: 'test' })).toAllowRead('/news')
  })

  const validNotification = {
    notice: 'This is a notification',
    date: '12 January 2018',
    timestamp: new Date().getTime()
  }

  it('should not allow unauthenticated person to create news', function() {
    expect(database.as(targaryen.users.unauthenticated)).not.toAllowWrite(
      '/news/new',
      validNotification
    )
  })

  it('should not allow non-admin to create news', function() {
    expect(database.as({ uid: 'test' })).not.toAllowWrite(
      '/news/new',
      validNotification
    )
  })

  it('should not allow non-admin to patch news', function() {
    expect(database.as({ uid: 'test' })).not.toAllowUpdate(
      '/news/qwf323efhif',
      validNotification
    )
  })

  it('should allow admin to create news', function() {
    expect(database.as({ uid: 'admin' })).toAllowWrite(
      '/news/new',
      validNotification
    )

    expect(database.as({ uid: 'admin' })).toAllowWrite('/news/new-news', {
      ...validNotification,
      title: 'Notification Title'
    })
  })

  const adminNewsAction = (action, key) => {
    expect(database.as({ uid: 'admin' })).not[action](`/news/${key}`, {
      notice: 'This is a notice'
    }) // Missing timestamp and date
    expect(database.as({ uid: 'admin' })).not[action](`/news/${key}`, {
      notice: 'This is a notice',
      timestamp: new Date().getTime() + 100,
      date: '12 Jan 2013'
    }) // Future Date

    expect(database.as({ uid: 'admin' })).not[action](`/news/${key}`, {
      ...validNotification,
      notice: 'Smol'
    }) // Smaller than 5 characters
  }

  it('should not allow admin to create invalid news', function() {
    adminNewsAction('toAllowWrite', 'new')
  })

  it('should not allow admin to patch invalid news', function() {
    adminNewsAction('toAllowUpdate', 'qwf323efhif')
  })
})
