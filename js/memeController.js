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
    displayCanvas();
    const meme = getMeme();
    var memeLines = getLines();
    var currLineIdx = getCurrLineIdx();
    console.log('currLineIdx:', currLineIdx);
    var txt = meme.lines[currLineIdx].txt;
    console.log('txt:', txt);
    const yAxis = meme.lines[currLineIdx].yAxis;
    memeLines.forEach((line) => {
        if (currLineIdx === 0) drawTxt(txt, gElCanvas.width / 2, yAxis);
        else if (currLineIdx === 1)
            drawTxt(txt, gElCanvas.width / 2, gElCanvas.height - yAxis);
        else {
            drawTxt(txt, gElCanvas.width / 2, gElCanvas.height / 2);
        }
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
    // renderMeme(currImg);
}

function drawTxt(txt, x, y) {
    const meme = getMeme();
    const currLineIdx = getCurrLineIdx();
    // console.log('meme.lines[currLineIdx]:', meme.lines[currLineIdx]);
    const { fill, stroke, size } = meme.lines[currLineIdx];
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.font = `${size}px impact`;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = fill;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

// function onChangeFillColor(elInput) {
//     // console.log('color:', color);
//     // console.log('color.value:', color.value);
//     setFillColor(elInput);
// }

// function onChangeStrokeColor(elInput) {
//     // console.log('color:', color);
//     // console.log('color.value:', color.value);
//     setStrokeColor(elInput);
// }

function onValueChange(elInput) {
    // console.log('elInput.name:', elInput.name);
    setValue(elInput);
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
    // const meme = getMeme();
    setNewLine();
    renderMeme();
    // const currLineIdx =
    // console.log('meme.selectedLineIdx:', meme.selectedLineIdx);

    // gMeme.selectedLineIdx++;
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