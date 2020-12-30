const { parse } = require('node-html-parser')
const fs = require('fs')

module.exports = (publicFilePath, repoName) => {
  console.log(`Public file`, publicFilePath)

  const indexFile = parse(fs.readFileSync(publicFilePath, 'utf-8'))
  const base = indexFile.querySelector('base')
  if (base) {
    base.setAttribute('href', `/${repoName}`)
  } else {
    const head = indexFile.querySelector('head')
    head.insertAdjacentHTML('afterbegin', `<base href="/${repoName}" />`)
  }
  console.log(indexFile.toString())
  fs.writeFileSync(publicFilePath, indexFile.toString())
}
