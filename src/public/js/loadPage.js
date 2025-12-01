document.addEventListener("DOMContentLoaded", () => {
    const sidebarItems = document.querySelectorAll('.sidebarItem');
    const contentDiv = document.querySelector('.sidebar-content');

    function loadContent(item) {
        if (item.hasAttribute('noContent')) return; //nút đăng xuất

        // trang chi tiết sản phẩm không đánh dấu trên sibebar
        if(!item.hasAttribute('onItem')) {
            sidebarItems.forEach(i => i.classList.remove("menu-click"));
        }
        item.classList.add("menu-click");

        const file = item.getAttribute('content');
        if (file) {
            fetch(file)
                .then(res => {
                    if (!res.ok) throw new Error('Không tải được file');
                    return res.text();
                })
                .then(html => {
                    contentDiv.innerHTML = html;
                    //gọi hàm
                    if (typeof onPageLoaded === "function") onPageLoaded();
                    if (file === '/my-order') {
                        showAllOrder();
                    }
                    if (file === '/my-order-detail') {
                        copyOrderCode();
                    }
                })
                .catch(err => {
                    contentDiv.innerHTML = `<p>Lỗi tải trang: ${err.message}</p>`;
                });
        }
    }

    document.addEventListener('click', e => {
        const item = e.target.closest('.sidebarItem');
        if (!item) return;

        e.preventDefault(); //không load lại trang khi click vào thẻ a
        loadContent(item);
    });

    if (sidebarItems.length > 0) {
        loadContent(sidebarItems[0]);
    }
});
