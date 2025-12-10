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

    window.changeQuantity = function (change) {
        const input = document.getElementById("quantity");
        let current = parseInt(input.value);
        let newValue = current + change;

        if (newValue < 1) newValue = 1;

        const maxStock = window.PRODUCT.stock_s || 1;
        if (newValue > maxStock) newValue = maxStock;

        input.value = newValue;
    };

});
