const electron = require('electron')
const opn = require('opn')
const currentWindow = electron.remote.getCurrentWindow()
let url = null

// Utils

const openBrowser = appName =>
  opn(url, { app: appName, wait: false })
    .then(t => {
      currentWindow.hide()
      url = null
    })
    .catch(e => console.log('bum'))

// Browser Buttons

const firefox = document.getElementById('firefox')
firefox.addEventListener('click', () => openBrowser('firefox'))

const chrome = document.getElementById('chrome')
chrome.addEventListener('click', () => openBrowser('google chrome'))

const safari = document.getElementById('safari')
safari.addEventListener('click', () => openBrowser('safari'))

// Listen for URL
electron.ipcRenderer.on('incomingURL', function(event, message) {
  url = message
})