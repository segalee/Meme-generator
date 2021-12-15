'use strict';
var gElCanvas;
var gCtx;
var gCurrImg;

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
}

function onSubmitForm(ev) {
    ev.preventDefault();
}

function onValueChange(elInput) {
    setLineTxt(elInput);
    renderMeme(gCurrImg);
}

function renderMeme(i) {
    gCurrImg = i;
    console.log('gCurrImg:', gCurrImg);
    const elEditor = document.querySelector('.editor');
    elEditor.classList.remove('hidden');
    const elGallery = document.querySelector('.gallery');
    elGallery.classList.add('hidden');
    const meme = getMeme();
    // const memeImg = meme.selectedImgId;
    const elImg = elGallery.querySelector(`.img-${gCurrImg}`);
    const selectedLineIdx = meme.selectedLineIdx;
    const line = meme.lines[selectedLineIdx];
    const txt = line.txt;
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    //upper meme txt
    drawTxt(txt, gElCanvas.width / 2, 50);
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