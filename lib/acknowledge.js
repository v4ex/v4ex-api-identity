/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose:
//   - Provide acknowledge() to add new Identity to database.
//   - Provide parseAcknowledgeError() to parse error thrown from promise.
//   - Provide acknowledgeByUsername() to add new Identity with username to database.
//   - Provide acknowledgeByUsername() to add new Identity with username to database.


/**
 * @param {*} Identity (optional)
 * @param {*} mongoose (optional)
 * @param {*} modelName (optional)
 * @param {*} env (optional)
 */
module.exports = ({ env }) => {

  const acknowledgeAsync = async (Identity) => {
    return Identity.create({})
  }

  const acknowledge = (Identity, callback) => {
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

  const acknowledgeByUsernameAsync = async (Identity, username) => {
    return new Promise(() => {
      Identity.create({ username }, (err, identity) => {
        if (err) {
          reject(parseAcknowledgeError(err))
        } else {
          resolve(identity)
        }
      })
    })
  }
  
  const acknowledgeByUsername = (Identity, username, callback) => {
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

  const acknowledgeByEmailAsync = async (Identity, email) => {
    return new Promise(() => {
      Identity.create({ email }, (err, identity) => {
        if (err) {
          reject(parseAcknowledgeError(err))
        } else {
          resolve(identity)
        }
      })
    })
  }

  const acknowledgeByEmail = (Identity, email, callback) => {
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
