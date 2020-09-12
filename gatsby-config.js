require('dotenv').config()

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-tsconfig-paths',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: `@import "${__dirname}/src/styles/site";`,
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: ['autoprefixer'],
      },
    },
  ]
}
