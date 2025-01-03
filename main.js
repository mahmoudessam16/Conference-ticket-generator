// Select the file input element
const fileInput = document.getElementById('avatar');
const previewImage = document.getElementById('upload');
const warning = document.querySelector(".warning");

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      // Preview image if it's a valid image file
        if (file.type.startsWith('image/') && file.size / 1024 <= 500) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result; // Set the preview image source
            };
            reader.readAsDataURL(file); // Read the file as a data URL
            warning.innerHTML = "<img src='images/icon-info.svg' alt='info'>Upload your photo (JPG or PNG, max size: 500KB).";
            warning.style.cssText = "color: rgb(135, 132, 164)";
        } else {
            warning.textContent = "File too large. Please upload a photo under 500KB";
            warning.style.cssText = "color: rgb(225, 97, 81)";
        }
    }
});