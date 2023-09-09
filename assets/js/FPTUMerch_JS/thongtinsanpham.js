let order = JSON.parse(sessionStorage.getItem('order'));
let user = sessionStorage.getItem('currentUser');
let userName = document.querySelector('.user-name'); // SET USER NAME Ở TRÊN WEBSITE
let orderDetailsHTML = document.querySelector('#orderDetail');
let orderDetails = [];
let products = [];

user = JSON.parse(user);
console.log(user);

if(order == null || user == null){
    document.querySelector('.account-table').innerHTML = `
        <p style="color:red">HIỆN TẠI BẠN CHƯA ĐĂNG NHẬP, VUI LÒNG QUAY TRỞ LẠI TRANG ĐĂNG NHẬP <a href="./login.html?" style="color: blue">TẠI ĐÂY</a></p>`
    document.querySelector('.user-welcome').innerHTML = "";
} else{
    userName.innerHTML = user.FullName;
    fetch("https://fptumerchapi-cocsaigon.up.railway.app/api/Product/Get", {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            // Assuming data is an array of products
            // Push each product into the products array
            products.push(...data);
            console.log(products);
            Object.values(order.orderDetails).forEach((values) =>{
                let checkProduct = products.find(element => {
                    return element.productID == values.productID;
                })
                let orderDetail = document.createElement('tr');
                    orderDetail.innerHTML = `	<td>
                                            ${order.orderID}
                                        </td>
                                        <td>
                                            ${order.ordererName}
                                        </td>
                                        <td>
                                            ${order.ordererPhoneNumber}
                                        </td>
                                        <td>
                                            ${order.ordererEmail}
                                        </td>
                                        <td>
                                            ${order.deliveryAddress}
                                        </td>
                                        <td>
                                            ${checkProduct.productName}
                                        </td>
                                        <td>
                                            ${(checkProduct.price * values.amount).toLocaleString()} VND
                                        </td>
                                        <td>
                                            ${values.note}
                                        </td>
                                `;
                    orderDetailsHTML.append(orderDetail);
            });
        })
        .catch(error => {
            console.log(error);
        });
    
        function logout() {
            sessionStorage.removeItem('currentUser');
            window.location.href = "./login.html?";
        }
}
