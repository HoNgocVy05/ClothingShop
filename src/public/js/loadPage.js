document.addEventListener("DOMContentLoaded", () => {
    const sidebarItems = document.querySelectorAll('.sidebarItem');
    const contentDiv = document.querySelector('.sidebar-content');

    function loadContent(item) {
        if (item.hasAttribute('noContent')) return;

        sidebarItems.forEach(i => i.classList.remove("menu-click"));
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
                    initShowAllOrder();
                })
                .catch(err => {
                    contentDiv.innerHTML = `<p>Lỗi tải trang: ${err.message}</p>`;
                });
        }
    }

    sidebarItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            loadContent(item);
        });
    });

    if (sidebarItems.length > 0) {
        loadContent(sidebarItems[0]);
    }
});
