const fs = require('fs-extra')
const { Amount } = require('@signumjs/util')
const { extractMessage } = require('./extractMessage')
const { generateMasterKeys } = require('@signumjs/crypto')
const { Prisma } = require('@prisma/client')

const isDatabaseDuplicationError = e =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code.startsWith('P2002')

async function updateDatabase (context, transactions) {
  const { database, config } = context
  let decryptKey = null
  if (config.passphrase) {
    const { agreementPrivateKey } = generateMasterKeys(config.passphrase)
    decryptKey = agreementPrivateKey
  }

  const data = {
    account: config.account,
    minPayout: 0,
    maxPayout: 0,
    messagePattern: config.filter.messagePattern,
    minAmount: config.filter.amount,
    txLimit: config.filter.maxTransactions
  }

  await database.parameter.upsert({
    where: {
      id: 1
    },
    create: {
      id: 1,
      ...data
    },
    update: {
      ...data
    }
  })

  for (const t of transactions) {
    try {
      const tx = {
        transactionId: t.transaction,
        sender: t.sender,
        amount: +Amount.fromPlanck(t.amountNQT).getSigna(),
        message: extractMessage(t, decryptKey)
      }

      await database.transaction.upsert({
        where: {
          transactionId: t.transaction
        },
        create: {
          ...tx
        },
        update: {
          ...tx
        }
      })
    } catch (e) {
      console.error('Database update failed', e)
    }
  }
}

module.exports = {
  updateDatabase
}
