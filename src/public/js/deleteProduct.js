function initDeleteMultiple() {
    const deleteBtn = document.getElementById('delete-selected-btn');
    if (!deleteBtn) return;

    deleteBtn.addEventListener('click', async () => {
        const checkboxes = document.querySelectorAll('.check-item:checked');
        const ids = Array.from(checkboxes).map(cb => Number(cb.value)).filter(Boolean);

        if (ids.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm!');
            return;
        }

        if (!confirm(`Bạn có chắc muốn xóa ${ids.length} sản phẩm đã chọn?`)) {
            return;
        }

        try {
            const res = await fetch('/api/products/delete-multiple', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids })
            });

            const data = await res.json();

            if (data.success) {
                // Xóa các row đã xóa thành công
                ids.forEach(id => {
                    const row = document.querySelector(`.product-row[data-id="${id}"]`);
                    if (row && (!data.blockedIds || !data.blockedIds.includes(id))) {
                        row.remove();
                    }
                });

                // Thông báo đẹp hơn
                if (data.partial) {
                    alert(data.message); // có cả thành công + cảnh báo
                } else {
                    alert(data.message);
                }
            } else {
                alert(data.message || 'Có lỗi xảy ra khi xóa!');
            }

            // Cập nhật lại nút xóa và checkbox
            document.getElementById('check-all').checked = false;
            toggleDeleteBtn();

        } catch (err) {
            console.error('DELETE MULTIPLE ERROR:', err);
            alert('Lỗi kết nối khi xóa sản phẩm!');
        }
    });
}

// Giữ nguyên hàm initCheckAll và toggleDeleteBtn như cũ
function toggleDeleteBtn() {
    const anyChecked = document.querySelectorAll('.check-item:checked').length > 0;
    const deleteBtn = document.getElementById('delete-selected-btn');
    if (deleteBtn) deleteBtn.style.display = anyChecked ? 'inline-block' : 'none';
}