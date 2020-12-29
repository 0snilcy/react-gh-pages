const core = require("@actions/core")
const github = require("@actions/github")
const fs = require("fs")
const path = require("path")

try {
  const repoName = github.context.payload.repository.name
  console.log(`Repository name ${repoName}!`)

  const routerFilePath = path.join(__dirname, core.getInput("router-file"))
  console.log(`Router file`, routerFilePath)

  const routerFile = fs.readFileSync(routerFilePath, "utf-8")
  fs.writeFileSync(
    routerFilePath,
    routerFile.replace(
      "<BrowserRouter>",
      `<BrowserRouter basename="/${repoName}">`
    )
  )

  const time = new Date().toTimeString()
  core.setOutput("time", time)
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  core.setFailed(error.message)
}
