'use strict';
var gElCanvas;
var gCtx;

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
}

function onSubmitForm(ev) {
    ev.preventDefault();
}

function renderMeme() {
    const meme = getMeme();
    var currImgId = meme.selectedImgId;
    console.log('currImgId:', currImgId);
    const elEditor = document.querySelector('.editor');
    const elGallery = document.querySelector('.gallery');
    elEditor.classList.remove('hidden');
    elGallery.classList.add('hidden');
    const elImg = elGallery.querySelector(`.img-${currImgId}`);
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    var currLineIdx = getCurrLineIdx();
    var txt = meme.lines[currLineIdx].txt;
    console.log('txt:', txt);
    drawTxt(txt, gElCanvas.width / 2, 50);
}

function onChangeLineTxt(elInput) {
    console.log('txt:', txt);
    var txt = elInput.value;
    // drawTxt(txt, gElCanvas.width / 2, 50);
    setLineTxt(txt);
    renderMeme();
    // renderMeme(currImg);
    // //lower meme txt
    // drawTxt(txt, gElCanvas.width / 2, gElCanvas.height - 50);
    // // center meme txt
    // drawTxt(txt, gElCanvas.width / 2, gElCanvas.height / 2);
}

function drawTxt(txt, x, y) {
    const meme = getMeme();
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    const fontSize = meme.lines[0].size;
    gCtx.font = `${fontSize}px impact`;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function resizeCanvas() {}

// BETTER USE OF IMG DRAW TO CANVAS
// function renderMeme(num) {
//     var img = new Image();
//     img.src = `/meme-imgs (square)/${num}.jpg`;
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
//     };
//     drawTxt('HELLO WORD !', gElCanvas.width / 2, gElCanvas.height / 2);
// }