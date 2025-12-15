document.addEventListener('DOMContentLoaded', () => {

    /* ================= SEARCH ================= */
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', () => {
            const keyword = searchBox.value.toLowerCase();
            document.querySelectorAll('tbody tr').forEach(row => {
                row.style.display =
                    row.innerText.toLowerCase().includes(keyword) ? '' : 'none';
            });
        });
    }

    /* ================= ADD FORM ================= */
    const openBtn = document.querySelector('.open-add-form');
    const formContainer = document.querySelector('.add-product-container');
    const cancelBtns = document.querySelectorAll('.cancel-product-btn');

    if (openBtn && formContainer) {
        openBtn.addEventListener('click', () => {
            formContainer.classList.add('active');
        });

        cancelBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                formContainer.classList.remove('active');
            });
        });
    }

    /* ================= CHECKBOX ================= */
    const checkAll = document.getElementById('check-all');

    if (checkAll) {
        checkAll.addEventListener('change', function () {
            document
                .querySelectorAll('.check-item, .check-group')
                .forEach(cb => cb.checked = this.checked);
        });
    }

    document.querySelectorAll('.check-group').forEach(groupCb => {
        groupCb.addEventListener('change', function () {
            const group = this.dataset.group;
            document
                .querySelectorAll('.check-item.' + group)
                .forEach(cb => cb.checked = this.checked);
            syncCheckAll();
        });
    });

    document.querySelectorAll('.check-item').forEach(itemCb => {
        itemCb.addEventListener('change', function () {
            syncGroup(this);
            syncCheckAll();
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
        if (checkAll) checkAll.checked = all === checked;
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
