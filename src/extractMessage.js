const { decryptMessage, generateMasterKeys } = require('@signumjs/crypto')

function extractMessage (transaction, passphrase = '') {
  const { attachment } = transaction
  if (!attachment) return ''

  if (attachment.message) {
    return attachment.message
  }

  if (passphrase && attachment.nonce && attachment.isText) {
    const { agreementPrivateKey } = generateMasterKeys(passphrase)
    return decryptMessage(attachment, transaction.senderPublicKey, agreementPrivateKey)
  }

  return ''
}

module.exports = {
  extractMessage
}
