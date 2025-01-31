
let renderProduct = (productArr) => {
    let contentHTML = "";
    productArr.reverse().forEach((product) => {
        let tr = `<tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.screen}</td>
                    <td>${product.blackCamera}</td>
                    <td>${product.frontCamera}</td>
                    <td>${product.img}</td>
                    <td>${product.desc}</td>
                    <td>${product.type}</td>
                    <td>
                    <button onclick ='deleteProduct(${product.id})' class="btn btn-danger">Xóa</button>
                    <button onclick='editProduct(${product.id})' class="btn btn-dark">Sửa</button>
                    <button onclick = 'addToCart(${product.id})' class="btn btn-success">Thêm vào giỏ hàng</button>
                    </td>
        
        </tr>`
        contentHTML += tr;
        document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
    });
}
let getDataForm = () => {
    let name = document.getElementById("TenSP").value; w
    let price = document.getElementById("GiaSP").value * 1;
    let screen = document.getElementById("ScreenSP").value;
    let blackCamera = document.getElementById("BlackCameraSP").value;
    let frontCamera = document.getElementById("FrontCameraSP").value;
    let img = document.getElementById("HinhSP").value;
    let desc = document.getElementById("DescSP").value;
    let type = document.getElementById("loaiSP").value;

    let product = {
        name: name,
        price: price,
        screen: screen,
        blackCamera: blackCamera,
        frontCamera: frontCamera,
        img: img,
        desc: desc,
        type: type,
    }
    return product
}
let showDataForm = (product) => {
    document.getElementById("TenSP").value = product.name;
    document.getElementById("GiaSP").value = product.price;
    document.getElementById("ScreenSP").value = product.screen;
    document.getElementById("BlackCameraSP").value = product.blackCamera;
    document.getElementById("FrontCameraSP").value = product.frontCamera;
    document.getElementById("HinhSP").value = product.img;
    document.getElementById("DescSP").value = product.desc;
    document.getElementById("loaiSP").value = product.type;

}

let renderCart = (cartArr) => {
    let cartHTML = "";
    let totalPrice = 0;
    cartArr.forEach((cart, index) => {
        let itemTotalPrice = cart.price * cart.quantity;
        totalPrice += itemTotalPrice;
        let tr = `<tr>
                     <td>${cart.id}</td>
                    <td>${cart.name}</td>
                    <td>${cart.price}</td>
                    <td>${cart.screen}</td>
                    <td>${cart.blackCamera}</td>
                    <td>${cart.frontCamera}</td>
                    <td>${cart.img}</td>
                    <td>${cart.desc}</td>
                    <td>${cart.type}</td> 
                    <td>${cart.quantity}</td>  
                    <td>
                        <button class='btn btn-danger' onclick="updateQuantity(${index},'decrease')">-</button>
                        <button class='btn btn-success' onclick="updateQuantity(${index},'increase')">+</button>
                        <button class='btn btn-dark' onclick="removeProduct(${index})">Xóa</button>
                    </td>
        
        
        </tr>`;
        cartHTML += tr
    })
    cartHTML += `
    <tr>
        <td colspan="6" class="text-right"><strong>Tổng Tiền:</strong></td>
        <td><strong>${totalPrice} VND</strong></td>
    </tr>`;

    document.getElementById("cartTable").innerHTML = cartHTML;
    localStorage.setItem("cart", JSON.stringify(cart));
}

let checkout = () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(cart);
};

