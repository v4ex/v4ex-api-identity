/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Identity, IdentitySchema instances with all plugin fields.


module.exports = ({ mongoose, modelName }) => {
  const { Identity, IdentitySchema } = require('./identity')({ mongoose, modelName })

  require('./plugins/username')(Identity)
  require('./plugins/email')(Identity)

  return {
    Identity,
    IdentitySchema
  }
}
