/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide mongoose instance.


/**
 * @param {*} env (optional)
 *   - IDENTITY_MONGO_URI
 */
module.exports = ({ env }) => {
  if (env === undefined) {
    require('dotenv').config()
    env = process.env
  }

  let mongoose

  // Use standalone database,
  if (env.IDENTITY_MONGO_URI) {
    mongoose = require('mongoose')
    mongoose.connect(env.IDENTITY_MONGO_URI)
  } else { // or shared database.
    mongoose = require('v4ex-api-core')({ env }).mongoose
  }

  return mongoose
}
