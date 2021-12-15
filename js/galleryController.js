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
}

function renderGallery() {
    var imgs = getImgs();
    console.log('imgs:', imgs);

    var elGallery = document.querySelector('.gallery');
    var strHTML = '';
    imgs.forEach((img, i) => {
        strHTML += ` <img class="img img-${i + 1}" src="img/${
      i + 1
    }.jpg" alt="" onclick="onImgSelect(${i + 1})" />`;
    });

    //     strHTML += ` <img class="img img-${i}" src="img/${i}.jpg" alt="" onclick="onImgSelect(${i})" />`;

    elGallery.innerHTML = strHTML;
}

function onImgSelect(imgId) {
    console.log('imgId:', imgId);
    setImg(imgId);
    renderMeme(imgId);
    // return imgId;
}