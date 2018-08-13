const { app, BrowserWindow } = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 355,
    height: 115,
    frame: false,
    transparent: true
  })
  win.loadFile('./src/index.html')

  if (process.env.NODE_ENV === 'development') {
    win.toggleDevTools()
  }
}

app.on('ready', createWindow)
