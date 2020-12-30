const core = require('@actions/core')
const github = require('@actions/github')

const setRouterBase = require('./src/router-base')
const setPublicBase = require('./src/public-base')

const abs = (path) => require('path').join(__dirname, path)
const repoName =
  process.env.NODE_ENV === 'development'
    ? 'test-repo-name'
    : github.context.payload.repository.name

try {
  setRouterBase(abs(core.getInput('router-file')), repoName)
  setPublicBase(abs(core.getInput('public-file')), repoName)

  const time = new Date().toTimeString()
  core.setOutput('time', time)
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  core.setFailed(error.message)
}
