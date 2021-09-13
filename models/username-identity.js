/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Identity, IdentitySchema instances with username field.


/**
 * @param {Object} {}
 *   - @param {mongoose} mongoose (optional)
 *   - @param {String} modelName (optional)
 *   - @param {Object} env (optional)
 */
module.exports = ({ mongoose, modelName, env }) => {
  const { Identity, IdentitySchema } = require('./identity')({ mongoose, modelName, env })

  require('./plugins/username')(Identity)

  return {
    Identity,
    IdentitySchema
  }
}
