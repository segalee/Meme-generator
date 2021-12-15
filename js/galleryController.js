'use strict';

function initGallery() {
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
    var elGallery = document.querySelector('.gallery');
    var strHTML = '';
    // [].foreach((val, i) => {
    //     strHTML += ` <img class="img img-${i}" src="img/${i}.jpg" alt="" onclick="renderMeme(${i})" />`;
    // });
    for (let i = 1; i < 19; i++) {
        strHTML += ` <img class="img img-${i}" src="img/${i}.jpg" alt="" onclick="renderMeme(${i})" />`;
    }
    elGallery.innerHTML = strHTML;
    console.log('gCurrImg:', gCurrImg);
}