import { db } from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const blogsRef = db.ref('blogs/main')

const clearBlog = blog => {
  if (!blog) {
    blog = {}
  }
  blog.title = ''
  blog.subtitle = ''
  blog.content = ''
  blog.preview = false
  blog.link = ''
  blog.timestamp = -Date.now()
  blog.date = 'XX/YY/ZZ'
  blog.name = ''
  blog.uid = ''

  return blog
}
export const state = () => ({
  blogs: [],
  blogItem: clearBlog(),
  blogger: false,
  owner: false,
  currentBlogId: null,
  selectedBlog: clearBlog()
})

export const mutations = {
  resetBlog: state => {
    clearBlog(state.blogItem)
  },
  setBloggers: (state, blogger) => {
    state.blogger = blogger
  },
  setBlogId: (state, id) => {
    state.currentBlogId = id
  },
  setBlog: (state, blog) => {
    state.selectedBlog = blog
  }
}

export const actions = {
  setBlogsRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('blogs', blogsRef)
  }),
  deleteBlog: (_, id) => {
    blogsRef.child(id).remove()
  },
  async addBlog({ state, commit, rootState }) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const user = await rootState.user
    const today = new Date()
    const date = today.toLocaleDateString('en-US', options)

    state.blogItem.name = user.displayName
    state.blogItem.uid = user.uid
    state.blogItem.timestamp = -today
    state.blogItem.date = date

    blogsRef.ref.push(state.blogItem)
    commit('resetBlog')
  },
  getBlog({ commit }, blog) {
    commit('setBlog', blog)
  },
  async isBlogger({ state, commit, rootState }) {
    const user = await rootState.user
    console.log('Came Here')
    console.log(user)
    if (!user) {
      commit('setBloggers', false)
      return
    }
    const ref = user.uid
    console.log(ref)
    try {
      console.log('TRUE')
      const snapshot = await db.ref(`blogs/bloggers/${ref}`).once('value')
      console.log(snapshot.val())
      commit('setBloggers', snapshot.val())
      console.log('TRUE')
      return true
    } catch (err) {
      console.log(err)
      commit('setBloggers', false)
      console.log('FALSE')
      return false
    }
  }
}

export const getters = {
  blogs: state => state.blogs
}
