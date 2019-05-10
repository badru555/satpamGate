// Modules to control application life and create native browser window
const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const Menu = electron.Menu

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, logWindow, searchWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

};

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

function openLogWindow() {
    if (logWindow) {
      logWindow.focus()
      return
    }
    
    
  
    logWindow = new BrowserWindow({
      height: 500,
      resizable: false,
      width: 700,
      title: 'log'
    })
  
    logWindow.loadURL('file://' + __dirname + '/log.html')
    logWindow.setMenu(null);
  
    logWindow.on('closed', function() {
      logWindow = null
    })
  }
  function openSearchWindow() {
    if (searchWindow) {
      searchWindow.focus()
      return
    }
  
    searchWindow = new BrowserWindow({
      height: 500,
      resizable: false,
      width: 700,
      title: 'Mahasiswa'
    })
  
    searchWindow.loadURL('file://' + __dirname + '/mahasiswa.html')
    searchWindow.setMenu(null)
  
    searchWindow.on('closed', function() {
      searchWindow = null
    })
  }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow)
app.on('ready', function () {
    createWindow()
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Mencari mahasiswa',
                    click () { openSearchWindow() }

                },
                {
                    label: 'Log',
                    //click () { window.open('https://github.com', '_blank', 'nodeIntegration=no') }
                    click () { openLogWindow() }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
              {role: 'reload'},
              {role: 'forcereload'},
              {role: 'toggledevtools'},
              {type: 'separator'},
              {role: 'resetzoom'},
              {role: 'zoomin'},
              {role: 'zoomout'},
              {type: 'separator'},
              {role: 'togglefullscreen'}
            ]
          },

        {
            label: 'Window',
            submenu: [
                {
                    role: 'minimize'
                },
                {
                    role: 'close'
                }
            ]
        },

        {
            label: 'Help',
            submenu: [
                {
                    label: 'Contact us',
                    click () { require('electron').shell.openExternal('mailto:badrus@unida.gontor.ac.id?Subject=Assalamualaikum') }
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});
