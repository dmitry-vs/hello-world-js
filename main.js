const { app, BrowserWindow } = require('electron');
const path = require('path');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'assets/icon.png'), // Optional icon
        title: 'Hello World - Electron App',
        show: false, // Don't show until ready
        backgroundColor: '#667eea'
    });

    // Load the HTML file
    mainWindow.loadFile('index.html');

    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Log to console (also visible in DevTools)
        console.log('Hello World from Electron!');
        console.log('Привет, мир!');
        console.log('Это простое приложение на JavaScript');
        console.log('Теперь текст отображается в окне Electron!');
        console.log('Текст выводится с помощью HTML и CSS');
    });

    // Open DevTools (optional, for development)
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // On macOS it is common for applications to stay active until explicitly quit
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
    });
});
