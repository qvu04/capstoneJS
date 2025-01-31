const BASE_URL = "https://677c0b8720824100c07baceb.mockapi.io/products";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
// lấy danh sách sản phẩm
let fetchProduct = () => {
    axios.get(BASE_URL)
        .then((result) => {
            let list = result.data;
            console.log('✌️list --->', list);
            renderProduct(list);
        })
        .catch((err) => {
            console.log('✌️err --->', err);

        })
}
// filter product 
let filtersProduct = () => {
    let selectedType = document.getElementById("loaiSP").value;
    let filterList = [];

    if (selectedType === "all") {
        filterList = list;
    } else {
        filterList = list.filter(product => product.type === selectedType);
    }

    renderProduct(filterList)
}

fetchProduct();
// delete sản phẩm bằng id  
let deleteProduct = (id) => {
    axios.delete(`${BASE_URL}/${id}`)
        .then((result) => {
            console.log('✌️result --->', result);
            fetchProduct();
        })
        .catch((err) => {
            console.log('✌️err --->', err);

        })
}
// add sản phẩm 
let addProduct = () => {
    let products = getDataForm();

    axios.post(BASE_URL, products)
        .then((result) => {
            console.log('✌️result --->', result);
            $("#myModal1").modal("hide");
            fetchProduct();

        })
        .catch((err) => {
            console.log('✌️err --->', err);

        })
}
// lấy chi tiết sản phẩm
idProductEdit = null;
let editProduct = (id) => {
    idProductEdit = id;
    axios.get(`${BASE_URL}/${id}`)
        .then((result) => {
            showDataForm(result.data);
            $("#myModal1").modal("show");
            console.log('✌️result --->', result.data);

        })
        .catch((err) => {
            console.log('✌️err --->', err);

        })
}
// update sản phẩm
let updateProduct = () => {
    let product = getDataForm()
    axios.put(`${BASE_URL}/${idProductEdit}`, product)
        .then((result) => {
            console.log('✌️result --->', result);
            $("#myModal1").modal("hide");
            fetchProduct();

        })
        .catch((err) => {
            console.log('✌️err --->', err);

        })
}
// add to cart

let addToCart = (id) => {
    axios.get(`${BASE_URL}/${id}`)
        .then((result) => {
            console.log('✌️result --->', result);
            let product = result.data;
            let checkProduct = cart.find((item) => item.id === product.id)
            if (checkProduct) {
                checkProduct.quantity += 1;
            } else {
                let cartItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    screen: product.screen,
                    blackCamera: product.blackCamera,
                    frontCamera: product.frontCamera,
                    img: product.img,
                    desc: product.desc,
                    type: product.type,
                    quantity: 1,
                };
                cart.push(cartItem);
            }
            $("#myModal2").modal("show");
            renderCart(cart);

        })
        .catch((err) => {
            console.log('✌️err --->', err);

        })
}
renderCart(cart);
let updateQuantity = (index, action) => {
    if (action === "increase") {
        cart[index].quantity += 1;
    } else if (action === "decrease" && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    renderCart(cart);

}
let removeProduct = (index) => {
    cart.splice(index, 1);
    renderCart(cart);
}
