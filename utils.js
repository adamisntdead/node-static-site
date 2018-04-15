const fs = require('fs-extra')

async function getConfig() {
  const config = await fs.readJSON('config.json')

  if (!config.public) {
    throw new Error('No Public Directory Given In `config.json`')
  }

  return config
}

module.exports = { getConfig }
