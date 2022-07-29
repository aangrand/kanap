let params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;
console.log(urlProduct);

function fetchProd(input) {
    fetch(input)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            //console.log(value);
            affP(value);
        })
        .catch(function (err) {
            console.log(err)
        });
}

fetchProd(urlProduct)

function affP(value) {
    console.log(value)
    document.querySelector(".item__img").innerHTML += `<img src="${value.imageUrl}"" alt="${value.altTxt}">`;
    document.querySelector("#title").innerHTML += `${value.name}`;
    document.querySelector("#price").innerHTML += `${value.price}`;
    document.querySelector("#description").innerHTML += `${value.description}`;
    for (i = 0; i < value.colors.length; i += 1) {
        document.querySelector("#colors").innerHTML += `<option value="${value.colors[i]}">${value.colors[i]}</option>`
    }

    document.querySelector("#addToCart").addEventListener('click', (e) => {
        e.preventDefault();
        let productOptions = {
            id: `${value._id}`,
            nom: `${value.name}`,
            couleur: document.querySelector("#colors").value,
            quantite: parseInt(document.querySelector("#quantity").value),
            prix: `${value.price}`,
            image: `${value.imageUrl}`,
            alt: `${value.altTxt}`
        }
    })
}