function initShowAllOrder() {
    document.querySelectorAll(".my-order").forEach(order => {
        const wrapper = order.querySelector(".order-products");
        const btn = order.querySelector(".show-all-btn");

        if (!wrapper) {
            if (btn) btn.style.display = "none";
            return;
        }

        const items = wrapper.querySelectorAll(".order-product");
        if (items.length <= 1) {
            btn.style.display = "none";
            return;
        }

        btn.addEventListener("click", () => {
            wrapper.classList.toggle("show-all");
            btn.textContent = wrapper.classList.contains("show-all")
                ? "Ẩn bớt"
                : "Xem thêm...";
        });
    });
}
