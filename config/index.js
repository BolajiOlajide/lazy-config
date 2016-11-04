
module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',

  db: {
    userName: 'user',
    password: () => {
      return 'password'
    }
  }
}
