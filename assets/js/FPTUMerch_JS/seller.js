let user = JSON.parse(sessionStorage.getItem('currentUser')); // LẤY THÔNG TIN NGƯỜI DÙNG
let userName = document.querySelector('.user-name'); // SET USER NAME Ở TRÊN WEBSITE
let orderList = document.querySelector('#OrderList');


function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = "./login.html?";
}

if(JSON.parse(sessionStorage.getItem('currentUser') == null)){ //Chỉ cấp quyền cho người dùng đã đăng nhập
    document.querySelector('.account-table').innerHTML = `
        <p style="color:red">HIỆN TẠI BẠN CHƯA ĐĂNG NHẬP, VUI LÒNG QUAY TRỞ LẠI TRANG ĐĂNG NHẬP <a href="./login.html?" style="color: blue">TẠI ĐÂY</a></p>`
    document.querySelector('.user-welcome').innerHTML = "";
} else{
    userName.innerHTML = user.FullName;
    fetch('https://fptumerchapi-cocsaigon.up.railway.app/api/Orders/GetOrders', {
    method: "GET"
}).then(res => {
    return res.json();
}).then(data => {
    console.log(data);
    orderList.innerHTML = "";
    data.forEach((values) => {
        if (values != null) {
            let order = document.createElement('tr');
            order.innerHTML = `<td>
                                    <a href="thongtinsanpham.html" target="_blank" rel="noopener noreferrer">${values.orderID}</a>
                                </td>
                                <td>
                                    ÁO THUN FPTYOU
                                </td>
                                <td>
                                    ${values.discountCodeID}
                                </td>
                                <td>
                                    ${values.totalPrice.toLocaleString()} VND
                                </td>
                                <td>
                                ${
                                    values.payments == "1" ? "Momo" :
                                    values.payments == "2" ? "Chuyển khoản ngân hàng" :
                                    ""
                                }
                                </td>
                                <td>
                                ${
                                    values.paidStatus == true ? "Đã thanh toán" :
                                    values.paidStatus == false ? "Chưa thanh toán" :
                                    ""
                                }
                                </td>
                                <td>
                                ${
                                    values.earningMethod == "1" ? "Tại FPT" :
                                    values.earningMethod == "2" ? "Ship tận nhà" :
                                    ""
                                }
                                </td>
                                <td>
                                    <select id="tinhtrang" name="tinhtrang">
                                    ${
                                        values.earningMethod == "1" ? `<option value="1" selected>Đang Xác Nhận</option>
                                        <option value="2">Đã Xác Nhận</option>
                                        <option value="3">Đã Giao Hàng</option>
                                        <option value="4">Huỷ đơn</option>  ` :
                                        values.earningMethod == "2" ? `<option value="1">Đang Xác Nhận</option>
                                        <option value="2" selected>Đã Xác Nhận</option>
                                        <option value="3">Đã Giao Hàng</option>
                                        <option value="4">Huỷ đơn</option>  ` :
                                        values.earningMethod == "3" ? `<option value="1">Đang Xác Nhận</option>
                                        <option value="2">Đã Xác Nhận</option>
                                        <option value="3" selected>Đã Giao Hàng</option>
                                        <option value="4">Huỷ đơn</option>  ` :
                                        values.earningMethod == "4" ? `<option value="1">Đang Xác Nhận</option>
                                        <option value="2">Đã Xác Nhận</option>
                                        <option value="3">Đã Giao Hàng</option>
                                        <option value="4" selected>Huỷ đơn</option>  ` :
                                        ""
                                    }             
                                    </select>	
                                </td>
                                <td>
                                    <select id="shipper" name="shipper">                                 
                                        <option value="Đang Xác Thực">Thành Danh</option>
                                        <option value="Đã Xác Nhận" selected>Đoan Thanh</option>
                                        <option value="Đã Giao">Quốc Anh</option>
                                        <option value="Đã Giao">Đỗ Phú</option>
                                        <option value="Đã Giao">Công Huy</option>
                                        <option value="Đã Giao">Kiều Loan</option>
                                    </select>											  
                                </td>
                                <td>
                                    <textarea style="border: none; resize: none;">
                                    ${values.note}
                                    </textarea>
                                </td>
                        `;
            orderList.append(order);
        }
    })
}).catch(error => {
    console.log(error);
})
}

