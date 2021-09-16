

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.local.set({

    })
});



chrome.storage.local.get("name",data => {

});

let tabId_ = "-1";
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^http.*history/.test(tab.url)){
        tabId_ = tabId;

        chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["./performance_visualizer.css"]
        })
            .then(()=>{

                chrome.scripting.executeScript({
                    target: {tabId: tabId},
                    files: ["./performance_visualizer.js"]
                })
                    .then(()=>{

                    })
                    
            })
            .catch(err => console.log(err));
    }
});


chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    if (request.message === "get_name"){
        sendResponse({
            message:"success",
            payload:"sana_taco"
        })
    }
});




