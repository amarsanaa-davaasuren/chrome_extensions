console.log("Hello Service Worker World! \n I am in background.js");


// injecting source code into the content page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: ratingChanger
    })
    .then(()=>{
      console.log("Successfully injected the content script.")
    })
    .then(()=>{
      console.log(":)")
    })
    .catch(err => console.log(err));
});


// content script
function ratingChanger() {
  console.log("Hello Content World! \n I've been injected from the background.js");
  // let rows = document.getElementsByTagName("table")[1].rows;
  // for (row of rows){
  //   if (row.cells[3].innerText != "Rating"){
  //     row.cells[3].innerHTML = 3000;
  //     row.cells[4].innerHTML = 3000;
  //     row.cells[3].style.color = "red";
  //   }
  // }
}