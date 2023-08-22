module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    
  },
  "rules": {
    "react/prop-types": "off",
    "react/no-unknown-property": "off",
    "react/jsx-indent": [
      "error",
      2
    ],
    "react/self-closing-comp": [
      "error",
      {
        "component": true,
        "html": false
      }
    ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        "maximum": 1,
        "when": "multiline"
      }
    ],
    "react/jsx-indent-props": [
      "error",
      "first"
    ],
    "react/jsx-fragments": [
      "error"
    ],
    "react/jsx-first-prop-new-line": [
      "error",
      "never"
    ],
    "react/jsx-equals-spacing": [
      "error"
    ],
    "react/jsx-closing-tag-location": [
      "error"
    ],
    "react/jsx-closing-bracket-location": [
      "error",
      {
        "selfClosing": "after-props",
        "nonEmpty": "after-props"
      }
    ],
    "react/jsx-boolean-value": [
      "error",
      "never"
    ]
  }
}
