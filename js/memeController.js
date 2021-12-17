'use strict';
var gElCanvas;
var gCtx;
var gLineIdx;
var gIsFocus = true;
var gFocusOntxt = true;

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gLineIdx = getCurrLineIdx();
}

// function onSubmitForm(ev) {
//     ev.preventDefault();
// }

function getCanvasHeight() {
    return gElCanvas.height;
}

function renderMeme() {
    displayCanvas();
    const meme = getMeme();
    var memeLines = meme.lines;
    memeLines.forEach((line) => {
        drawTxt(line);
        var selectedLine = meme.lines[meme.selectedLineIdx];
        var txtVal = selectedLine.txt ? selectedLine.txt : '';
        document.querySelector(`[name=txt]`).value = txtVal;
    });
    if (gIsFocus) drawRectAroundTxt();
    else gIsFocus = true;
}

function displayCanvas() {
    const meme = getMeme();
    var currImgId = meme.selectedImgId;
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.remove('hidden');
    const elGallery = document.querySelector('.gallery');
    elGallery.classList.add('hidden');
    const elSearchBar = document.querySelector('.search-area');
    elSearchBar.classList.add('hidden');
    const elAboutSection = document.querySelector('.about');
    elAboutSection.classList.add('hidden');
    const elImg = elGallery.querySelector(`.img-${currImgId}`);
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function hideCanvas() {
    document.querySelector('.meme-editor').classList.add('hidden');
    gElCanvas.classList.add('hidden');
}

function onChangeLineTxt(elInput) {
    var txt = elInput.value;
    setLineTxt(txt);
    renderMeme();
}

function drawTxt(line) {
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
    gFocusOntxt = true;
    switchBeteenLines();
    renderMeme();
}

function onAddNewLine() {
    // console.log('new line added');
    document.querySelector(`[name=txt]`).value = '';
    setNewLine();
    gFocusOntxt = true;
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    renderMeme();
}

function onAlignLeft() {
    alignLeft();
    renderMeme();
}

function onAlignCenter() {
    alignCenter();
    renderMeme();
}

function onAlignRight() {
    alignRight();
    renderMeme();
}

function onChangeFont(font) {
    changeFont(font);
    renderMeme();
}

function onSaveMeme() {
    console.log('save');
    gFocusOntxt = false;
    gIsFocus = false;
    saveMeme();
    const data = gElCanvas.toDataURL();
    saveImg(data);
    //TODO -- ADD REDIRECT TO SAVED MEMES
}

function resizeCanvas() {
    const meme = getMeme();
    var currImgId = meme.selectedImgId;
    const elImg = elGallery.querySelector(`.img-${currImgId}`);
    var ratio = elImg.width / elImg.height;
    gElCanvas.width = 450;
    gElCanvas.height = gElCanvas.width / ratio;
    changeTxtPos(gElCanvas.width, gElCanvas.height);
}

// function drawRectAroundTxt() {
//     const meme = getMeme();
//     if (gFocusOntxt) {
//         if (meme.lines.length === 0) return;
//         const line = meme.lines[meme.selectedLineIdx];
//         const posX = line.positionX;
//         const posY = line.positionY;
//         gCtx.beginPath();
//         gCtx.rect(posX - 160, posY - 40, 320, 50);
//         gCtx.setLineDash([4, 4]);
//         gCtx.strokeStyle = 'black';
//         gCtx.stroke();
//     }
// }
// BETTER USE OF IMG DRAW TO CANVAS
// function renderMeme(num) {
//     var img = new Image();
//     img.src = `/meme-imgs (square)/${num}.jpg`;
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
//     };
//     drawTxt('HELLO WORD !', gElCanvas.width / 2, gElCanvas.height / 2);
// }