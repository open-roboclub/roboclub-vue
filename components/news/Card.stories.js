import Card from './Card.vue'

export default {
  title: 'Components/News Card',
  component: Card
}

const Template = (args, { argTypes }) => ({
  components: { Card },
  props: Object.keys(argTypes),
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
  template: '<Card :newsUpdate="news" />'
})

export const Primary = Template.bind({})
Primary.args = {
  title: 'News Title',
  date: '29th August',
  notice: 'This is a news update',
  link: 'https://google.com'
}
