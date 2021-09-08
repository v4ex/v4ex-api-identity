/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Add "username" field to Identity.


module.exports = ( Identity ) => {

  const IdentitySchema = Identity.schema
  
  IdentitySchema.plugin(schema => {
    schema.path('username', { type: String, unique: true })
  })
}
