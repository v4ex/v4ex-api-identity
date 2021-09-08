/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Identity, IdentitySchema instances with username field.


module.exports = ({ mongoose, modelName }) => {
  const { Identity, IdentitySchema } = require('./identity')({ mongoose, modelName })

  require('./plugins/username')(Identity)

  return {
    Identity,
    IdentitySchema
  }
}
