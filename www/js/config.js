// const baseUrl = "http://127.0.0.1:8000"
const baseUrl = "https://shaxcoder.pythonanywhere.com"
const cur_version = 4

var accessToken = localStorage.getItem("accessToken")
fetch(baseUrl+"/appmanage/", {
    method: "GET",
    headers: {"Content-Type": "application/json"}
})
.then(res => res.json())
.then(data => {
    console.log(data)
    if (data.message.length <= 0) {return;}
    var latest = data.message[data.message.length - 1]
    
    if (cur_version < latest.id) {
        document.body.innerHTML += `
    <div id="newUpdateBox">
        <h3>New Update ${latest.id}.${latest.version}</h3>
        <p>${latest.description}</p>
        <a class="update-button" id="newUpdateButton" href="${latest.update_url}">Update now</a>
    </div>
        `
        // console.log(latest.update_url)
        // document.getElementById("newUpdateButton").onclick = () => {window.open(latest.update_url)}
    }
})