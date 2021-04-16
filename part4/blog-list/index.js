const http = require('http');
const app = require('./app')
const {PORT} = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
