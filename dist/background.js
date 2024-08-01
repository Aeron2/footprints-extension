/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, sender, sendResponse);
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "saveWebpage",
    title: "Footprint webpage!",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "saveScreenshot",
    title: "Footprint screenshot!",
    contexts: ["all"]
  });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "saveWebpage") {
    console.log(info, tab);
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      // chrome.tabs.sendMessage(tabs[0].id, { message: "save_webpage" });
      console.log(tabs);
    });
  } else if (info.menuItemId === "saveScreenshot") {
    chrome.tabs.captureVisibleTab(null, {
      format: "png"
    }, function (dataUrl) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          message: "save_screenshot",
          data: dataUrl
        });
      });
    });
  }
});
/******/ })()
;
//# sourceMappingURL=background.js.map