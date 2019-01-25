import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Dynamically import components by lazy loading through routes

const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home')
const Meetups = () =>
  import(/* webpackChunkName: "meetups" */
  '@/components/Meetup/Meetups')
const CreateMeetup = () =>
  import(/* webpackChunkName: "create-meetup" */
  '@/components/Meetup/CreateMeetup')
const Meetup = () =>
  import(/* webpackChunkName: "meetup" */
  '@/components/Meetup/Meetup')
const Profile = () =>
  import(/* webpackChunkName: "profile" */
  '@/components/User/Profile')
const Signin = () =>
  import(/* webpackChunkName: "signin" */
  '@/components/User/Signin')
const Contributions = () =>
  import(/* webpackChunkName: "contributions" */
  '@/components/Contributions')
const News = () =>
  import(/* webpackChunkName: "news" */
  '@/components/News')
const Projects = () =>
  import(/* webpackChunkName: "projects" */
  '@/components/Other/Projects')
const Project = () =>
  import(/* webpackChunkName: "project" */
  '@/components/Other/Project')
const Robocon = () =>
  import(/* webpackChunkName: "robocon" */
  '@/components/Other/Robocon')
const Robovoyage = () =>
  import(/* webpackChunkName: "robovoyage" */
  '@/components/Other/Robovoyage')
const Team = () =>
  import(/* webpackChunkName: "team" */
  '@/components/Other/Team')
const Downloads = () =>
  import(/* webpackChunkName: "downloads" */
  '@/components/Downloads')

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'CreateMeetup',
      component: CreateMeetup
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/contributions',
      name: 'contributions',
      component: Contributions
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/projects/:id',
      name: 'project',
      props: true,
      component: Project
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: Downloads
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/robocon',
      name: 'robocon',
      component: Robocon
    },
    {
      path: '/robovoyage',
      name: 'robovoyage',
      component: Robovoyage
    }
  ]
})
