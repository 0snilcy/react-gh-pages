const fs = require('fs')

module.exports = (routerFilePath, repoName) => {
  console.log(`Router file`, routerFilePath)

  const file = fs.readFileSync(routerFilePath, 'utf-8')
  const newFile = file.replace(
    /<BrowserRouter (.*?)>/,
    `<BrowserRouter $1 basename="/${repoName}">`
  )

  console.log(newFile)

  fs.writeFileSync(routerFilePath, newFile)
}
