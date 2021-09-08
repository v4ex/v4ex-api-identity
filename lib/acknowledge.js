/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose:
//   - Provide acknowledge() to add new Identity to database.
//   - Provide parseAcknowledgeError() to parse error thrown from promise.
//   - Provide acknowledgeByUsername() to add new Identity with username to database.
//   - Provide acknowledgeByUsername() to add new Identity with username to database.


module.exports = ({ Identity, env }) => {
  const acknowledgeAsync = async () => {
    return Identity.create({})
  }

  const acknowledge = callback => {
    if (callback) {
      Identity.create({}, callback)
    } else {
      return acknowledgeAsync()
    }
  }

  const {
    IdentityError,
    IDENTITY_ERRORS,
    IdentityErrorFactory
  } = require('./error')({ env })

  const parseAcknowledgeError = ({ err, username, email }) => {
    if (err.name === 'MongoServerError'
      && err.code === 11000
    ) {
      if (err.keyValue.username && err.keyValue.username === username) {
        return IdentityErrorFactory[IDENTITY_ERRORS.IDENTITY_ACKNOWLEDGE_DUPLICATE_USERNAME](username)
      } else if (err.keyValue.email && err.keyValue.email === email) {
        return IdentityErrorFactory[IDENTITY_ERRORS.IDENTITY_ACKNOWLEDGE_DUPLICATE_EMAIL](email)
      }
    }

    return err
  }

  const acknowledgeByUsernameAsync = async (username) => {
    return Identity.create({ username })
  }
  
  const acknowledgeByUsername = (username, callback) => {
    if (callback) {
      Identity.create({ username }, (err, identity) => {
        if (err) {
          return callback(parseAcknowledgeError({ err, username }))
        }
        callback(null, identity)
      })
    } else {
      return acknowledgeByUsernameAsync(username)
    } 
  }

  const acknowledgeByEmailAsync = async (email) => {
    return Identity.create({ email })
  }

  const acknowledgeByEmail = (email, callback) => {
    if (callback) {
      Identity.create({ email }, (err, identity) => {
        if (err) {
          return callback(parseAcknowledgeError({ err, email }))
        }
        callback(null, identity)
      })
    } else {
      return acknowledgeByEmailAsync(email)
    }
  }


  return {
    acknowledge,
    parseAcknowledgeError,
    acknowledgeByUsername,
    acknowledgeByEmail
  }

}
