'use strict';
var gElCanvas;
var gCtx;

function init() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log('hello');
    // renderMeme(`../memeImgs (square)/1.png`);
    renderMeme();
}

function renderMeme() {
    const meme = getMeme();
    console.log('meme:', meme);
    const memeImg = meme.selectedImgId;
    console.log('memeImg:', memeImg);
    const elGallery = document.querySelector('.gallery');
    const elImg = elGallery.querySelector(`.img-${memeImg}`);
    const selectedLineIdx = meme.selectedLineIdx;
    console.log(selectedLineIdx);
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

// BETTER USE OF IMG DRAW TO CANVAS
// function renderMeme(num) {
//     var img = new Image();
//     img.src = `/meme-imgs (square)/${num}.jpg`;
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
//     };
//     drawTxt('HELLO WORD !', gElCanvas.width / 2, gElCanvas.height / 2);
// }