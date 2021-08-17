var windowCloseButton = document.getElementById("window-close-button");

if (windowCloseButton !== null && windowCloseButton !== undefined) {
	console.log("window-close-button-founded")
	
	windowCloseButton.onclick = function () {
		console.log("window-close-button-clicked")	  
		
		
	  stageInterface.closeWebView();
	};
  }