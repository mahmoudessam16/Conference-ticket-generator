// Select the file input element
const fileInput = document.getElementById('avatar');
const previewImage = document.getElementById('upload');
const warning = document.querySelector(".warning");
const btns = document.querySelector(".btns");
const paragraph = document.querySelector(".file-input p");
const removeBtn = document.getElementById('remove');
const changeBtn = document.getElementById('change');

// Object that hold user data
let data = {};
let file = null;

// Get the month abbreviation
const today = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = months[today.getMonth()];

// Get the day and year
const day = today.getDate();
const year = today.getFullYear();

// Combine into the desired format
const formattedDate = `${month} ${day}, ${year}`;

fileInput.addEventListener('change', (event) => {
    file = event.target.files[0]; // Get the first selected file
    if (file) {
      // Preview image if it's a valid image file
        if (file.type.startsWith('image/') && file.size / 1024 <= 500) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result; // Set the preview image source
            };
            reader.readAsDataURL(file); // Read the file as a data URL
            paragraph.style.display = 'none';
            btns.style.display = 'block';
            removeBtn.addEventListener('click', function () {
                previewImage.src = 'images/icon-upload.svg';
                paragraph.style.display = 'block';
                btns.style.display = 'none';
            });
            warning.innerHTML = "<img src='images/icon-info.svg' alt='info'>Upload your photo (JPG or PNG, max size: 500KB).";
            warning.style.cssText = "color: rgb(135, 132, 164)";
        } else {
            warning.textContent = "File too large. Please upload a photo under 500KB";
            warning.style.cssText = "color: rgb(225, 97, 81)";
        }
    }
});

document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();
    const allInputs = document.querySelectorAll("div:not(div.file-input) input:not(input[type='submit'])");
    if (file === null) {
        warning.style.cssText = "color: rgb(225, 97, 81)";
        warning.children[0].children[0].style.stroke = 'rgb(245, 114, 97)';
    }
    allInputs.forEach(input => {
        if (input.value.trim() === '') {
            input.nextElementSibling.style.display = 'block';
        } else {
            input.nextElementSibling.style.display = 'none';
            data[`${input.name}`] = input.value;
        }
    });
    if (Object.keys(data).length === allInputs.length && file !== null) {
        const h1 = document.querySelector('h1'); 
        const h2 = document.querySelector('h2');
        const h3 = document.querySelector('h3');
        const p = document.querySelector('section p');
        const imgAva = document.querySelector('.info > img');
        data['pathImage'] = previewImage.src;
        this.remove();
        h1.innerHTML = `Congrats, <span class='gradient'>${data.name}</span>! Your ticket is ready.`
        p.innerHTML = `We've emailed your ticket to <span style='color: rgb(243, 115, 98)'>${data.email}</span> and will send updates in the run up to the event.`;
        h2.innerHTML = data.name;
        h3.innerHTML = `<img src="./images/icon-github.svg" alt="Github">${data.username}`;
        imgAva.src = `${data.pathImage}`;
        document.querySelector("article").style.display = 'block';
        document.querySelector('.date').textContent = formattedDate;
    }
    console.log(data);
});
