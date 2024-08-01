// Existing code for handling selection and displaying screenshots

const messageBox = document.createElement("div");
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

let clicked = false;

function showMessageBox(e) {
  clicked = true;
  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();
  messageBox.style.top = `${rect.bottom + window.scrollY}px`;
  messageBox.style.left = `${rect.left + window.scrollX}px`;
  messageBox.style.position = "absolute";
  messageBox.style.display = "block";
}

function hideMessageBox() {
  clicked = false;
  messageBox.style.display = "none";
}

document.addEventListener("mouseup", (e) => {
  let selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    showMessageBox(e);

    messageBox.addEventListener("click", (e) => {
      chrome.runtime.sendMessage({
        message: "selected_text",
        data: selectedText,
      });
      hideMessageBox();
    });
  } else {
    hideMessageBox();
  }
});

function displayImageInFullScreen(image) {
  let isSelecting = false;
  let startX, startY, endX, endY;
  var fullscreenContainer = document.createElement("div");
  fullscreenContainer.style.position = "fixed";
  fullscreenContainer.style.top = "0";
  fullscreenContainer.style.left = "0";
  fullscreenContainer.style.width = "100vw";
  fullscreenContainer.style.height = "100vh";
  fullscreenContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  fullscreenContainer.style.zIndex = "9999";
  fullscreenContainer.id = "fullscreenContainer";

  var selectionArea = document.createElement("div");
  selectionArea.id = "selectionArea";

  var imageElement = document.createElement("canvas");
  const ctx = imageElement.getContext("2d");
  imageElement.style.display = "block";
  imageElement.style.position = "absolute";
  imageElement.style.top = "0px";
  imageElement.style.left = "0px";

  const img = new Image();

  img.src = image;

  console.log(image);

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  img.onload = function () {
    imageElement.height = img.height;
    imageElement.width = img.width;
    ctx.drawImage(
      img,
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
  };
  imageElement.style.cursor = "crosshair";
  imageElement.id = "image";

  selectionArea.style.outline = "2px dashed #000";
  selectionArea.style.display = "block";
  selectionArea.style.position = "absolute";
  selectionArea.style.top = "0px";
  selectionArea.style.left = "0px";

  fullscreenContainer.appendChild(imageElement);
  fullscreenContainer.appendChild(selectionArea);

  document.body.appendChild(fullscreenContainer);

  fullscreenContainer.addEventListener("mousedown", (e) => {
    isSelecting = true;
    startX = e.clientX - fullscreenContainer.getBoundingClientRect().left;
    startY = e.clientY - fullscreenContainer.getBoundingClientRect().top;
  });

  fullscreenContainer.addEventListener("mousemove", (e) => {
    if (!isSelecting) return;

    endX = e.clientX - fullscreenContainer.getBoundingClientRect().left;
    endY = e.clientY - fullscreenContainer.getBoundingClientRect().top;

    selectionArea.style.left = Math.min(startX, endX) + "px";
    selectionArea.style.top = Math.min(startY, endY) + "px";
    selectionArea.style.width = Math.abs(startX - endX) + "px";
    selectionArea.style.height = Math.abs(startY - endY) + "px";
  });

  document.addEventListener("mouseup", (e) => {
    isSelecting = false;
    endX = e.clientX - fullscreenContainer.getBoundingClientRect().left;
    endY = e.clientY - fullscreenContainer.getBoundingClientRect().top;

    console.log(startX, endX, startY, endY);

    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, x, y, width, height);

    const croppedImage = new Image();
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

