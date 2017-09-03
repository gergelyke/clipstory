const electron = require('electron')

const Clipboard = require('./src/clipboard')
const Tray = require('./src/tray')

const app = electron.app

let mainWindow

function onReady () {
  const clipboard = Clipboard.init()
  Tray.init({clipboard, app})
}

app.on('ready', onReady)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
