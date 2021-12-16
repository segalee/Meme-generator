'use strict';

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgLng = 18;
var gCurrLineIdx;
var gCurrLineId = 0;
var gYAxis = 70;
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] }];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
        id: gCurrLineId,
        txt: '',
        size: 50,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        yAxis: gYAxis,
        fontFamily: 'impact',
    }, ],
};

function createImgs() {
    gImgs.push(
        createImg(2, 'img/2.jpg', ['dog', 'cute']),
        createImg(3, 'img/3.jpg', ['dog', 'cute', 'baby']),
        createImg(4, 'img/4.jpg', ['cat', 'cute', 'baby']),
        createImg(5, 'img/5.jpg', ['success', 'cute', 'baby']),
        createImg(6, 'img/6.jpg', ['funny']),
        createImg(7, 'img/7.jpg', ['funny', 'cute', 'baby']),
        createImg(8, 'img/8.jpg', ['funny']),
        createImg(9, 'img/9.jpg', ['funny', 'cute', 'baby']),
        createImg(10, 'img/10.jpg', ['funny', 'politics']),
        createImg(11, 'img/11.jpg', ['funny']),
        createImg(12, 'img/12.jpg', ['funny']),
        createImg(13, 'img/13.jpg', ['funny', 'success']),
        createImg(14, 'img/14.jpg', ['funny']),
        createImg(15, 'img/15.jpg', ['funny']),
        createImg(16, 'img/16.jpg', ['funny']),
        createImg(17, 'img/17.jpg', ['funny', 'politics']),
        createImg(18, 'img/18.jpg', ['funny'])
    );
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function createImg(id, url, keywords) {
    var img = { id, url, keywords };
    return img;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function setLineTxt(input) {
    gMeme.lines[gCurrLineId].txt = input;
    // console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx);
}

function setColor(input) {
    const color = input.value;
    const fillOrStroke = input.name;
    const currLine = gMeme.lines[gCurrLineId];
    currLine[fillOrStroke] = color;
}

function setFontSizeLarger() {
    const currLine = gMeme.lines[gCurrLineId];
    console.log('currLine:', currLine);

    currLine.size += 10;
}

function setFontSizeSmaller() {
    const currLine = gMeme.lines[gCurrLineId];
    currLine.size -= 10;
}

function setTxtUp() {
    const currLine = gMeme.lines[gCurrLineId];
    currLine.yAxis -= 10;
    return currLine.yAxis;
}

function setTxtDown() {
    const currLine = gMeme.lines[gCurrLineId];
    currLine.yAxis += 10;
    return currLine.yAxis;
}

function setNewLine() {
    gCurrLineId++;
    gMeme.selectedLineIdx++;
    const line = {
        id: gCurrLineId,
        txt: '',
        size: 50,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        fontFamily: 'impact',
    };
    if (gMeme.selectedLineIdx !== 1) {
        gMeme.lines.push({
            ...line,
            // id: gCurrLineId,
            yAxis: getCanvasHeight() / 2,
        });
    } else {
        gMeme.lines.push({
            ...line,
            // id: gCurrLineId,
            yAxis: getCanvasHeight() - 30,
        });
    }
}

function deleteLine() {
    const currIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(currIdx, 1);
    // console.log('gMeme:', gMeme);
}

function alignLeft() {
    console.log('align left');
}

function alignCenter() {
    console.log('align center');
}

function alignRight() {
    console.log('align right');
}

// function getCurrLineIdx() {
//     gCurrLineIdx = gMeme.selectedLineIdx;
//     return gCurrLineIdx;
// }

// function getCurrLineId() {
//     return gCurrLineId;
// }