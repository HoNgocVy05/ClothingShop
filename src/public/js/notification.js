// Hàm hiển thị notification
function showNotification(message, type = 'success', duration = 3000) {
    // Tạo container nếu chưa tồn tại
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }

    // Tạo notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    container.appendChild(notification);

    // Tự động xóa sau duration ms
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 5000);
    }, duration);
}
