document.addEventListener('DOMContentLoaded', () => {

    /* ================= SEARCH ================= */
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', () => {
            const keyword = searchBox.value.toLowerCase();
            document.querySelectorAll('tbody tr').forEach(row => {
                row.style.display = row.innerText.toLowerCase().includes(keyword)
                    ? ''
                    : 'none';
            });
        });
    }

    /* ================= ADD FORM ================= */
    const openBtn = document.querySelector('.open-add-form');
    const addFormContainer = document.querySelector('.add-category-container');
    const cancelBtns = document.querySelectorAll('.cancel-product-btn');

    if (openBtn && addFormContainer) {
        openBtn.addEventListener('click', () => {
            addFormContainer.classList.add('active');
        });

        cancelBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                addFormContainer.classList.remove('active');
            });
        });
    }

    /* ================= CHECKBOX ================= */
    const checkAll = document.getElementById('check-all');
    const deleteSelectedBtn = document.getElementById('delete-selected-btn');

    // Check all
    if (checkAll) {
        checkAll.addEventListener('change', function () {
            document
                .querySelectorAll('.check-item, .check-group')
                .forEach(cb => cb.checked = this.checked);
            toggleDeleteBtn();
        });
    }

    // Check group
    document.querySelectorAll('.check-group').forEach(groupCb => {
        groupCb.addEventListener('change', function () {
            const group = this.dataset.group;
            document
                .querySelectorAll('.check-item.' + group)
                .forEach(cb => cb.checked = this.checked);

            syncCheckAll();
            toggleDeleteBtn();
        });
    });

    // Check item
    document.querySelectorAll('.check-item').forEach(itemCb => {
        itemCb.addEventListener('change', function () {
            syncGroup(this);
            syncCheckAll();
            toggleDeleteBtn();
        });
    });

    function syncGroup(item) {
        ['male', 'female'].forEach(group => {
            if (item.classList.contains(group)) {
                const all = document.querySelectorAll('.check-item.' + group);
                const checked = document.querySelectorAll('.check-item.' + group + ':checked');
                const groupCb = document.querySelector(`.check-group[data-group="${group}"]`);
                if (groupCb) groupCb.checked = all.length === checked.length;
            }
        });
    }

    function syncCheckAll() {
        const all = document.querySelectorAll('.check-item').length;
        const checked = document.querySelectorAll('.check-item:checked').length;
        if (checkAll) checkAll.checked = all > 0 && all === checked;
    }

    /* ================= DELETE SELECTED ================= */
    function toggleDeleteBtn() {
        if (!deleteSelectedBtn) return;
        const checked = document.querySelectorAll('.check-item:checked').length;
        deleteSelectedBtn.style.display = checked > 0 ? 'inline-block' : 'none';
    }

    toggleDeleteBtn();

    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener('click', async () => {
            const checkedItems = document.querySelectorAll('.check-item:checked');

            if (checkedItems.length === 0) {
                alert('Vui lòng chọn ít nhất một danh mục để xóa');
                return;
            }

            if (!confirm(`Bạn có chắc muốn xóa ${checkedItems.length} danh mục?`)) return;

            const ids = Array.from(checkedItems).map(cb => cb.value);

            try {
                const res = await fetch('/admin/catalog-management/delete-multiple', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ids })
                });

                const data = await res.json();
                if (data.success) {
                    location.reload();
                } else {
                    alert('Xóa thất bại');
                }
            } catch (err) {
                console.error(err);
                alert('Có lỗi xảy ra');
            }
        });
    }

    /* ================= EDIT MODAL ================= */
    const editModal = document.getElementById('editCategoryModal');
    const editForm = document.getElementById('editCategoryForm');
    const editNameInput = document.getElementById('editName');

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name;

            if (!id || !editModal) return;

            editNameInput.value = name;
            editForm.action = `/admin/catalog-management/update/${id}`;
            editModal.classList.remove('hidden');
            editModal.classList.add('active');
        });
    });

    document
        .querySelectorAll('#closeEditModal, #closeEditModalX')
        .forEach(btn => {
            btn.addEventListener('click', () => {
                editModal.classList.add('hidden');
                editModal.classList.remove('active');
            });
        });

});
