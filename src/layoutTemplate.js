import { readFileSync } from 'fs'

const LAYOUT_FILE = 'index.html'

const layoutFile = readFileSync(LAYOUT_FILE, 'utf8')
/* eslint-disable no-new-func */
const layoutTemplate = new Function('o', 'return `' + layoutFile + '`')
/* eslint-enable no-new-func */

export default layoutTemplate
