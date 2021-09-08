/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Identity, IdentitySchema instances.


module.exports = ({ mongoose, modelName }) => {
  if (mongoose === undefined) mongoose = require('../mongoose')
  if (modelName === undefined) modelName = 'Identity'

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
