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

    // nút bộ lọc 
    document.querySelectorAll(".fa-list").forEach(icon => {
        const userCard = document.querySelector(".user-card");
        const hiddenTexts = document.querySelectorAll(".hidden-text");
        const userPage = document.querySelector(".user-page");

        icon.addEventListener("click", () => {
            userCard.classList.toggle("close");
            userPage.classList.toggle("close");

            hiddenTexts.forEach(text => {
                text.classList.toggle("close");
            });
        });
    });
});
    