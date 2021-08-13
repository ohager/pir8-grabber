const { createApi } = require('./api')
const { Address, TransactionType, TransactionPaymentSubtype } = require('@signumjs/core')
const { Amount } = require('@signumjs/util')

let api = null

function extractMessage (transaction, passphrase = '') {
  const { attachment } = transaction
  if (attachment && attachment.message) {
    return attachment.message
  }
  // TODO: decrypt
  return ''
}

async function fetchTransactions (address) {
  const monitoredAddress = Address.create(address)
  const { transactions } = await api.account.getAccountTransactions({
    accountId: monitoredAddress.getNumericId(),
    type: TransactionType.Payment,
    subtype: TransactionPaymentSubtype.Ordinary,
    includeIndirect: false
  })

  return transactions
}

function processTransactions (transactions, opts) {
  return transactions.filter(tx => {
    let accept = true
    if (opts.message) {
      accept &= extractMessage(tx).indexOf(opts.message) !== -1
    }
    if (opts.signa) {
      const amount = Amount.fromPlanck(tx.amountNQT)
      accept &= amount.greaterOrEqual(Amount.fromSigna(opts.signa))
    }
    return accept
  })
}

async function grab (opts) {
  const { address } = opts
  api = await createApi()
  const transactions = await fetchTransactions(address)
  const result = processTransactions(transactions, opts)

  console.log('result', result)
}

module.exports = {
  grab
}
