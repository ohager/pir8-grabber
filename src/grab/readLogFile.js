const fs = require('fs-extra')

function readLogFile (opts) {
  fs.ensureFileSync(opts.file)
  let data = null
  try {
    data = fs.readJsonSync(opts.file)
  } catch (e) {
    // no op -- for an empty file!
  }
  return data
}

module.exports = {
  readLogFile
}
