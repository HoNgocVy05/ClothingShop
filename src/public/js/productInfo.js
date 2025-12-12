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

    const size = button.innerText.toLowerCase();
    const maxStock = window.PRODUCT[`stock_${size}`] || 1;
    const qtyInput = document.getElementById("quantity");
    if (parseInt(qtyInput.value) > maxStock) qtyInput.value = maxStock;
}

// số lượng

window.changeProductQuantity = function(change) {
    const input = document.getElementById("quantity");
    let current = Number(input.value) || 1;

    const selectedSizeBtn = document.querySelector(".size-btn.selected");
    if (!selectedSizeBtn) return alert("Chọn size trước!");
    const size = selectedSizeBtn.innerText.toLowerCase();

    const maxStock = Number(window.PRODUCT[`stock_${size}`]) || 1;

    let newValue = current + change;
    if (newValue < 1) newValue = 1;
    if (newValue > maxStock) newValue = maxStock;

    input.value = newValue;
};



document.addEventListener("DOMContentLoaded", () => {
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
