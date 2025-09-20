/* Stylelint config for SCSS + BEM
 * Keep comments in English.
 */
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  plugins: ['stylelint-order'],
  rules: {
    // BEM class naming: block, block__element, block--modifier
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]*)(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$',
      { resolveNestedSelectors: true }
    ],
    // Property/order conventions
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'at-rules',
      'declarations',
      { type: 'at-rule', name: 'supports' },
      { type: 'at-rule', name: 'media' },
      'rules'
    ],
    'order/properties-alphabetical-order': true,
    // Relaxations for practicality
    'value-keyword-case': [
      'lower',
      {
        // Allow proper-cased font family names
        ignoreProperties: ['font-family']
      }
    ],
    'declaration-empty-line-before': null
  }
}
