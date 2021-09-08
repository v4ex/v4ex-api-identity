/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose:
//   - Provide IdentityError class which extends Error.
//   - Provide IDENTITY_ERRORS object which has all error constants.
//   - Provide IdentityErrorFactory


module.exports = ({ env }) => {
  if (env === undefined) {
    require('dotenv').config()
    env = process.env
  }
  const errorName = env.IDENTITY_ERROR_NAME || 'IdentityError'

  const IDENTITY_ERRORS = {
    IDENTITY_ACKNOWLEDGE_DUPLICATE_USERNAME: 21001,
    IDENTITY_ACKNOWLEDGE_DUPLICATE_EMAIL: 21002,
  }

  class IdentityError extends Error {
    constructor(code, message) {
      super(message)
      this.name = errorName
      this.code = code
      this.codeName = Object.keys(IDENTITY_ERRORS).find(key => IDENTITY_ERRORS[key] === code)
      this.module = this.codeName.split('_')[0]
      this.category = this.codeName.split('_')[1]
    }
  }

  const IdentityErrorFactory = {
    [IDENTITY_ERRORS.IDENTITY_ACKNOWLEDGE_DUPLICATE_USERNAME]: (username) => {
      return new IdentityError(IDENTITY_ERRORS.IDENTITY_ACKNOWLEDGE_DUPLICATE_USERNAME, `Duplicate username "${username}".`)
    },
    [IDENTITY_ERRORS.IDENTITY_ACKNOWLEDGE_DUPLICATE_EMAIL]: (email) => {
      return new IdentityError(IDENTITY_ERRORS.IDENTITY_ACKNOWLEDGE_DUPLICATE_EMAIL, `Duplicate email "${email}".`)
    }
  }


  return {
    IdentityError,
    IDENTITY_ERRORS,
    IdentityErrorFactory
  }
}
