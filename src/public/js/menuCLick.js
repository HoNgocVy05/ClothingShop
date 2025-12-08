const currentPath = window.location.pathname;

document.querySelectorAll(".sidebarItem").forEach(item => {
    const href = item.getAttribute("href");
    if (href && currentPath.startsWith(href)) {
        item.classList.add("active");
    }
});