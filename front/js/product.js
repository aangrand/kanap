const getProductId = () => {
    return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

//recuperation d'un canap avec l'id dans le lien url

fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => {
        return response.json();
    })

    .then((product) => {
        selectedProduct(product);
        registredProduct(product);
    })
    .catch((error) => {
        alert(error);
    });


const selectedColor = document.querySelector("#colors");

const selectedQuantity = document.querySelector("#quantity");

const button = document.querySelector("#addToCart");

//affichage du produit

let selectedProduct = (product) => {
    document.querySelector("head > title").textContent = product.name;
    document.querySelector(".item__img")
        .innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.querySelector("#title").textContent += product.name;
    document.querySelector("#price").textContent += product.price;
    document.querySelector("#description").textContent += product.description;

    for (color of product.colors) {
        let option = document.createElement("option");
        option.innerHTML = `${color}`;
        option.value = `${color}`;
        selectedColor.appendChild(option);
    }
};

//enregistrement du produit dans le local storage

let registredProduct = (product) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        if (selectedColor.value == false) {
            confirm("Veuillez sélectionner une couleur");
        } else if (selectedQuantity.value == 0) {
            confirm("Veuillez sélectionner le nombre d'articles souhaités");
        } else {
            alert("Votre article a bien été ajouté au panier");

            let selectedProduct = {
                id: product._id,
                name: product.name,
                img: product.imageUrl,
                altTxt: product.altTxt,
                description: product.description,
                color: selectedColor.value,
                quantity: parseInt(selectedQuantity.value, 10),
            };
            console.log(selectedProduct);

            let existingCart = JSON.parse(localStorage.getItem("cart"));

            if (existingCart) {
                console.log("Il y a déjà un produit dans le panier, on compare les données");
                let item = existingCart.find(
                    (item) =>
                        item.id == selectedProduct.id && item.color == selectedProduct.color
                );
                if (item) {
                    item.quantity = item.quantity + selectedProduct.quantity;
                    item.totalPrice += item.price * selectedProduct.quantity;
                    localStorage.setItem("cart", JSON.stringify(existingCart));
                    console.log("Quantité supplémentaire dans le panier.");
                    return;
                }
                existingCart.push(selectedProduct);
                localStorage.setItem("cart", JSON.stringify(existingCart));
                console.log("Le produit a été ajouté au panier");

            } else {
                let createLocalStorage = [];
                createLocalStorage.push(selectedProduct);
                localStorage.setItem("cart", JSON.stringify(createLocalStorage));
                console.log("Le panier est vide, on ajoute le premier produit");
            }
        }
    });
};