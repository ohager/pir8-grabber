const { version } = require('../package.json')
const { program, Option } = require('commander')
const { execAsync } = require('./execAsync')
const { Address } = require('@signumjs/core')

function validateUrl (url) {
  if (url) {
    // eslint-disable-next-line no-new
    new URL(url)
  }
  return url
}

function validateAddress (address) {
  Address.create(address)
  return address
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
  .requiredOption('-s, --secret <yoursecret>', 'Your senders Signum account passphrase')
  .option('-a, --address <address>', 'Address to be monitored, can be Reed-Solomon or Id ', validateAddress)
  .option('-f, --file <filename>', 'Logfile to', validateUrl, './pir8-grabber.log')
  .option('-l, --lines', 'Amount of lines inside the file', '10')
  .addOption(
    new Option('-f --fee <type>', 'Sets fee type by category for send')
      .choices(['minimum', 'cheap', 'standard', 'priority'])
      .default('standard')
  )
  .option('-os, --onsuccess <script>', 'Executes a script on successful execution')
  .option('-oe, --onerror <script>', 'Executes a script on failed execution');

(async () => {
  let opts = {}
  try {
    opts = app.parse().opts()
    // const { commitmentAmount, address } = await commit(opts)
    // console.info('✅ Yay, all fine!')
    if (opts.onsuccess) {
      await execAsync(opts.onsuccess, [])
    }
  } catch (e) {
    console.error('❌ Damn, something Failed:', e.message)
    if (opts.onerror) {
      await execAsync(opts.onerror, [e])
    }
  }
})()
