/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./src/content/content.js ***!
  \********************************/
var messageBox = document.createElement("div");
messageBox.style.backgroundColor = "hsla(220, 62%, 45%)";
messageBox.style.color = "white";
messageBox.style.padding = "5px";
messageBox.style.borderRadius = "5px";
messageBox.style.zIndex = "1000";
messageBox.style.cursor = "pointer";
messageBox.innerText = "Footprint it!";
messageBox.id = "messageBox";
messageBox.style.display = "none";
document.body.appendChild(messageBox);
var clicked = false;
function showMessageBox(e) {
  clicked = true;
  var range = window.getSelection().getRangeAt(0);
  var rect = range.getBoundingClientRect();
  messageBox.style.top = "".concat(rect.bottom + window.scrollY, "px");
  messageBox.style.left = "".concat(rect.left + window.scrollX, "px");
  messageBox.style.position = "absolute";
  messageBox.style.display = "block";
}
function hideMessageBox() {
  clicked = false;
  messageBox.style.display = "none";
}
document.addEventListener("mouseup", function (e) {
  var selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    showMessageBox(e);
    messageBox.addEventListener("click", function (e) {
      //   if (e.target.id === "messageBox") {
      chrome.runtime.sendMessage({
        message: "selected_text",
        data: selectedText
      });
      hideMessageBox();
      //   } else {
      hideMessageBox();
      //   }
    });
  } else {
    hideMessageBox();
  }
});
function displayImageInFullScreen(image) {
  // Create a full-screen container element
  var isSelecting = false;
  var startX, startY, endX, endY;
  var fullscreenContainer = document.createElement("div");
  fullscreenContainer.style.position = "fixed";
  fullscreenContainer.style.top = "0";
  fullscreenContainer.style.left = "0";
  fullscreenContainer.style.width = "100vw";
  fullscreenContainer.style.height = "100vh";
  fullscreenContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  // fullscreenContainer.style.display = "flex";
  // fullscreenContainer.style.alignItems = "center";
  // fullscreenContainer.style.justifyContent = "center";
  fullscreenContainer.style.zIndex = "9999";
  fullscreenContainer.id = "fullscreenContainer";
  var selectionArea = document.createElement("div");
  selectionArea.id = "selectionArea";

  // Create an image element
  var imageElement = document.createElement("canvas");
  var ctx = imageElement.getContext("2d");
  imageElement.style.display = "block";
  imageElement.style.position = "absolute";
  imageElement.style.top = "0px";
  imageElement.style.left = "0px";
  var img = new Image();
  img.src = image;
  console.log(image);
  var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  img.onload = function () {
    imageElement.height = img.height;
    imageElement.width = img.width;
    ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight
    // "100vw",
    // "100vh"
    // 0,
    // 0,
    );
  };
  imageElement.style.cursor = "crosshair";
  imageElement.id = "image";
  selectionArea.style.outline = "2px dashed #000";
  selectionArea.style.display = "block";
  selectionArea.style.position = "absolute";
  selectionArea.style.top = "0px";
  selectionArea.style.left = "0px";

  // Add the image element to the full-screen container
  fullscreenContainer.appendChild(imageElement);
  fullscreenContainer.appendChild(selectionArea);

  // Add the full-screen container to the DOM
  document.body.appendChild(fullscreenContainer);
  fullscreenContainer.addEventListener("mousedown", function (e) {
    isSelecting = true;
    startX = e.clientX - fullscreenContainer.getBoundingClientRect().left;
    startY = e.clientY - fullscreenContainer.getBoundingClientRect().top;
  });
  fullscreenContainer.addEventListener("mousemove", function (e) {
    if (!isSelecting) return;
    endX = e.clientX - fullscreenContainer.getBoundingClientRect().left;
    endY = e.clientY - fullscreenContainer.getBoundingClientRect().top;

    // Update the selection area position and size
    selectionArea.style.left = Math.min(startX, endX) + "px";
    selectionArea.style.top = Math.min(startY, endY) + "px";
    selectionArea.style.width = Math.abs(startX - endX) + "px";
    selectionArea.style.height = Math.abs(startY - endY) + "px";
  });
  document.addEventListener("mouseup", function (e) {
    isSelecting = false;
    endX = e.clientX - fullscreenContainer.getBoundingClientRect().left;
    endY = e.clientY - fullscreenContainer.getBoundingClientRect().top;
    console.log(startX, endX, startY, endY);
    // Calculate the selected area's dimensions and position
    var x = Math.min(startX, endX);
    var y = Math.min(startY, endY);
    var width = Math.abs(startX - endX);
    var height = Math.abs(startY - endY);

    // Crop the image based on the selected area
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, x, y, width, height);

    // Display the cropped image
    var croppedImage = new Image();
    croppedImage.src = canvas.toDataURL();
    console.log(croppedImage.src);
    document.body.removeChild(fullscreenContainer);
  });
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.message === "save_screenshot") {
    displayImageInFullScreen(message.data);
  }
});

// document.addEventListener("mousedown", (e) => {
//   hideMessageBox();
// });

// document.addEventListener("click", (e) => {
//   if (clicked && e.target.id !== "messageBox") {
//     hideMessageBox();
//   }
// });
/******/ })()
;
//# sourceMappingURL=content.js.map