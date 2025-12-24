function initDeleteMultiple() {
    const deleteBtn = document.getElementById('delete-selected-btn');
    if (!deleteBtn) {
        console.error('Không tìm thấy nút delete-selected-btn');
        return;
    }

    deleteBtn.addEventListener('click', async (e) => {
        console.log('Bắt đầu xóa nhiều sản phẩm');
        e.preventDefault();
        e.stopPropagation();
        
        const checkboxes = document.querySelectorAll('.check-item:checked');
        const ids = Array.from(checkboxes).map(cb => Number(cb.value)).filter(id => !isNaN(id));


        if (ids.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm!');
            return;
        }

        if (!confirm(`Bạn có chắc muốn xóa ${ids.length} sản phẩm đã chọn?`)) {
            return;
        }

        try {
            const res = await fetch('/products/delete-multiple', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ ids })
            });

            console.log('Response status:', res.status);
            const data = await res.json();
            console.log('Response data:', data);

            if (data.success) {
                // Xóa các row đã xóa thành công
                ids.forEach(id => {
                    const row = document.querySelector(`.product-row[data-id="${id}"]`);
                    if (row && (!data.blockedIds || !data.blockedIds.includes(id))) {
                        row.remove();
                        console.log('Đã xóa row ID:', id);
                    }
                });

                // Thông báo
                if (data.partial) {
                    alert(data.message);
                } else {
                    alert(data.message);
                    // KHÔNG reload trang
                }
                
                // Cập nhật UI
                document.getElementById('check-all').checked = false;
                toggleDeleteBtn();
                
            } else {
                alert(data.message || 'Có lỗi xảy ra khi xóa!');
            }

        } catch (err) {
            console.error('DELETE MULTIPLE ERROR:', err);
            alert('Lỗi kết nối khi xóa sản phẩm!');
        }
    });
}

function toggleDeleteBtn() {
    const anyChecked = document.querySelectorAll('.check-item:checked').length > 0;
    const deleteBtn = document.getElementById('delete-selected-btn');
    if (deleteBtn) {    
        deleteBtn.style.display = anyChecked ? 'inline-block' : 'none';
        console.log('Toggle delete button:', anyChecked ? 'show' : 'hide');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing delete multiple');
    initDeleteMultiple();
    
    // Gán sự kiện cho checkbox để toggle nút xóa
    document.querySelectorAll('.check-item, #check-all').forEach(checkbox => {
        checkbox.addEventListener('change', toggleDeleteBtn);
    });
});