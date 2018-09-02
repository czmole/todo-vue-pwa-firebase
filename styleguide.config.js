module.exports = {
  components: 'src/components/**/**/*.vue',
  styles: {
    Playground: {
      preview: {
        background: 'linear-gradient(to right, rgb(0, 114, 255), rgb(0, 198, 255));'
      }
    }
  },
  require: [
    "./setupTest.js"
  ]
};