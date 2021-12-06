require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { createApi } = require('./api')

const getContext = async () => {
  const api = await createApi(process.env.SIGNUM_NODE_HOST || '');
  console.info('*** Using Signum Node:', api.service.settings.nodeHost)
  return {
    database: new PrismaClient(),
    api,
    config: {
      outfile: process.env.OUT_FILE_JSON,
      account: process.env.TARGET_ACCOUNT,
      passphrase: process.env.TARGET_ACCOUNT_PASSPHRASE,
      filter: {
        amount: parseInt(process.env.TX_FILTER_MIN_AMOUNT || '0', 10),
        messagePattern: process.env.TX_FILTER_MESSAGE_PATTERN,
        maxTransactions: parseInt(process.env.TX_FILTER_MAX_TRANSACTIONS || '500', 10)
      }
    }
  }
}

module.exports = {
  getContext
}
