let input = document.querySelector('#rating');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.storage.sync.get("rating", function(obj) {
        console.log(obj.rating);
        input.value = obj.rating;
    });
});

input.addEventListener('change', (event) => {
    let newRating = event.target.value;
    chrome.storage.sync.set({ "rating": newRating})
});