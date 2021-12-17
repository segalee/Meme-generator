'use strict';

const MEMES_DB_KEY = 'MEMES';
const IMGS_DB_KEY = 'IMGS';
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgLng = 18;
var gCurrLine;
var gCurrLineId = 0;
var gYAxis = 50;
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] }];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 50,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        yAxis: gYAxis,
        xAxis: 250,
        fontFamily: 'impact',
    }, ],
};
var gMemes = loadFromStorage(MEMES_DB_KEY) ? loadFromStorage(MEMES_DB_KEY) : [];
var gSavedImgs = loadFromStorage(IMGS_DB_KEY) ?
    loadFromStorage(IMGS_DB_KEY) :
    [];

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
    if (gMeme.lines.length === 0) {
        setNewLine(false);
    }
    gMeme.lines[gMeme.selectedLineIdx].txt = input;
    // console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx);
}

function setColor(input) {
    const color = input.value;
    const fillOrStroke = input.name;
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine[fillOrStroke] = color;
}

function setFontSizeLarger() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    // console.log('currLine:', currLine);

    currLine.size += 10;
}

function setFontSizeSmaller() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.size -= 10;
}

function setTxtUp() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.yAxis -= 10;
    return currLine.yAxis;
}

function setTxtDown() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.yAxis += 10;
    return currLine.yAxis;
}

function setNewLine(addLineIndx = true) {
    if (addLineIndx) gMeme.selectedLineIdx++;
    const line = {
        txt: '',
        size: 50,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        xAxis: 250,
        fontFamily: 'impact',
    };
    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines.push({
            ...line,
            yAxis: 50,
        });
    } else if (gMeme.selectedLineIdx !== 1) {
        gMeme.lines.push({
            ...line,
            yAxis: getCanvasHeight() / 2,
        });
    } else {
        gMeme.lines.push({
            ...line,
            yAxis: getCanvasHeight() - gYAxis,
        });
    }
}

function switchBeteenLines() {
    // console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx);
    const length = gMeme.lines.length;
    var currIdx = gMeme.selectedLineIdx;
    if (length === 0) {
        console.log('1');
        return;
    }
    if (currIdx === length - 1) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx++;
    }
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.lines.length === 0 || gMeme.selectedLineIdx === 0) return;
    gMeme.selectedLineIdx--;
    // console.log('gMeme:', gMeme);
}

function alignLeft() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.align = 'left';
}

function alignCenter() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.align = 'center';
}

function alignRight() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.align = 'right';
}

function getCurrLineIdx() {
    gCurrLine = gMeme.selectedLineIdx;
    return gCurrLine;
}

function saveMeme() {
    gMemes.push(gMeme);
    saveToStorage(MEMES_DB_KEY, gMemes);
}

function changeTxtPos(width, height) {
    gMeme.lines.forEach((line) => {
        line.xAxis = width / 2;
        if (line.yAxis > height) line.yAxis = height - 20;
    });
}

function saveImg(data) {
    gSavedImgs.unshift(data);
    saveToStorage(IMGS_DB_KEY, gSavedImgs);
}

function getMyImgs() {
    var imgs = loadFromStorage(IMGS_DB_KEY);
    return imgs;
}