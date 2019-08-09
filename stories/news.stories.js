import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs'

import NewsCard from '../components/news/Card.vue'

const stories = storiesOf('News Card', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
  return {
    components: { NewsCard },
    props: {
      title: {
        default: text('Title', 'This is a news')
      },
      date: {
        default: text('Date', '29th August')
      },
      notice: {
        default: text('Notice', 'In other news, we have gone with the wind')
      },
      link: {
        default: text('Link', 'https://google.com')
      }
    },
    computed: {
      news() {
        return {
          title: this.title,
          date: this.date,
          notice: this.notice,
          link: this.link
        }
      }
    },
    template: `
      <v-flex xs4>
        <NewsCard :newsUpdate='news' />
      </v-flex>
      `
  }
})
