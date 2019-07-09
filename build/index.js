import fs from 'fs'
import rimraf from 'rimraf'
import path from 'path'


const publishPath = path.resolve('nast-vue-cli-plugin/publish')

clearDir(publishPath)
setTimeout(() => {
  initializeDir(publishPath)
  copyFiles('./app/nast/static', publishPath)
}, 100)


/**
 * @param {string}dir
 */
function clearDir(dir) {
  rimraf.sync(dir)
}

/**
 * @param {string}dir
 */
function initializeDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}


/**
 * Copy all dirs and files from source dir to target
 * @param {string}source
 * @param {string}target
 * @param {boolean}withRoot
 */
function copyFiles(source, target, withRoot = false) {
  let files = []
  
  const targetFolder = withRoot ? path.join(target, path.basename(source)) : target
  if (withRoot && !fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }
  
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function(file) {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFiles(curSource, targetFolder, true)
      } else {
        fs.copyFileSync(curSource, path.join(targetFolder, file))
      }
    })
  }
}
