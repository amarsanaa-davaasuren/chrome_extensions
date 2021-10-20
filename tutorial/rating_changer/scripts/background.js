
let rating = 3000;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ "rating": rating})
});


// injecting source code into the content page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: ratingChanger
    })
    .then(()=>{
      console.log("Successfully injected the content script.")
    })
    .catch(err => console.log(err));
});


// content script
function ratingChanger() {
  
  chrome.storage.sync.get("rating", function(obj) {
    rating = obj.rating;
  });

  let rows = document.getElementsByTagName("table")[1].rows;
  for (row of rows){
    if (row.cells[3].innerText != "Rating"){
      row.cells[3].innerHTML = rating;
      row.cells[4].innerHTML = rating;
    }
  }
}