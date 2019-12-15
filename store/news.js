import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const RECENT_NEWS_SIZE = 5
const newsRef = db.ref('news').orderByChild('timestamp')
const recentNewsRef = newsRef.limitToFirst(5)

function clearNews(news) {
  if (!news) {
    news = {}
  }
  news.title = ''
  news.notice = ''
  news.link = ''
  news.timestamp = -Date.now()
  news.date = 'XX/YY/ZZ'
  news.notification = 'no'

  return news
}

function copyProperties(source, destination) {
  for (const prop in source) {
    if (Object.prototype.hasOwnProperty.call(destination, prop)) {
      destination[prop] = source[prop]
    }
  }

  return destination
}

export const state = () => ({
  newsItem: clearNews(),
  news: []
})

export const mutations = {
  resetNews: state => {
    clearNews(state.newsItem)
  }
}

export const actions = {
  setNewsRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('news', newsRef)
  }),

  setRecentNewsRef: firebaseAction(({ state, bindFirebaseRef }) => {
    if (state.news.length) return // news found
    return bindFirebaseRef('news', recentNewsRef)
  }),

  deleteNews: (_, id) => {
    newsRef.ref.child(id).remove()
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

    state.newsItem.timestamp = -today
    state.newsItem.date = date

    newsRef.ref.push(state.newsItem)
    commit('resetNews')
  },

  saveNews: (_, newsUpdate) => {
    const news = copyProperties(newsUpdate, clearNews())
    news.notification = 'no'

    if (news.link === '') {
      delete news.link
    }

    newsRef.ref.child(newsUpdate['.key']).set(news)
  }
}

export const getters = {
  news: state => state.news,

  recentNews(state) {
    return state.news.slice(0, RECENT_NEWS_SIZE)
  }
}
