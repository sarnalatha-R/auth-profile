const env = process.env.NODE_ENV
console.log(process.env)
console.log(`Testing for: ${env}`)
try {
  switch(env) {
    case 'undefined':
      Error('Environment undefined, if local in terminal: export NODE_ENV=development')
      break
    case 'development':
        console.log("YYYYYYY")
      require('dotenv').config({
        path: './.env.local'
      })
      break
    case 'production':
      require('dotenv').config({
        path: './prod.env'
      })
      break
    default:
      Error('Unrecognized Environment')
  }  
} catch (err) {
  Error('Error trying to run file')
}