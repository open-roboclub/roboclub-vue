import { configure, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify)

const vuetifyConfig = new Vuetify()

// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  vuetify: vuetifyConfig,
  template: /* html */ `
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row wrap>
          <story />
        </v-row>
      </v-container>
    </v-content>
  </v-app>`
}));

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
