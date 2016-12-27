import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import React from 'react'
import 'css-modules-require-hook/preset'
import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import findit from 'findit'
import config from '../config'
import createLayoutTemplate from '../src/createLayoutTemplate'
import getTreeTitle from '../src/getTreeTitle'
import routes from '../src/routes'

const sourcePath = process.argv[2]
const destPath = process.argv[3]
const finder = findit(sourcePath)
const layoutTemplate = createLayoutTemplate(config.layoutTemplate)

finder.on('file', (filePath, stat) => {
  if (path.extname(filePath) === '.md') {
    const dirname = path.dirname(filePath)
    const sourceBasedir = getSourceBasedir(filePath)
    const buildPath = dirname.replace(sourceBasedir, '')
    const destBasedir = path.join(destPath, buildPath)
    mkdirIfExists(destBasedir)
    renderRoute({
      filePath,
      dirname,
      fileBasename: path.basename(filePath),
      sourceBasedir,
      buildPath,
      destBasedir
    })
  }
})

finder.on('end', () => {
  console.log('All files rendered')
})

function mkdirIfExists (dirpath) {
  try {
    mkdirSync(dirpath)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
}

function getSourceBasedir (filepath) {
  const parts = filepath.split(path.sep)
  return parts[0]
}

function getUrl (buildPath, filename) {
  return [
    buildPath,
    filename
  ].join('/')
}

function renderRoute ({
  filePath,
  dirname,
  fileBasename,
  sourceBasedir,
  buildPath,
  destBasedir
}) {
  const noExtFilename = fileBasename.replace('.md', '')
  const url = getUrl(buildPath, noExtFilename)
  match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error('error', url, error)
    } else if (redirectLocation) {
      console.log('info', 'Redirecting', redirectLocation)
    } else if (renderProps) {
      console.log('Rendering', url, renderProps)

      const content = layoutTemplate({
        title: getTreeTitle(config.baseTitle, renderProps.components),
        content: renderToString(<RouterContext {...renderProps} />)
      })
      writeFileSync(
        path.join(destBasedir, noExtFilename + '.html'),
        content,
        'utf-8'
      )
    } else {
      console.log('Not found', url)
    }
  })
}
