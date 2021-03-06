import { firestoreAction } from 'vuexfire'
import { DB } from '@/plugins/firebase'

const RECENT_NEWS_SIZE = 5
const newsCollection = DB.collection('news')
const recentNewsCollection = newsCollection.orderBy('timestamp').limit(5)

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
  setNewsRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('news', newsCollection.orderBy('timestamp'))
  }),

  setRecentNewsRef: firestoreAction(({ state, bindFirestoreRef }) => {
    if (state.news.length) return // news found
    return bindFirestoreRef('news', recentNewsCollection)
  }),

  deleteNews: (_, id) => {
    newsCollection.doc(id).delete()
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

    newsCollection.doc(state.newsItem.id).set(state.newsItem)
    commit('resetNews')
  },

  saveNews: (_, newsUpdate) => {
    const news = copyProperties(newsUpdate, clearNews())
    news.notification = 'no'

    if (news.link === '') {
      delete news.link
    }
    newsCollection.doc(newsUpdate.id).update(news)
  }
}
export const getters = {
  news: state => state.news,

  recentNews(state) {
    return state.news.slice(0, RECENT_NEWS_SIZE)
  }
}
