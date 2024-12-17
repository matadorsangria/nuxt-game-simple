import 'vuetify/lib/styles/main.sass';
import type { App } from 'vue';
import type { Decorator } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { setup } from '@storybook/vue3';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { createVuetify } from 'vuetify';

const pinia = createPinia();
const vuetify = createVuetify();

setup((app: App) => {
  if (app) {
    app.use(pinia);
    app.use(vuetify);
  }
});

export const decorators: Decorator[] = [
  (Story) => ({
    components: { Story },
    template: '<story />',
  }),
];

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
};
