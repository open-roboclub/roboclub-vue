import { db } from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const bloggersRef = db.ref('blogs/bloggers')
const blogsRef = db.ref('blogs/main')
const userRef = db.ref('team/current/members')

export const state = () => ({
  bloggers: [],
  blogs: [],
  blog: [],
  team: []
})

export const actions = {
  setBloggersRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('bloggers', bloggersRef)
  }),
  setBlogsRef: firebaseAction(({ bindFirebaseRef, getters }) => {
    return bindFirebaseRef('blogs', blogsRef)
  }),
  setTeamRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('team', userRef)
  })
}

export const getters = {}
