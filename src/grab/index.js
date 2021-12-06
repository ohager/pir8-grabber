const { grab } = require('./grab')
const { updateLogFile } = require('./updateLogFile')
const { updateDatabase } = require('./updateDatabase')

const main = async (context) => {
  try {
    const transactions = await grab(context)
    updateLogFile(context, transactions)
    await updateDatabase(context, transactions)
    console.info(`✅ Found ${transactions.length} new transactions. Updated ${context.config.outfile} and Database sucessfully `)
  } catch (e) {
    console.error('Snap. Something went wrong', e)
  }
}
module.exports = {
  main
}
