/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Add "email" field to Identity.


module.exports = (Identity) => {

  const IdentitySchema = Identity.schema
  
  IdentitySchema.plugin(schema => {
    schema.path('email', { type: String, unique: true, sparse: true })
  })
}
