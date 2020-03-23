import { db } from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const blogsRef = db.ref('blogs')

const getBlogRef = id => blogsRef.orderByChild('id').equalTo(id)

export const state = () => ({
  blog: [],
  blogs: []
})

export const actions = {
  setBlogsRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('blogs', blogsRef)
  }),
  setBlogRef: firebaseAction(({ bindFirebaseRef, getters }, blogId) => {
    if (getters.getBlogById(blogId)) return // Blog found
    return bindFirebaseRef('blog', getBlogRef(blogId))
  })
}

export const getters = {
  blogs: state => state.blogs,
  getBlogById(state) {
    return id => {
      const blogs = state.blogs.find(blog => blog.id === id)

      if (blogs && blogs.length) {
        return blogs[0]
      } else if (state.blog.length && state.blog[0].id === id) {
        return state.blog[0]
      } else {
        return null
      }
    }
  }
}
