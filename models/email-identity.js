/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Identity, IdentitySchema instances with email field.


module.exports = ({ mongoose, modelName }) => {
  const { Identity, IdentitySchema } = require('./identity')({ mongoose, modelName })

  require('./plugins/email')(Identity)

  return {
    Identity,
    IdentitySchema
  }
}
