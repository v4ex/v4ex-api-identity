/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Identity, IdentitySchema instances with email field.


module.exports = ({ mongoose, modelName, env }) => {
  const { Identity, IdentitySchema } = require('./identity')({ mongoose, modelName, env })

  require('./plugins/email')(Identity)

  return {
    Identity,
    IdentitySchema
  }
}