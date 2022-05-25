const title = document.querySelector('.productsContainer__title');
const count = document.querySelector('.productsContainer__count');
const productList = document.querySelector('.productListContainer');
const addModal = document.getElementById('addModal')
const openAddModalButton = document.getElementById('openAddModalButton')
const closeAddModalButton = document.getElementById('closeAddModalButton')
const addForm = document.getElementById('addForm');
const updateModal = document.getElementById('updateModal')
const closeUpdateModalButton = document.getElementById('closeUpdateModalButton')
const updateForm = document.getElementById('updateForm');

const successSound = 'success'

const products = [
    {
        code: '8932369',
        name: 'Zapatos',
        color: 'Rojo',
        weight: '2',
        stock: 1,
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calzadosrama.com%2F1041-large_default%2Fzapato-blucher-m3261.jpg&f=1&nofb=1'
    },
    {
        code: '123131',
        name: 'Camiseta',
        color: 'Gris',
        weight: '.5',
        stock: 1,
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.qDhMPW_28cS1-L68FlW4rgAAAA%26pid%3DApi&f=1'
    }
];

const render = () => {
    count.innerHTML = `Productos totales: ${products.length}`;
    productList.innerHTML = ''
    for (let i = 0; i < products.length; i++) {
        productList.innerHTML +=
            `<li class="productListContainer__item">
            <div class="imgContainer">
                <img
                    class="imgContainer__img"
                    src="${products[i].img}"
                    alt="${products[i].name}"
                />
            </div>
            <a href="${products[i].img}" target="about:blank">${products[i].name} (${products[i].code})</a>
            <p>Color: ${products[i].color}</p>
            <p>Peso: ${products[i].weight} kg</p>
            <p> Disponibles: ${products[i].stock}</p>
            <div class="buttonGroup">
                <button onclick="deleteProduct(${i})" class="btn btn--secondary productListContainer__item__button" >Eliminar</button>
                <button onclick="updateProduct(${i})" class="btn btn--primary productListContainer__item__button" >Actualizar</button>
            </div>
        </li>`
    }
}


const addProduct = (e) => {
    e.preventDefault();
    const index = products.findIndex((product) => product.code == e.target[0].value);
    if (index == -1) {
        if ([e.target[0].value,
        e.target[1].value,
        e.target[2].value,
        e.target[3].value,
        e.target[4].value,
        e.target[5].value]
            .includes("")) {
            alert("Llene todos los campos")
            return
        }
        products.push({
            code: e.target[0].value,
            name: e.target[1].value,
            color: e.target[2].value,
            weight: Number(e.target[3].value),
            stock: Number(e.target[4].value),
            img: URL.createObjectURL(e.target[5].files[0])
        })
    } else {
        if (window.confirm('Código ya ingresado. ¿sumar 1 a los disponibles?'))
            products[index].stock += 1;
    }
    createjs.Sound.play(successSound);
    addForm.reset();
    render()
}

const updateProduct = (i) => {
    const name = document.getElementById('nameUpdate')
    const color = document.getElementById('colorUpdate')
    const weight = document.getElementById('weightUpdate')
    const stock = document.getElementById('stockUpdate')
    const img = document.getElementById('imgUpdate')
    updateModal.classList = 'modalContainer modalContainer--active';
    document.getElementById('updateFormTitle').innerHTML = `Actualizando ${products[i].code}`
    name.value = products[i].name;
    color.value = products[i].color;
    weight.value = products[i].weight;
    stock.value = products[i].stock;
    updateModal.addEventListener('submit', (e) => {
        e.preventDefault();
        products[i].name = name.value;
        products[i].color = color.value;
        products[i].weight = Number(weight.value);
        products[i].stock = Number(stock.value);
        render();
        closeUpdateModalButton.click();
    })
}

const deleteProduct = (i) => {
    if (window.confirm("¿Está seguro?")) {
        products.splice(i, 1)
        render()
    }
}

function loadSound() {
    createjs.Sound.registerSound("assets/success.m4a", successSound);
}

addForm.addEventListener('submit', (e) => addProduct(e), true)

openAddModalButton.addEventListener('click', () => {
    addModal.classList = 'modalContainer modalContainer--active';
})

closeAddModalButton.addEventListener('click', () => {
    addModal.classList = 'modalContainer';
})

closeUpdateModalButton.addEventListener('click', () => {
    updateModal.classList = 'modalContainer';
})


Document.onload = render()