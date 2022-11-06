const PRODUCTSLIST = document.querySelector('.products');


; (async function () {
    const data = await (await fetch('https://fakestoreapi.com/products')).json();
    dataRendering(data)
}());

const dataRendering = (data) => {
    for (let i of data) {
        const { title, description, id, image, price, rating: { count } } = i;
        const [img, p1, p2, p3, p4, trash, div] = createElements('img', 'p', 'p', 'p', 'p', 'img', 'div');
        img.src = image;
        p1.innerText = `Price: $${price}`;
        p2.innerText = `Discount: ${count}`;
        p3.innerText = `Desc: ${description}`;
        p4.innerText = `Name: ${title}`;
        trash.value = id;
        trash.src = './image/trash-basket.svg';
        trash.addEventListener('click', (event) => DELETEPROTUCT(trash));
        div.id = id;
        div.appendChild(img);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        div.appendChild(trash);
        PRODUCTSLIST.appendChild(div);

    }
};
const DELETEPROTUCT = async (trash) => {
    const id = trash.parentNode.id;
    const result = confirm('You are going to delete this product, are you sure?');
    if (result) {
        let response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE"
        });
        response = await response.json();
        alert('Product successful deleted');
        trash.parentNode.remove();
    }
}

const createElements = (...params) => params.map(element => document.createElement(element));
