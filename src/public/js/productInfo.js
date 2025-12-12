// đổi ảnh 
function changeMainImage(thumbnail) {
    const mainImg = document.getElementById("mainImage");
    const thumbnailsImg = document.querySelectorAll('.thumbnails-img');
    mainImg.src = thumbnail.src;
    thumbnailsImg.forEach(img => img.classList.remove('active'));
    thumbnail.classList.add('active');
}

// đóng mở dropdown 
function toggleDropdown(type) {
    const content = document.getElementById(type);
    const arrow = content.previousElementSibling.querySelector(".arrow");

    content.classList.toggle("open");
    arrow.classList.toggle("open");
}

// chọn size    
function selectSize(button) {
    const allSize = document.querySelectorAll('.size-btn');
    allSize.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

// số lượng
document.addEventListener("DOMContentLoaded", () => {
    window. changeProductQuantity = function (change) {
        const input = document.getElementById("quantity");
        let current = parseInt(input.value);
        let newValue = current + change;

        if (newValue < 1) newValue = 1;

        const maxStock = window.PRODUCT.stock_s || 1;
        if (newValue > maxStock) newValue = maxStock;

        input.value = newValue;
    };

    document.getElementById("addToCart").onclick = function () {
        const btn = this;
        const size = document.querySelector(".size-btn.selected")?.innerText;
        if (!size) return alert("Chọn size trước!");

        const quantity = Number(document.getElementById("quantity").value);

        fetch("/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: btn.dataset.id,
                name: btn.dataset.name,
                price: Number(btn.dataset.price),
                image: btn.dataset.image,
                size,
                quantity
            })
        })
            .then(res => res.json())
            .then(data => {
                document.querySelector(".cart-count").innerText = data.cartCount;
                alert(`Đã thêm ${quantity} sản phẩm vào giỏ!`);
            })
            .catch(err => console.log("Lỗi:", err));
    }

    updateCartSummary();
});

document.getElementById('buyNow').addEventListener('click', async () => {
    const quantity = Number(document.getElementById('quantity').value);
    const productId = PRODUCT.id;

    // Lấy size từ nút đang chọn
    const selectedBtn = document.querySelector(".size-btn.selected");
    if (!selectedBtn) return; // Không chọn size thì không làm gì
    const size = selectedBtn.innerText;

    try {
        await fetch('/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId,
                size,
                quantity
            })
        });

        // Sau khi thêm vào giỏ, chuyển thẳng sang trang shopping
        window.location.href = '/shopping';
    } catch (err) {
        console.error(err);
    }
});

