/* Stylelint config for SCSS + BEM
 * Keep comments in English.
 */
module.exports = {
  customSyntax: 'postcss-scss',
  extends: [
    'stylelint-config-recommended-vue',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    // BEM class naming: block, block__element, block--modifier
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]*)(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$',
      { resolveNestedSelectors: true },
    ],
    'plugin/selector-bem-pattern': {
      preset: 'bem',
      componentName: '[a-z]+(?:-[a-z0-9]+)*',
      componentSelectors:
        '^\\.{componentName}(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      utilitySelectors: '^\\.(?:u|is|has)-[a-z0-9-]+$',
    },
    // Property/order conventions
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'at-rules',
      'declarations',
      { type: 'at-rule', name: 'supports' },
      { type: 'at-rule', name: 'media' },
      'rules',
    ],
    'order/properties-alphabetical-order': true,
    // Relaxations for practicality
    'value-keyword-case': [
      'lower',
      {
        // Allow proper-cased font family names
        ignoreProperties: ['font-family'],
      },
    ],
    'declaration-empty-line-before': null,
  },
}
