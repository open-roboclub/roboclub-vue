import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs'

const stories = storiesOf('News Card', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
  return {
    components: { NewsCard: () => import('../components/news/Card.vue') },
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
      <v-col md="4">
        <NewsCard :newsUpdate='news' />
      </v-col>
      `
  }
})
