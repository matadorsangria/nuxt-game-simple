import path from 'path'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  framework: '@storybook/vue3-vite',
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-essentials'],
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../'),
          '~': path.resolve(__dirname, '../'),
        },
      },
      plugins: [
        vue(),
        AutoImport({
          imports: ['vue'],
          dts: '.storybook/auto-imports.d.ts',
      }),
      ],
    })
  },
  docs: {
    autodocs: false,
  },
};
export default config;
