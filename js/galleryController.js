'use strict';

function initGallery() {
    createImgs();
    renderGallery();
    initCanvas();
}

function presentGallery() {
    var elGallery = document.querySelector('.gallery');
    var elEditor = document.querySelector('.meme-editor');
    elGallery.classList.remove('hidden');
    elEditor.classList.add('hidden');
    const elSearchBar = document.querySelector('.search-area');
    elSearchBar.classList.remove('hidden');
    const elAboutSection = document.querySelector('.about');
    elAboutSection.classList.remove('hidden');
    hideMyGallery();
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

function scrollToAbout() {
    presentGallery();
    document.querySelector('.about').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.link-to-about').getElementsByClassName.cursor =
        'pointer';
}

function presentMyGallery() {
    var elMyGallery = document.querySelector('.mygallery-section');
    elMyGallery.classList.remove('hidden');
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add('hidden');
    var elAbout = document.querySelector('.about');
    elAbout.classList.add('hidden');
    var elSearchBar = document.querySelector('.search-area');
    elSearchBar.classList.add('hidden');
    // hide searcharea hide about
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.add('hidden');
    renderMyGallery();
}

function hideMyGallery() {
    var elMyGallery = document.querySelector('.mygallery-section');
    elMyGallery.classList.add('hidden');
}

function renderMyGallery() {
    var imgs = getMyImgs();
    var elMyGallery = document.querySelector('.mygallery');
    var strHTML = '';
    imgs.forEach((img) => {
        strHTML += ` <img src="${img}" />`;
    });
    elMyGallery.innerHTML = strHTML;
}

function onFilterByKeyWord(elVal) {
    if (!elVal) {
        renderGallery();
    } else {
        renderFilteredGallery(elVal);
    }
}

function renderFilteredGallery(elVal) {
    const filteredImgs = filterByKeyWord(elVal);
    var elGallery = document.querySelector('.gallery');
    var strHTML = '';
    filteredImgs.forEach((img) => {
        strHTML += ` <img class="pointer img img-${img.id}" src="img/${img.id}.jpg" alt="" onclick="onImgSelect(${img.id})" />`;
    });
    elGallery.innerHTML = strHTML;
}