const fs = require('fs-extra')
const { Amount } = require('@signumjs/util')
const { extractMessage } = require('./extractMessage')
const { generateMasterKeys } = require('@signumjs/crypto')

function updateLogFile (context, transactions) {
  const { outfile, passphrase, filter, account } = context.config
  fs.ensureFileSync(outfile)
  let data = {}
  try {
    data = fs.readJsonSync(outfile)
  } catch (e) {
    // no op -- for an empty file!
  }
  let decryptKey = null
  if (passphrase) {
    const { agreementPrivateKey } = generateMasterKeys(passphrase)
    decryptKey = agreementPrivateKey
  }
  const mappedTransactions = transactions.map(t => ({
    id: t.transaction,
    sender: t.sender,
    amount: Amount.fromPlanck(t.amountNQT).getSigna(),
    message: extractMessage(t, decryptKey)
  }))

  const previousTransactions = data.transactions || []
  previousTransactions.unshift(...mappedTransactions)
  const updatedTransactions = previousTransactions.slice(0, filter.maxTransactions)

  const updatedData = {
    lastModified: new Date().toISOString(),
    params: {
      account,
      ...filter
    },
    transactions: updatedTransactions
  }

  fs.writeJsonSync(outfile, updatedData)
}

module.exports = {
  updateLogFile
}
