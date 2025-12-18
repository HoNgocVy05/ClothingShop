document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    document.querySelectorAll('.sidebarItem').forEach(item => {
        const href = item.getAttribute('href');
        if (!href) return;

        if (
            currentPath === href ||
            currentPath.startsWith(href + '/')
        ) {
            item.classList.add('active');
        }
    });
});
