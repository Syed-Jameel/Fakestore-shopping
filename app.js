function LoadCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.unshift("all");
            for (var category of data) {
                var option = document.createElement("option");
                option.value = category;
                option.text = category.toUpperCase();
                document.getElementById("lstcategories").appendChild(option);
            }
        });
}

function LoadProducts(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var product of data) {
                var div = document.createElement("div");
                div.className = "card m-2 text-center";
                div.style.width = "230px";
                div.innerHTML = `<img src=${product.image} class="p-1" height="220px">
                                 <div class="card-header" style="height:150px;">
                                    <p>${product.title}</p>
                                 </div>
                                 <div class="card-body" style="height:100px;">
                                    <h4>${product.price} $</h4>
                                    <p><span class="bi bi-star-fill text-warning"></span> ${product.rating.rate}</p>
                                 </div>
                                 <div class="card-footer">
                                    <button onclick="AddToCartClick(${product.id})" class="btn btn-warning w-100">
                                    <span class="bi bi-cart4"></span> <span id="cartbtntext">Add to Cart</span>
                                    </button>
                                 </div>`;
                document.getElementById("container").appendChild(div);
            }
        })
}

function categoryChange() {
    document.getElementById("container").innerHTML = "";
    var categoryName = document.getElementById("lstcategories").value;
    if (categoryName == "all") {
        LoadProducts('https://fakestoreapi.com/products')
    }
    else {
        LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`)
    }
}

var cartItems = [];
function GetCartItemsCount() {
    document.getElementById("lblcount").innerHTML = cartItems.length;
}

function AddToCartClick(id) {
    fetch(`http://fakestoreapi.com/products/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cartItems.push(data);
            GetCartItemsCount();
            alert(`${data.title} \n Added to Cart`);
        })
}

function showCart() {
    document.querySelector("tbody").innerHTML = "";
    for (var item of cartItems) {
        var tr = document.createElement("tr");
        var tdtitle = document.createElement("td");
        tdtitle.innerHTML = item.title;
        var tdprice = document.createElement("td");
        tdprice.innerHTML = item.price;
        var tdpreview = document.createElement("td");
        var tdremove = document.createElement("td");
        tdremove.innerHTML = `<button class="btn btn-outline-danger" onclick="RemoveItem(id)">
                                 <span class="bi bi-trash2-fill"></span>  
                              </button>`;

        var img = document.createElement("img");
        img.src = `${item.image}`;
        img.style.width = "50px";
        img.style.height = "50px";
        tdpreview.appendChild(img);

        tr.appendChild(tdtitle);
        tr.appendChild(tdprice);
        tr.appendChild(tdpreview);
        tr.appendChild(tdremove);

        document.querySelector("tbody").appendChild(tr);
    }
}

function RemoveItem(id) {
    var confirmResult = confirm("Are you sure want to remove item ?");
    if (confirmResult == true) {
        const Indexofobject = cartItems.findIndex(function (object) {
            return object.id === id;
        });
        cartItems.splice(Indexofobject, 1);
        showCart();
        GetCartItemsCount();
    }
    else {
        return false;
    }
}

function payClick() {
    document.write("<h1> Thanks for visit Fakstore </h1>".fontcolor("green"))
}

function bodyload() {
    LoadCategories();
    LoadProducts('https://fakestoreapi.com/products');
    GetCartItemsCount();
}
