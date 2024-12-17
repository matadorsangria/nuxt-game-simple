import path from 'path'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  framework: '@storybook/vue3-vite',
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-essentials'],
  viteFinal: (config) => {
    config.plugins!.push(
      ...[
        vue(),
        vuetify(),
      ],
    )
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../'),
          '~': path.resolve(__dirname, '../'),
        },
      },
    })
  },
  docs: {
    autodocs: false,
  },
};
export default config;
