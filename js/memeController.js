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

function getCanvasHeight() {
    return gElCanvas.height;
}

function renderMeme() {
    displayCanvas();
    const meme = getMeme();
    var memeLines = meme.lines;
    memeLines.forEach((line) => {
        drawTxt(line);
    });
}

function displayCanvas() {
    const meme = getMeme();
    var currImgId = meme.selectedImgId;
    const elEditor = document.querySelector('.editor');
    elEditor.classList.remove('hidden');
    const elGallery = document.querySelector('.gallery');
    elGallery.classList.add('hidden');
    const elImg = elGallery.querySelector(`.img-${currImgId}`);
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onChangeLineTxt(elInput) {
    var txt = elInput.value;
    setLineTxt(txt);
    renderMeme();
}

function drawTxt(line) {
    const meme = getMeme();
    console.log(line);
    if (!line) return;
    const { txt, fill, stroke, size, align, yAxis, fontFamily } = line;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = fill;
    gCtx.font = `${size}px ${fontFamily}`;
    gCtx.textAlign = align;
    gCtx.fillText(txt, gElCanvas.width / 2, yAxis);
    gCtx.strokeText(txt, gElCanvas.width / 2, yAxis);
}

function onColorChange(elInput) {
    // console.log('elInput.name:', elInput.name);
    setColor(elInput);
    renderMeme();
}

function onIncreaseTxt() {
    setFontSizeLarger();
    renderMeme();
}

function onDecreaseTxt() {
    setFontSizeSmaller();
    renderMeme();
}

function onPositionTxtUp() {
    setTxtUp();
    renderMeme();
}

function onPositionTxtDown() {
    setTxtDown();
    renderMeme();
}

function onSwitchBeteenLines() {
    console.log('switch');
    // setFontSizeSmaller();
    // renderMeme();
}

function onAddNewLine() {
    console.log('new line added');
    document.querySelector(`[name=txt]`).value = '';
    setNewLine();
    renderMeme();
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