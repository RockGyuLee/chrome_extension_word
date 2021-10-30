// .storybook/main.js

module.exports = {
  stories: ['../src/components/storybook/**/*.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
};