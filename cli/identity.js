/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide CLI command Identity to control Identity in database.


/**
 * @param {*} Identity (optional)
 * @param {*} mongoose (optional)
 * @param {*} modelName (optional)
 * @param {*} env (optional)
 */
module.exports = ({ Identity, mongoose, modelName, env }) => {
  Identity = Identity || require('../models/identity')({ mongoose, modelName, env }).Identity

  const { program } = require('commander')

  const done = () => {
    Identity.base.connection.close()
  }

  program.command('Identity')
         .description('control Identity model in database')
         .option('--drop', 'Drop Identity model collection in database')
         .action(function(options) {
           if (options.drop) {
             Identity.collection.drop(done)
           } else {
             done()
           }
         })

}
