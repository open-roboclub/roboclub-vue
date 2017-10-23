import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Meetup from '@/components/Meetup/Meetup'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Contributions from '@/components/Other/Contributions'
import News from '@/components/Other/News'
import Projects from '@/components/Other/Projects'
import Robocon from '@/components/Other/Robocon'
import Team from '@/components/Other/Team'
import Downloads from '@/components/Other/Downloads'

Vue.use(Router)

export default new Router({
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
    }
  ],
  mode: 'history'
})
