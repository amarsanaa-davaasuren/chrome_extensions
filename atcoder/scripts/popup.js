

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



let checkbox = document.getElementsByClassName("onoff")[0];

console.log(checkbox.value);