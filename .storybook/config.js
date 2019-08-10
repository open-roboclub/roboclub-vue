import { configure, addDecorator } from '@storybook/vue';
import "@/plugins/vuetify";
import 'vuetify/dist/vuetify.css';

// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  template: `
  <v-app>
    <v-container fluid>
      <v-layout row wrap>
        <story/>
      </v-layout>
    </v-container>
  </v-app>`
}));

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
