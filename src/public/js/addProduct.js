document.addEventListener("DOMContentLoaded", () => {
  addProductBox();
  initImageHandler();
});

// mở modal thêm sản phẩm
function addProductBox() {
  const box = document.querySelector('.add-product-container');
  const content = document.querySelector('.sidebar-content');

  const openBtn = content.querySelector('.add-product-btn');
  const cancelBtns = content.querySelectorAll('.cancel-product-btn');

  if (!openBtn || cancelBtns.length === 0 || !box) return;

  openBtn.addEventListener('click', () => {
    box.classList.add('active');
  });

  cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      box.classList.remove('active');
    });
  });
}

// review ảnh khi thêm sản phẩm
function initImageHandler() {
  const input = document.getElementById("product-image");
  const previewBox = document.getElementById("preview");

  if (!input || !previewBox) return;

  let selectedImages = []; // lưu tất cả ảnh đã chọn

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
