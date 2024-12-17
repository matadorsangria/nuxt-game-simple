import globals from 'globals';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt().append(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettierConfig,
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, sourceType: 'module' },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
          },
        },
      ],
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
    },  
  },
)
