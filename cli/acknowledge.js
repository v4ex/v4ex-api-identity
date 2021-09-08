/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide CLI command acknowledge.


/**
 * @param {*} Identity (optional)
 * @param {*} mongoose (optional)
 * @param {*} modelName (optional)
 * @param {*} env (optional)
 */
module.exports = ({ Identity, mongoose, modelName, env }) => {
  if (Identity === undefined) {
    Identity = require('../models/all-identity')({ mongoose, modelName }).Identity
  }

  const {
    acknowledge,
    acknowledgeByUsername,
    acknowledgeByEmail,
    acknowledgeByUsernameAndEmail
  } = require('../lib/acknowledge')({ env })

  const { program } = require('commander')
  const chalk = require('chalk')

  const done = () => {
    Identity.base.connection.close()
  }

  program.command('acknowledge')
         .description('add new Identity to database')
         .option('--username <username>', 'username for identity')
         .option('--email <email>', 'email for identity')
         .action((options, command) => {
           if (options.username && options.email) {
            acknowledgeByUsernameAndEmail(Identity, options.username, options.email, (err, identity) => {
              if (err) {
                console.error(chalk.red(err))
                console.error(err)
              }
              console.log(identity)
              done()
            })
           } else if (options.username) {
             acknowledgeByUsername(Identity, options.username, (err, identity) => {
               if (err) {
                 console.error(chalk.red(err))
                 console.error(err)
               }
               console.log(identity)
               done()
             })
           } else if (options.email) {
             acknowledgeByEmail(Identity, options.email, (err, identity) => {
               if (err) {
                 console.error(chalk.red(err))
                 console.error(err)
               }
               console.log(identity)
               done()
             })
           } else {
             console.log(Identity.collection)
             acknowledge(Identity, (err, identity) => {
               if (err) {
                 console.error(chalk.red(err))
                 console.error(err)
               }
               console.log(identity)
               done()
             })
           }
         })
}
