document.addEventListener("DOMContentLoaded", () => {
  addProductBox();
  initImageHandler();
  handleDeleteButtons();
  handleFormSubmit();
});

// mở modal thêm sản phẩm
function addProductBox() {
  const box = document.querySelector('.add-product-container');
  const content = document.querySelector('.sidebar-content');

  const openBtn = content.querySelector('.add-product-btn');
  const cancelBtns = content.querySelectorAll('.cancel-product-btn');

  if (!openBtn || cancelBtns.length === 0 || !box) return;

  openBtn.addEventListener('click', () => {
    resetForm();
    box.classList.add('active');
  });

  cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      box.classList.remove('active');
    });
  });
}

// reset form khi thêm mới
function resetForm() {
  const form = document.getElementById('product-form');
  const previewBox = document.getElementById('preview');
  const fileInput = document.getElementById('product-image');
  
  form.reset();
  previewBox.innerHTML = '';
  fileInput.value = '';
  
  document.getElementById('form-title').textContent = 'Thêm sản phẩm mới';
  document.getElementById('product-id').value = '';
  document.getElementById('old-images').value = '';
  
  // Reset selectedImages
  selectedImages = [];
}

// xử lý nút sửa
document.addEventListener('click', (e) => {
  if (e.target.closest('.edit-btn')) {
    const row = e.target.closest('.product-row');
    if (!row) return;
    
    const productData = {
      id: row.dataset.id,
      name: row.dataset.name,
      category_id: row.dataset.category,
      stock_s: row.dataset.s,
      stock_m: row.dataset.m,
      stock_l: row.dataset.l,
      stock_xl: row.dataset.xl,
      price: row.dataset.price,
      description: row.dataset.description,
      images: JSON.parse(row.dataset.images)
    };
    
    loadProductToForm(productData);
  }
});

// load dữ liệu sản phẩm vào form
function loadProductToForm(product) {
  const form = document.getElementById('product-form');
  const box = document.querySelector('.add-product-container');
  const previewBox = document.getElementById('preview');
  
  // Điền thông tin vào form
  document.getElementById('product-id').value = product.id;
  document.getElementById('product-name').value = product.name;
  document.getElementById('category').value = product.category_id;
  document.getElementById('size-s').value = product.stock_s;
  document.getElementById('size-m').value = product.stock_m;
  document.getElementById('size-l').value = product.stock_l;
  document.getElementById('size-xl').value = product.stock_xl;
  document.getElementById('price').value = product.price;
  document.getElementById('description').value = product.description || '';
  
  // Đặt lại đường dẫn form update
  form.action = `/api/products/update/${product.id}`;
  document.getElementById('form-title').textContent = 'Sửa sản phẩm';
  
  // Lưu ảnh cũ
  document.getElementById('old-images').value = JSON.stringify(product.images);
  
  // Hiển thị ảnh cũ
  selectedImages = [];
  previewBox.innerHTML = '';
  
  if (product.images && product.images.length > 0) {
    product.images.forEach((img) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('img-wrapper');
      wrapper.dataset.imgName = img; // lưu tên ảnh để xóa sau
      
      const previewImg = document.createElement('img');
      previewImg.src = '/uploads/products/' + img;
      
      const delBtn = document.createElement('button');
      delBtn.innerText = '×';
      delBtn.classList.add('del-img-btn');
      delBtn.type = 'button';
      delBtn.addEventListener('click', () => {
        // Cập nhật old_images khi xóa ảnh cũ
        const oldImagesStr = document.getElementById('old-images').value;
        const oldImages = oldImagesStr ? JSON.parse(oldImagesStr) : [];
        const index = oldImages.indexOf(img);
        if (index > -1) {
          oldImages.splice(index, 1);
          document.getElementById('old-images').value = JSON.stringify(oldImages);
        }
        wrapper.remove();
      });
      
      wrapper.appendChild(previewImg);
      wrapper.appendChild(delBtn);
      previewBox.appendChild(wrapper);
    });
  }
  
  // Mở modal
  box.classList.add('active');
}

// xử lý xóa sản phẩm
function handleDeleteButtons() {
  document.addEventListener('submit', (e) => {
    if (e.target.closest('form[action*="/api/products/delete"]')) {
      if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        e.preventDefault();
      }
    }
  });
}

// xử lý submit form thêm/sửa
function handleFormSubmit() {
  const form = document.getElementById('product-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Thêm dữ liệu cơ bản
    formData.append('name', document.getElementById('product-name').value);
    formData.append('category_id', document.getElementById('category').value);
    formData.append('stock_s', document.getElementById('size-s').value);
    formData.append('stock_m', document.getElementById('size-m').value);
    formData.append('stock_l', document.getElementById('size-l').value);
    formData.append('stock_xl', document.getElementById('size-xl').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('description', document.getElementById('description').value);
    
    // Lấy ảnh cũ từ form (nếu có)
    const oldImagesValue = document.getElementById('old-images').value;
    if (oldImagesValue) {
      formData.append('old_images', oldImagesValue);
    }
    
    // Thêm ảnh mới từ selectedImages
    if (typeof selectedImages !== 'undefined' && selectedImages.length > 0) {
      selectedImages.forEach((imgObj) => {
        formData.append('images', imgObj.file);
      });
    }
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // Redirect về trang quản lý sản phẩm
        window.location.href = '/admin/product-management';
      } else {
        alert('Có lỗi xảy ra khi lưu sản phẩm!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Lỗi khi gửi form!');
    }
  });
}

let selectedImages = []; // biến global để lưu ảnh được chọn

// review ảnh khi thêm sản phẩm
function initImageHandler() {
  const input = document.getElementById("product-image");
  const previewBox = document.getElementById("preview");

  if (!input || !previewBox) return;

  input.addEventListener("change", async (e) => {
    const files = [...e.target.files];

    //tối đa 4 ảnh
    if (selectedImages.length + files.length > 4) {
      alert("Chỉ được chọn tối đa 4 ảnh!");
      return;
    }

    for (const file of files) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      // cắt ảnh vuông    
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        canvas.getContext("2d").drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size,
          size,
          0,
          0,
          size,
          size
        );

        const squareUrl = canvas.toDataURL("image/jpeg");
        selectedImages.push({ file: file, url: squareUrl });

        renderPreview(); // render tất cả ảnh
      };
    }

    input.value = ""; // reset input
  });

  function renderPreview() {
    previewBox.innerHTML = "";

    selectedImages.forEach((imgObj, index) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("img-wrapper");

      const previewImg = document.createElement("img");
      previewImg.src = imgObj.url;

      const delBtn = document.createElement("button");
      delBtn.innerText = "×";
      delBtn.classList.add("del-img-btn");
      delBtn.type = 'button';
      delBtn.addEventListener("click", () => {
        selectedImages.splice(index, 1);
        renderPreview();
      });

      wrapper.appendChild(previewImg);
      wrapper.appendChild(delBtn);
      previewBox.appendChild(wrapper);
    });
  }
}
