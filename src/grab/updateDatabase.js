const fs = require('fs-extra')
const { Amount } = require('@signumjs/util')
const { extractMessage } = require('./extractMessage')
const { generateMasterKeys } = require('@signumjs/crypto')
const { PrismaClient } = require('@prisma/client')

async function updateDatabase (opts, transactions) {
  let decryptKey = null
  if (opts.phrase) {
    const { agreementPrivateKey } = generateMasterKeys(opts.phrase)
    decryptKey = agreementPrivateKey
  }

  const database = new PrismaClient()

  await database.parameters.upsert({
    where: {
      id:1
    },
    create: {

    }
  })

  await database.transactions.insertMany({
    data: transactions.map(t => ({
      transactionId: t.transaction,
      sender: t.sender,
      amount: Amount.fromPlanck(t.amountNQT).getSigna(),
      message: extractMessage(t, decryptKey)
    }))
  })


  const { lines, address, signa, message } = opts
  const previousTransactions = data.transactions || []
  previousTransactions.unshift(...mappedTransactions)
  const updatedTransactions = previousTransactions.slice(0, lines)

  const updatedData = {
    lastModified: new Date().toISOString(),
    params: {
      address,
      lines,
      signa,
      message
    },
    transactions: updatedTransactions
  }

  fs.writeJsonSync(opts.file, updatedData)
}

module.exports = {
  updateLogFile
}
