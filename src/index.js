const { version } = require('../package.json')
const { program } = require('commander')
const { main: grabCommand } = require('./grab')
const { main: payCommand } = require('./pay')
const dotenv = require('dotenv')
const { getContext } = require('./context')

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
  .action(async (opts) => {
    startAction(opts, grabCommand)
  })

program
  .command('pay')
  .option('-c, --config <filename>', 'A config file with all the necessary settings', '.env')
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
