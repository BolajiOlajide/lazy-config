# Lazy Config

Thanks [Dane](https://github.com/danethurber) for helping polish the module.

[![Circle CI](https://circleci.com/gh/snugbear/lazy-config.svg?style=shield)](https://circleci.com/gh/snugbear/lazy-config)


Our team uses this module to lazily evaluate configuration settings, such as environment variables, for our applications.

Install
```
$ yarn install lazy-config
```

Ensure that you have a `config/default.js` and optionally `config/{NODE_ENV}.js` file for environment overrides

## Usage

### Lazily evaluate an environment variable

config/default.js
```
module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',

  db: {
    userName: 'user',
    password: () => {
      return process.env.DB_PASSWORD
    }
  }
}
```

index.js
```
const config = require('lazy-config')

// accessing a specific config setting will evaluate the function
console.log('config.db.password', config.db.password)

```

```
$ DB_PASSWORD=supersecure node .

// output
$ config.db.password supersecure
```

### Throw when accessing a required environment variable

config/default.js
```
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
```

index.js
```
const config = require('lazy-config')

// accessing a specific config setting will evaluate the function
console.log('config.db.password', config.db.password)

```

```
// don't set an environment variable
$ node .

// output
$ throws an error complaining about missing DB_PASSWORD
```
