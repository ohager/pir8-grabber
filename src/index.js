const { version } = require('../package.json')
const { program } = require('commander')
const { main: grabCommand } = require('./grab')
const { main: payCommand } = require('./pay')
const { Address } = require('@signumjs/core')
const { Amount } = require('@signumjs/util')
const dotenv = require('dotenv')
const { getConfig, getContext } = require('./context')

function validateAddress (address) {
  Address.create(address)
  return address
}

function validateAmount (amount) {
  return Amount.fromSigna(amount).getSigna()
}

function toInt (value) {
  const i = parseInt(value, 10)
  if (Number.isNaN(i)) {
    throw new Error('Expected a number')
  }
  return i
}

async function startAction (opts, fn) {
  dotenv.config(opts.config)
  const context = await getContext()
  fn(context)
}

const app = program
  .version(version)
  .description(`
            @@@@@@@@  @@@@@@@           
         @@@@@    @@@@@    @@@@@        
           @@@  @@@  @@@ @@@@@          
    @@@      @@@@@     @@@@       @@@   
  @@@@@@@@ &@@@  @@@@@@@@ @@@@  @@@@@@@ 
 @@@    @@@@       @@@      @@@@@    @@@
 @@@  @@@ *@@@@           @@@  @@@  @@@@
   @@@@@     @@@         @@@     @@@@@  
 @@@@  @@@  @@@           @@@@  @@@  @@@
 @@@    @@@@@      @@@       @@@@    @@@
  @@@@@@@  @@@  @@@@@@@@  @@@  @@@@@@@@ 
    @@@       @@@@     @@@@@      @@@   
           @@@@  @@@  @@@  @@@          
         @@@@@    @@@@@    @@@@@        
            @@@@@@@  @@@@@@@@    
 
           Signum Pir8 Grabber          
      
  Author: ohager
  Version: ${version}
  `)

program
  .command('grab')
  .option('-c, --config <filename>', 'A config file with all the necessary settings', '.env')
  // .requiredOption('-a, --address <address>', 'Address to be monitored, can be Reed-Solomon or Id ', validateAddress)
  // .option('-p, --phrase <yoursecret>', 'Your senders Signum account passphrase (to read encrypted messages)', '')
  // .option('-s, --signa <amount>', 'Target amount in SIGNA', validateAmount)
  // .option('-m, --message <regex>', 'Target message using a regex pattern')
  // .option('-f, --file <filename>', 'Filename where the data is being collected', './pir8grabber.json')
  // .option('-l, --lines <number>', 'Amount of lines inside the file', toInt, 10)
  // .option('-n, --node <url>', 'Your custom node. Otherwise the node is selected automatically')
  // .option('-db, --database <dburi>', 'The database connection string (mysql/mariadb) in format "mysql://<user>:<password>@<host>:<port>/pir8game?schema=public"')
  .action(async (opts) => {
    startAction(opts, grabCommand)
  })

program
  .command('pay')
  .action((opts) => {
    startAction(opts, payCommand)
  });

(async () => {
  try {
    await app.parseAsync(process.argv)
  } catch (e) {
    console.error('❌ Damn, something Failed:', e)
  }
})()
