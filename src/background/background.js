// Existing code for context menu and screenshot handling
/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender, sendResponse);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveWebpage",
    title: "Footprint webpage!",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "saveScreenshot",
    title: "Footprint screenshot!",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveWebpage") {
    console.log(info, tab);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // chrome.tabs.sendMessage(tabs[0].id, { message: "save_webpage" });
      console.log(tabs);
    });
  } else if (info.menuItemId === "saveScreenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          message: "save_screenshot",
          data: dataUrl,
        });
      });
    });
  }
});
*/


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveWebpage",
    title: "Footprint webpage!",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "saveScreenshot",
    title: "Footprint screenshot!",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveWebpage") {
    chrome.identity.launchWebAuthFlow(
      {
        url: "http://localhost:3000/initialize",
        interactive: true,
      },
      (redirect_url) => {
        if (chrome.runtime.lastError || !redirect_url) {
          console.error(chrome.runtime.lastError);
          return;
        }

        
        chrome.windows.create({
          url: "popup.html",
          type: "popup",
          width: 400,
          height: 600,
        });
      }
    );
  }
  // Handle screenshota
});

function initiateAuthFlow() {
  const backendUrl = "http://localhost:3000"; // Replace with your Fastify backend URL

  chrome.identity.launchWebAuthFlow(
    {
      url: `${backendUrl}/initialize`,
      interactive: true,
    },
    function (redirectUrl) {
      if (chrome.runtime.lastError || !redirectUrl) {
        console.error(chrome.runtime.lastError);
        return;
      }
      const url = new URL(redirectUrl);
      const authToken = url.searchParams.get("token");

      if (authToken) {
        console.log("Authentication successful, token received:", authToken);
        handleAuthToken(authToken);
      } else {
        console.error("No token received");
      }
    }
  );
}

function handleAuthToken(token) {

  console.log("Handling token:", token);

}
