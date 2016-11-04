module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',

  db: {
    userName: 'user',
    password: () => {
      if(!process.env.DB_PASSWORD) {
        throw new Error('Missing environment variable DB_PASSWORD')
      }

      return process.env.DB_PASSWORD
    }
  }
}
