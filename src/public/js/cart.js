document.addEventListener('DOMContentLoaded', () => {
    const selectAllCheckbox = document.getElementById('select-all');

    function getRowCheckboxes() {
        return document.querySelectorAll('.row-checkbox');
    }

    function updateCartSummary() {
        const rows = document.querySelectorAll('.shopping-product');
        let totalQty = 0, totalAmount = 0;

        rows.forEach(row => {
            const checkbox = row.querySelector('.row-checkbox');
            if (!checkbox.checked) return; // chỉ tính hàng checked
            const qty = Number(row.querySelector('.quantity-input').value);
            const price = Number(row.querySelector('.discount-price').dataset.price);
            totalQty += qty;
            totalAmount += qty * price;
        });

        document.getElementById('total-quantity').innerText = totalQty;
        document.getElementById('total-amount').innerText = totalAmount.toLocaleString() + 'đ';

        updateCartIcon()
    }
    function updateCartIcon() {
        const cartIcon = document.querySelector('.cart-count');
        if (cartIcon) {
            const rows = document.querySelectorAll('.shopping-product').length || cart.length || 0;
            cartIcon.innerText = rows >= 100 ? '99+' : rows;
        }
    }


    // Gắn sự kiện checkbox row
    function initRowCheckboxes() {
        const rowCheckboxes = getRowCheckboxes();
        rowCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const allChecked = [...getRowCheckboxes()].every(r => r.checked);
                if (selectAllCheckbox) selectAllCheckbox.checked = allChecked;
                updateCartSummary();
            });
        });
    }

    // Check mặc định row đầu tiên
    const firstRowCheckbox = document.querySelector('.row-checkbox');
    if (firstRowCheckbox) firstRowCheckbox.checked = true;

    // Select all checkbox
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', () => {
            const checked = selectAllCheckbox.checked;
            getRowCheckboxes().forEach(cb => cb.checked = checked);
            updateCartSummary();
        });
    }

    initRowCheckboxes();

    // Tăng giảm số lượng
    document.querySelectorAll('.cart-quantity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const change = btn.innerText === '+' ? 1 : -1;
            const qtyInput = btn.closest('.quantity-controls').querySelector('.quantity-input');
            let newQty = Math.max(1, Number(qtyInput.value) + change);
            qtyInput.value = newQty;

            // Cập nhật tổng tiền row
            const row = btn.closest('.shopping-product');
            const price = Number(row.querySelector('.discount-price').dataset.price);
            row.querySelectorAll('.discount-price')[1].innerText =
                (price * newQty).toLocaleString() + 'đ';

            // Update DB
            const productId = row.querySelector('.remove-item').dataset.id;
            const size = row.querySelector('.remove-item').dataset.size;
            fetch('/cart/update', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, size, quantity: newQty })
            });

            updateCartSummary();
        });
    });

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
                })
                .catch(err => console.log('Lỗi xóa sản phẩm:', err));
        });
    });

    updateCartSummary();
    updateCartIcon();

});
document.addEventListener('DOMContentLoaded', () => {
    const buyNowBtn = document.querySelector('.cart-footer .btn-buy');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            window.location.href = '/shopping';
        });
    }
});
