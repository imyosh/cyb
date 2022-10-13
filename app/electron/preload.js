const { contextBridge, ipcRenderer } = require("electron")
const fs = require("fs")
const Store = require("secure-electron-store").default
const ContextMenu = require("secure-electron-context-menu").default
const SecureElectronLicenseKeys = require("secure-electron-license-keys")
var mammoth = require("mammoth")

// Create the electron store to be made available in the renderer process
const store = new Store()

var options = {
  styleMap: [
    "p[style-name='Code Block'] => pre",
    "[style-name='HTMLPreformatted'] => .codey",
    "[style-name='NormalWeb'] => .weby",
  ],
}

// message: "Unrecognised paragraph style: 'Normal (Web)' (Style ID: NormalWeb)"
// type: "warning"
// [[Prototype]]: Object
// 1:
// message: "Unrecognised paragraph style: 'HTML Preformatted' (Style ID: HTMLPreformatted)"

fs.writeFileSync("/home/yosh/Desktop/test.json", JSON.stringify({ test: 4 }))

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  // store used to handle the database
  store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer),
  licenseKeys: SecureElectronLicenseKeys.preloadBindings(ipcRenderer),
  // exposing mammoth function to convert docs to html
  convertToHtml: (path, func) =>
    mammoth.convertToHtml({ path }, options).then(func),

  writeToJson: (path, data) => fs.writeFileSync(path, JSON.stringify(data)),
})
