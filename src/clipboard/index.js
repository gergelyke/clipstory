const {clipboard} = require('electron')
const EventEmitter = require('events').EventEmitter

const UPDATE_INTERVAL = 1000

function Clipboard () {
  this.items = []
  this.eventEmitter = new EventEmitter()

  setInterval(this.update.bind(this), UPDATE_INTERVAL)
}

Clipboard.prototype.update = function () {
  const currentItem = clipboard.readText()

  if (!(this.items[this.items.length - 1] === currentItem)) {
    this.items.push(currentItem)
    this.eventEmitter.emit('update', this.items)
  }
}

Clipboard.prototype.getItems = function () {
  return this.items
}

Clipboard.prototype.on = function (eventName, callback) {
  this.eventEmitter.on(eventName, callback)
}

Clipboard.prototype.set = function (text) {
  clipboard.writeText(text)
}

Clipboard.prototype.clear = function (text) {
  this.items = []
  this.eventEmitter.emit('update', this.items)
}

function init () {
  return new Clipboard()
}

module.exports.init = init
