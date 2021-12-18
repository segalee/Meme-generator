'use strict';
var gElCanvas;
var gCtx;
var gLineIdx;
var gIsFocusOnTxt = false;

function initCanvas() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gLineIdx = getCurrLineIdx();
    // resizeCanvas();
}

function getCanvasHeight() {
    return gElCanvas.height;
}

function getCanvas() {
    return gElCanvas;
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
    if (gIsFocusOnTxt) drawRectAroundTxt();
    else gIsFocusOnTxt = false;
    // else gIsFocusOnTxt = false;
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
    gIsFocusOnTxt = true;
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
    gIsFocusOnTxt = true;
    switchBeteenLines();
    renderMeme();
}

function onAddNewLine() {
    gIsFocusOnTxt = true;
    document.querySelector(`[name=txt]`).value = '';
    setNewLine();
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
    gIsFocusOnTxt = false;
    saveMeme();
    const data = gElCanvas.toDataURL();
    saveImg(data);
}

function onShareMeme() {
    gIsFocusOnTxt = false;
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg');
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
        );
    }
    doShareMeme(imgDataUrl, onSuccess);
}

function onDownloadMeme(elLink) {
    gHideFocus = true;
    downloadMeme(elLink);
}

function drawRectAroundTxt() {
    if (gIsFocusOnTxt) {
        const meme = getMeme();
        if (meme.lines.length === 0) return;
        const line = meme.lines[meme.selectedLineIdx];
        const x = line.xAxis;
        const y = line.yAxis;
        gCtx.beginPath();
        gCtx.rect(x - 225, y - 43, 400, 49);
        gCtx.strokeStyle = 'orange';
        gCtx.stroke();
        gCtx.closePath();
    }
}

// function onUploadMeme() {

//     // console.log('upload');
//     // loadImageFromInput(ev, renderMeme);
// }

// function resizeCanvas() {
//     const meme = getMeme();
//     var currImgId = meme.selectedImgId;
//     const elGallery = document.querySelector('.gallery');
//     const elImg = elGallery.querySelector(`.img-${currImgId}`);
//     var ratio = elImg.width / elImg.height;
//     gElCanvas.width = 450;
//     gElCanvas.height = gElCanvas.width / ratio;
//     changeTxtPos(gElCanvas.width, gElCanvas.height);
// }