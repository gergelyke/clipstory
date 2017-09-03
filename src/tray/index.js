const path = require('path')
const electron = require('electron')

const nativeImage = electron.nativeImage
const Menu = electron.Menu
const Tray = electron.Tray

let appIcon = null

function TrayHandler (options) {
  const iconPath = path.join(__dirname, 'tray.png')
  const image = nativeImage.createFromPath(iconPath)
  const {clipboard, app} = options

  image.setTemplateImage(true)
  appIcon = new Tray(image)

  clipboard.on('update', function (data) {
    const updatedContextMenu = data.map(function (item) {
      const displayItem = item.length > 30 ? item.substring(0, 27) + '...' : item
      return {
        label: displayItem,
        click: function () {
          clipboard.set(item)
        },
        position: 'endof=clipboarditems'
      }
    })

    updatedContextMenu.push({
      label: 'Clear clipboard history',
      click: function () {
        clipboard.clear()
      },
      position: 'endof=actions'
    }, {
      label: 'Quit',
      click: function () {
        app.quit()
      },
      position: 'endof=actions'
    })

    appIcon.setContextMenu(Menu.buildFromTemplate(updatedContextMenu))
  })

  appIcon.setToolTip('Clipstory')
}

function init (options) {
  return new TrayHandler(options)
}

module.exports.init = init
