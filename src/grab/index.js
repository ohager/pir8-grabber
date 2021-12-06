const { grab } = require('./grab')
const { updateLogFile } = require('./updateLogFile')
const { updateDatabase } = require('./updateDatabase')
const main = async (context) => {
  try {
    console.info('Grabbing transaction according this config')
    const config = {
      ...context.config
    }
    config.passphrase = '***'
    console.info(config)
    const transactions = await grab(context)
    updateLogFile(context, transactions)
    await updateDatabase(context, transactions)
    console.info(`✅ Found ${transactions.length} new transactions. Updated ${context.config.outfile} and Database successfully `)
  } catch (e) {
    console.error('Snap. Something went wrong', e)
  }
}
module.exports = {
  main
}
