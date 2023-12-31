// Hàm chuyển đổi ngày thành định dạng "dd/mm/yyyy"
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Bắt sự kiện click của nút "Thống kê"
document.getElementById('filterButton').addEventListener('click', function () {
    displayProducts();
});

// Hàm lọc và hiển thị sản phẩm
function displayProducts() {
    // Lấy giá trị từ các trường ngày và loại sản phẩm
    var startDate = new Date(document.getElementById("startDate").value);
    var endDate = new Date(document.getElementById("endDate").value);
    var selectedProductType = document.getElementById("productType").value;

    // Lấy dữ liệu từ localStorage
    var Statistique = JSON.parse(localStorage.getItem('bills')) || [];
    var bodyTableStatis = document.getElementById("bodyTableStatis");
    bodyTableStatis.innerHTML = "";

    // Sử dụng đối tượng để theo dõi thông tin của từng sản phẩm và tổng giá tiền
    const productTotals = {};
    let totalAmount = 0;
    let totalQuantity = 0;

    Statistique.forEach(order => {
        order.detailBill.forEach(product => {
            const productDate = new Date(product.dateSold);
            const isTypeMatch = selectedProductType === "" || selectedProductType === product.category;

            if (productDate >= startDate && productDate <= endDate && isTypeMatch) {
                if (productTotals[product.productName]) {
                    // Nếu sản phẩm đã tồn tại, cộng thêm số lượng và giá
                    productTotals[product.productName].quantity += parseInt(product.qualityPro);
                    productTotals[product.productName].totalPrice += product.pricePro * parseInt(product.qualityPro);

                    const existingProductDate = new Date(productTotals[product.productName].latestDateSold);
                    if (productDate > existingProductDate) {
                        productTotals[product.productName].latestDateSold = product.dateSold;
                    }
                    
                    // Cập nhật tổng giá tiền
                    totalAmount += product.pricePro * parseInt(product.qualityPro);
                    totalQuantity += parseInt(product.qualityPro);
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm mới vào danh sách
                    productTotals[product.productName] = {
                        quantity: parseInt(product.qualityPro),
                        totalPrice: product.pricePro * parseInt(product.qualityPro),
                        latestDateSold: product.dateSold,
                        picture: product.picture
                    };

                    // Cập nhật tổng giá tiền
                    totalAmount += product.pricePro * parseInt(product.qualityPro);
                    totalQuantity += parseInt(product.qualityPro);
                }
            }
        });
    });

    // Hiển thị thông tin đã thống kê lên bảng
    Object.keys(productTotals).forEach(productName => {
        const product = productTotals[productName];
        const row = document.createElement('tr');
        row.classList.add('row-product-admin');
        row.innerHTML = `<td>${productName}</td>
            <td><img src="${product.picture}" width="80" alt="Hình ảnh sản phẩm"></td>
            <td>${formatDate(new Date(product.latestDateSold))}</td>
            <td>${product.quantity}</td>
            <td>${product.totalPrice.toLocaleString("vi-VN")} đ</td>`;
        bodyTableStatis.appendChild(row);
    });

    // Hiển thị tổng giá tiền
    const totalAmountRow = document.createElement('tr');
    totalAmountRow.innerHTML = `<td colspan="3"><strong>Tổng:</strong></td>
        <td style="color: red"><strong>${totalQuantity}</strong></td>
        <td style="color: red"><strong>${totalAmount.toLocaleString("vi-VN")} đ</strong></td>`;
    bodyTableStatis.appendChild(totalAmountRow);
}

// Kiểm tra xem localStorage đã có dữ liệu hay chưa
if (!localStorage.getItem('bills')) {
    // Thêm dữ liệu vào localStorage nếu chưa có
    // Tạo một mẫu dữ liệu sản phẩm
    var newProducts = [
        {
            productName: "Sản phẩm 1",
            picture: "./assets/image/desk3.jpg",
            dateSold: "2023-11-25", 
            category: 'phong_khach',
            qualityPro: 5,
            pricePro: 20
        },
        {
            productName: "Sản phẩm 2",
            picture: "./assets/image/desk1.webp",
            dateSold: "2023-11-10", 
            category: 'phong_ngu',
            qualityPro: 3, 
            pricePro: 15 
        },
        {
            productName: "Sản phẩm 2",
            picture: "./assets/image/bookself1.jpg",
            dateSold: "2023-11-20", 
            category: 'phong_ngu',
            qualityPro: 3, 
            pricePro: 15 
        },
        // Thêm các sản phẩm khác nếu cần
    ];
    var newProducts2 = [
        {
            productName: "Sản phẩm 1",
            picture: "./assets/image/bookshelf4.jpg",
            dateSold: "2023-10-25", 
            category: 'phong_khach',
            qualityPro: 5,
            pricePro: 20
        },
        {
            productName: "Sản phẩm 2",
            picture: "./assets/image/1.ARMCHAIR-ROYAL-VAI-2041-9-1-768x495.jpg",
            dateSold: "2023-11-15", 
            category: 'phong_ngu',
            qualityPro: 3, 
            pricePro: 15 
        },
        {
            productName: "Sản phẩm 2",
            picture: "./assets/image/armchair3.jpg",
            dateSold: "2023-11-27", 
            category: 'phong_ngu',
            qualityPro: 3, 
            pricePro: 15 
        },
        {
            productName: "Sản phẩm 3",
            picture: "./assets/image/phong-an-001.jpg",
            dateSold: "2023-11-11", 
            category: 'phong_ngu',
            qualityPro: 6, 
            pricePro: 15 
        },
        // Thêm các sản phẩm khác nếu cần
    ];

    var existingData = [
        {
            idBill: "001",
            user: "Duy Lâm",
            date: "2023-11-22",
            sdt: "0976077913",
            address: "273 An Dương Vương",
            detailBill: newProducts
        },
        {
            idBill: "002",
            user: "Nam Khương",
            date: "2023-11-10",
            sdt: "0913433567",
            address: "99 Hồng Bàng",
            detailBill: newProducts2
        },

    ];

    localStorage.setItem('bills', JSON.stringify(existingData));
}
