import fs = require("fs")
import path = require("path")

module.exports = (directory: string, folderOnly = false) => {
  let filesNames: string[] = []

  const files = fs.readdirSync(directory, { withFileTypes: true })
  
  for (const file of files) {
    const filePath: string = path.join(directory, file.name)

    if(folderOnly) {
      if(file.isDirectory()) {
        filesNames.push(filePath)
      }
    } else {
      if(file.isFile()) {
        filesNames.push(filePath)
      }
    }
  }
  
  return filesNames
}