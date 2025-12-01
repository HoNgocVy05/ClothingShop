// hiện toàn bộ sản phẩm trong đơn hàng
function showAllOrder() {
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
// sao chép mã đơn hàng
function copyOrderCode() {
    document.addEventListener("click", e => {
        const btn = e.target.closest(".fa-copy");
        const copyNotice = document.getElementById("copy-notice");
        if (!btn) return;

        const code = btn.parentElement.textContent.trim();
        navigator.clipboard.writeText(code);

        // Hiện thông báo
        copyNotice.style.display = "block";
        btn.classList.add("clicked");

        // Ẩn thông báo sau 1 giây
        setTimeout(() => {
            copyNotice.style.display = "none";
            btn.classList.remove("clicked");
        }, 1000);
    });
}
