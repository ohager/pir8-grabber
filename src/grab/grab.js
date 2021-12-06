const { Address, TransactionType, TransactionPaymentSubtype } = require('@signumjs/core')
const { Amount } = require('@signumjs/util')
const { extractMessage } = require('./extractMessage')
const { generateMasterKeys } = require('@signumjs/crypto')

async function fetchTransactions (context) {
  const { api, config } = context
  console.log(context)
  const monitoredAddress = Address.create(config.account)
  const { transactions } = await api.account.getAccountTransactions({
    accountId: monitoredAddress.getNumericId(),
    type: TransactionType.Payment,
    subtype: TransactionPaymentSubtype.Ordinary,
    includeIndirect: false
  })
  return transactions
}

function filterTransactions (transactions, context) {
  const { filter, passphrase } = context.config
  const regex = new RegExp(filter.messagePattern, 'gi')
  let decryptKey = null
  if (passphrase) {
    const { agreementPrivateKey } = generateMasterKeys(passphrase)
    decryptKey = agreementPrivateKey
  }
  return transactions.filter(tx => {
    let accept = true
    if (filter.messagePattern) {
      accept &= regex.test(extractMessage(tx, decryptKey))
    }
    if (filter.amount) {
      accept &= Amount.fromPlanck(tx.amountNQT).greaterOrEqual(Amount.fromSigna(filter.amount))
    }
    return accept
  })
}

async function grab (context) {
  const transactions = await fetchTransactions(context)
  return filterTransactions(transactions, context)
}

module.exports = {
  grab
}
