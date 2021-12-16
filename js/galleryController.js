'use strict';

function initGallery() {
    createImgs();
    renderGallery();
    initCanvas();
}

function presentGallery() {
    var elGallery = document.querySelector('.gallery');
    var elEditor = document.querySelector('.editor');
    elGallery.classList.remove('hidden');
    elEditor.classList.add('hidden');
    // hideCanvas();
}

function renderGallery() {
    var imgs = getImgs();
    var elGallery = document.querySelector('.gallery');
    var strHTML = '';
    imgs.forEach((img, i) => {
        strHTML += ` <img class="pointer img img-${i + 1}" src="img/${
      i + 1
    }.jpg" alt="" onclick="onImgSelect(${i + 1})" />`;
    });
    elGallery.innerHTML = strHTML;
}

function onImgSelect(imgId) {
    setImg(imgId);
    renderMeme();
}