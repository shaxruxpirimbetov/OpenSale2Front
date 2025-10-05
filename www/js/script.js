const cealert = (message) => {
    document.body.innerHTML += `
    <div class="customErrorAlert">
        <cheader>
            <i class="fas fa-close"></i>
            <h3>Error</h3>
        </cheader>
        <div class="message">
            <p>${message}</p>
        </div>
    </div>
    `
    setTimeout(() => {
        document.querySelector(".customErrorAlert").remove()
    }, 2500)
}

const addCenteredText = (message) => {
    var centeredText = document.createElement("div")
    centeredText.textContent = message
    centeredText.style.opacity = .5
    centeredText.style.fontWeight = 650
    centeredText.style.position = "absolute"
    centeredText.style.top = "30%"
    centeredText.style.left = "50%"
    centeredText.style.transform = "translate(-50%, -30%)"
    centeredText.style.zIndex = 99
    centeredText.className = "centeredTextBox"
    document.body.appendChild(centeredText)
}

const removeCenteredText = () => {
    try {
        document.querySelector(".centeredTextBox").remove()
    } catch {}
}

const addProductToList = (data, data_list) => {
    data.forEach(product => {
        console.log(product)
        data_list.innerHTML += `
        <div class="product" onclick="openProductView(${product.id})">
            <img src="" alt="" id="product_image_${product.id}">
            <div class="body">
                <div class="title" id="product_title_${product.id}"></div>
                <div class="price" id="product_price_${product.id}"></div>
            </div>
        </div>
        `
        document.getElementById(`product_title_${product.id}`).textContent = product.title
        document.getElementById(`product_price_${product.id}`).textContent = product.price
        document.getElementById(`product_image_${product.id}`).src = baseUrl+product.images[0].image
    })
}

const getMeApi = () => {
    var accessToken = localStorage.getItem("accessToken")
    
    fetch(baseUrl+"/user/get_me/", {
        method: "GET",
        headers: {"Content-Type": "application/json", "authorization": `Bearer ${accessToken}`}
    })
    .then(res => res.json())
    .then(data => {
        if (data.detail) {cealert(data.detail)}
        else if (data.status == false) {cealert(data.message)}
        else {console.log(data); return data;}
    })
    .catch(err => cealert(err))
}

const addMyProductsToList = (data, data_list) => {
    data.forEach(product => {
        data_list.innerHTML += `
            <div class="my-product" onclick="openUpdateProduct(${product.id})">
                <img src="" alt="" id="my-product-image-${product.id}">
                <div class="title" id="my-product-title-${product.id}"></div>
                <i class="fas fa-chevron-right"></i>
            </div>
        `
        document.getElementById(`my-product-title-${product.id}`).textContent = product.title
        document.getElementById(`my-product-image-${product.id}`).src = baseUrl+product.images[0].image
    })
}

const openUpdateProduct = product_id => {
    sessionStorage.setItem("update_product_id", product_id)
    location.assign("update-product.html")
}

const openProductView = product_id => {
    sessionStorage.setItem("view_product_id", product_id)
    location.assign("view-product.html")
}

const loadingFunc = (box, type) => {
    if (type == "on") {box.style.display = "block"}
    else {box.style.display = "none"}
}

