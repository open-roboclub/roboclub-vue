import { firebaseAction } from 'vuexfire'

function clearNews(news) {
  if (!news) {
    news = {}
  }
  news.title = ''
  news.notice = ''
  news.link = ''
  news.timestamp = -Date.now() / 1000
  news.date = 'XX/YY/ZZ'
  news.notification = 'no'

  return news
}

function copyProperties(source, destination) {
  for (const prop in source) {
    if (destination.hasOwnProperty(prop)) {
      destination[prop] = source[prop]
    }
  }

  return destination
}

export const state = () => ({
  newsItem: clearNews(),
  news: [],
  newsRef: null
})

export const mutations = {
  resetNews: state => {
    clearNews(state.newsItem)
  },
  setNewsRef: (state, newsRef) => {
    state.newsRef = newsRef
  }
}

export const actions = {
  setNewsRef: firebaseAction(
    ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('news', ref, callbacks)
      commit('setNewsRef', ref)
    }
  ),
  deleteNews: ({ state }, id) => {
    state.newsRef.child(id).remove()
  },
  addNews: ({ state, commit }) => {
    if (state.newsItem.link === '') {
      delete state.newsItem.link
    }

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const today = new Date()
    const date = today.toLocaleDateString('en-US', options)

    state.newsItem.timestamp = -today / 1000
    state.newsItem.date = date

    state.newsRef.push(state.newsItem)
    commit('resetNews')
  },
  saveNews: ({ state }, newsUpdate) => {
    const news = copyProperties(newsUpdate, clearNews())
    news.notification = 'no'

    if (news.link === '') {
      delete news.link
    }

    state.newsRef.child(newsUpdate['.key']).set(news)
  }
}

export const getters = {
  news: state => state.news.slice().reverse()
}
