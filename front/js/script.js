const url = 'http://localhost:3000/api/products';

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

fetchProd(url)

function affP(value) {
    console.log(value)
    console.log(value.length)

    let content = ''; 

    for(i = 0; i < value.length; i++) {
        let p_id = value[i]._id;
        let p_name = value[i].name;
        let p_imageUrl = value[i].imageUrl;
        let p_description = value[i].description;
        let p_altTxt = value[i].p_altTxt;

        content += `
        <a href="./product.html?id=${p_id}">
            <article>
              <img src="${p_imageUrl}" alt="${p_altTxt}">
              <h3 class="productName">${p_name}</h3>
              <p class="productDescription">${p_description}</p>
            </article>
        `
        console.log(content);
    }
    //document.createElement()
    let doc = document.getElementById('items')
    console.log(doc);
    doc.innerHTML = content;
}