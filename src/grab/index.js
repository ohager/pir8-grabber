const { grab } = require('./grab')
const { updateLogFile } = require('./updateLogFile')

const main = async (context) => {
  try {
    const transactions = await grab(context)
    updateLogFile(context, transactions)
    console.info(`✅ Found ${transactions.length} new transactions. Updated ${context.config.outfile} sucessfully`)
  } catch (e) {
    console.error('Snap. Something went wrong', e)
  }
}
module.exports = {
  main
}
