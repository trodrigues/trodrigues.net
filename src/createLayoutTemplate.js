import { readFileSync } from 'fs'

export default function layoutTemplate (layoutFilePath) {
  const layoutFile = readFileSync(layoutFilePath, 'utf8')
  /* eslint-disable no-new-func */
  return new Function('o', 'return `' + layoutFile + '`')
  /* eslint-enable no-new-func */
}
