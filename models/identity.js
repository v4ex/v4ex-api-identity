/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Identity, IdentitySchema instances.


/**
 * @param {Object} {}
 *   - @param {mongoose} mongoose (optional)
 *   - @param {String} modelName (optional)
 *   - @param {Object} env (optional)
 */
module.exports = ({ mongoose, modelName, env }) => {
  mongoose = mongoose || require('../mongoose')({ env })
  modelName = modelName || 'Identity'

  let Identity, IdentitySchema

  if (mongoose.modelNames().includes(modelName)) {
    Identity = mongoose.model(modelName)
    IdentitySchema = Identity.schema
  } else {
    const Schema = mongoose.Schema
    IdentitySchema = new Schema({})
    Identity = mongoose.model(modelName, IdentitySchema)
  }


  return {
    Identity,
    IdentitySchema
  }
}
