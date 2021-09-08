/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide CLI command identity to control Identity in database.


module.exports = ({ Identity, mongoose, modelName, env }) => {
  if (Identity === undefined) {
    Identity = require('../models/identity')({ mongoose, modelName }).Identity
  }

  const { program } = require('commander')
  const chalk = require('chalk')

  const done = () => {
    Identity.base.connection.close()
  }

  program.command('identity')
         .description('control Identity model in database')
         .option('--drop', 'Drop Identity model collection in database')
         .action((options) => {
           if (options.drop) {
             Identity.collection.drop(done)
           }
         })

}
