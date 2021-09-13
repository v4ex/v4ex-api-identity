/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose:
//   - Provide acknowledge() to add new Identity to database.
//   - Provide acknowledgeByUsername() to add new Identity with username to database.
//   - Provide acknowledgeByUsername() to add new Identity with username to database.
//   - Provide acknowledgeByUsernameAndEmail() to add new or update Identity with specific username and email to database.


/**
 * @param {Object} {}
 *   - @param {Object} env (optional)
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
          callback(parseAcknowledgeError({ err, username }))
        } else {
          callback(null, identity)
        }
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
          callback(parseAcknowledgeError({ err, email }))
        } else {
          callback(null, identity)
        }
      })
    } else {
      return acknowledgeByEmailAsync(email)
    }
  }

  const acknowledgeByUsernameAndEmailAsync = async (Identity, username, email) => {
    return new Promise(() => {
      
    })
  }

  const acknowledgeByUsernameAndEmail = (Identity, username, email, callback) => {
    Identity.find({
      $or: [
        { username },
        { email }
      ]
    }, (err, identities) => {
      if (err) {
        console.error(err)
        callback(err)
      } else if (identities.length > 1) { // More than one document
        const error = new Error('Can not merge multiple identities.')
        callback(error)
      } else if (identities.length === 1) { // Found one
        const identity = identities[0]
        if (identity.get('username') === username && identity.get('email') === email) {
          callback(null, identity)
        } else if (identity.get('username') === username) {
          if (!identity.get('email')) { // Only save if no email exist before
            identity.set('email', email)
            identity.save(callback)
          } else {
            callback(new Error('Can not change email of existing Identity by acknowledge.'))
          }
        } else if (identity.get('email') === email) {
          if (!identity.get('username')) { // Only save if no username exist before
            identity.set('username', username)
            identity.save(callback)
          } else {
            callback(new Error('Can not change username of existing Identity by acknowledge.'))
          }
        }
      } else { // Not found, create new
        Identity.create({
          username,
          email
        }, callback)
      }
    })
  }

  return {
    acknowledge,
    parseAcknowledgeError,
    acknowledgeByUsername,
    acknowledgeByEmail,
    acknowledgeByUsernameAndEmail
  }

}
