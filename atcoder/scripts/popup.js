

chrome.runtime.sendMessage(
    {
        message:"get_name",
    },
    response => {
        if (response.message === "success"){
            document.querySelector("div").innerHTML = `Hello ${response.payload}`
        }
    }
);





document.addEventListener("DOMContentLoaded", function() {

    var checkbox = document.querySelector(".onoff");
    checkbox.addEventListener('change', function() {
        let isChecked = $("#onoffCheckbox").is(":checked");
        chrome.storage.sync.set({ "atcoderLastToggle": isChecked})
        $("#onoffCheckbox").checked = "false";
    });
    
    
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var tab = tabs[0];
		var tabUrl = tab.url;
		var arg = tabUrl.split("/");

		chrome.storage.sync.get("atcoderLastToggle", function(obj) {
			if (obj.atcoderLastToggle != null){
                console.log(obj.atcoderLastToggle);
                $("#onoffCheckbox").prop('checked', obj.atcoderLastToggle);
            }
            else{
                let isChecked = $("#onoffCheckbox").is(":checked");
                chrome.storage.sync.set({ "atcoderLastToggle": isChecked})
                $("#onoffCheckbox").checked = "false";
            }
		});
	});
})


