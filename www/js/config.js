// const baseUrl = "http://127.0.0.1:8000"
const baseUrl = "https://shaxcoder.pythonanywhere.com"
const cur_version = 1

var accessToken = localStorage.getItem("accessToken")
fetch(baseUrl+"/appmanage/", {
    method: "GET",
    headers: {"Content-Type": "application/json", "authorization": `Bearer ${accessToken}`}
})
.then(res => res.json())
.then(data => {console.log(data)})