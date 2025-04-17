import fs from "fs"
import path = require("path")
import { IAction } from "../Interfaces/IActions"
const getAllFiles = require("./getAllFiles")

module.exports = (): IAction[] => {
  let actions: IAction[]= []

  const actionFiles: string = getAllFiles(path.join(__dirname, "..", "commands/actions"))

  for(const actionFile of actionFiles) {
    const actionObject: IAction = require(actionFile)

    actions.push(actionObject)
  }

  return actions
}