const selectAllCheckbox = document.getElementById('select-all');
const rowCheckboxes = document.querySelectorAll('.row-checkbox');

if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
        const checked = selectAllCheckbox.checked;
        rowCheckboxes.forEach(cb => cb.checked = checked);
    });
}

rowCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const allChecked = [...rowCheckboxes].every(r => r.checked);
        selectAllCheckbox.checked = allChecked;
    });
});

function changeQuantity(btn, change) {
    const qtyInput = btn.closest('.quantity-controls').querySelector('.quantity-input');
    let newQty = Math.max(1, Number(qtyInput.value) + change);
    qtyInput.value = newQty;

    // Update row total
    const row = btn.closest('.shopping-product');
    const price = Number(row.querySelector('.discount-price').dataset.price);
    row.querySelectorAll('.discount-price')[1].innerText =
        (price * newQty).toLocaleString() + 'đ';

    // Update tổng số lượng & tổng tiền
    updateCartSummary();

    // Update DB
    const productId = row.querySelector('.remove-item').dataset.id;
    const size = row.querySelector('.remove-item').dataset.size;

    fetch('/cart/update', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, size, quantity: newQty })
    });
}

// Xóa sản phẩm
document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('.shopping-product');
        const productId = btn.dataset.id;
        const size = btn.dataset.size;

        fetch('/cart/remove', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, size })
        })
            .then(res => res.json())
            .then(() => {
                row.remove();
                updateCartSummary();
            });
    });
});

// Update tổng số lượng & tổng tiền
function updateCartSummary() {
    const rows = document.querySelectorAll('.shopping-product');
    let totalQty = 0, totalAmount = 0;

    rows.forEach(row => {
        const qty = Number(row.querySelector('.quantity-input').value);
        const price = Number(row.querySelector('.discount-price').dataset.price);
        totalQty += qty;
        totalAmount += qty * price;
    });

    document.getElementById('total-quantity').innerText = totalQty;
    document.getElementById('total-amount').innerText = totalAmount.toLocaleString() + 'đ';

    const cartIcon = document.querySelector('.cart-count');
    if (cartIcon) cartIcon.innerText = totalQty;
}

document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const change = btn.innerText === '+' ? 1 : -1;
        changeQuantity(btn, change);
    });
});

// Khởi tạo khi load trang
updateCartSummary();
