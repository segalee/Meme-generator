'use strict';

const MEMES_DB_KEY = 'MEMES';
const IMGS_DB_KEY = 'IMGS';
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgLng = 18;
var gCurrLine;
// var gCurrLineId = 0;
var gYAxis = 50;
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] }];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    data: null,
    lines: [{
        txt: '',
        size: 50,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        yAxis: gYAxis,
        xAxis: 250,
        fontFamily: 'impact',
        isSticker: false,
    }, ],
};

// var gStickers = [{
//         id: 1,
//         url: 'stickers/1.png',
//         positionX: 225,
//         positionY: 225,
//         height: 32,
//         width: 85,
//     },
//     {
//         id: 2,
//         url: 'stickers/2.png',
//         positionX: 225,
//         positionY: 225,
//         height: 42,
//         width: 103,
//     },
//     {
//         id: 3,
//         url: 'stickers/3.png',
//         positionX: 225,
//         positionY: 225,
//         height: 71,
//         width: 74,
//     },
// ];

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
        createImg(16, 'img/16.jpg', ['funny', 'dog']),
        createImg(17, 'img/17.jpg', ['funny', 'politics']),
        createImg(18, 'img/18.jpg', ['funny'])
    );
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    // filter
    return gImgs;
}

function createImg(id, url, keywords) {
    var img = { id, url, keywords };
    return img;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function setLineTxt(txt) {
    if (gMeme.lines.length === 0) {
        setNewLine(false);
    }
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    // console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx);
}

function setSticker() {
    gMeme.selectedLineIdx++;
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
    // gMeme.lines[gMeme.selectedLineIdx].isSticker = true;
    console.log(gMeme);
    console.log(gMeme.selectedLineIdx);
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
        isSticker: false,
    };
    // setLinesPos()
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
}

// changeAlignment(align)
function changeAlignment(align) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.align = align;
}

// ***** // CR

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

function changeFont(input) {
    const newFont = input.value;
    const fontFamily = input.name;
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine[fontFamily] = newFont;
}

function getCurrLineIdx() {
    gCurrLine = gMeme.selectedLineIdx;
    return gCurrLine;
}

// function changeTxtPos(width, height) {
//     gMeme.lines.forEach((line) => {
//         line.xAxis = width / 2;
//         if (line.yAxis > height) line.yAxis = height - 20;
//     });
// }

function doShareMeme(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl);
    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url);
        })
        .catch((err) => {
            console.error(err);
        });
}

function downloadMeme(elLink) {
    const elCanvas = getCanvas();
    var imgContent = elCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function saveImg(data) {
    gSavedImgs.unshift(data);
    saveToStorage(IMGS_DB_KEY, gSavedImgs);
}

function saveMeme() {
    gMemes.push(gMeme);
    saveToStorage(MEMES_DB_KEY, gMemes);
}

// getSaveMemes
function getMyImgs() {
    var imgs = loadFromStorage(IMGS_DB_KEY);
    return imgs;
}

// setFilterBy  - gFilterBy = input value

function filterByKeyWord(elVal) {
    // console.log('filter val', elVal);
    let filteredImgs = [];
    gImgs.filter((img) => {
        const keywords = img.keywords;
        for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i];
            if (keyword.includes(elVal)) {
                filteredImgs.push(img);
            }
        }
    });
    return filteredImgs;
}

// function loadImageFromInput(ev, onImageReady) {
//     console.log('uploading');
//     // document.querySelector('.share-container').innerHTML = '';
//     var reader = new FileReader();
//     reader.onload = (event) => {
//         console.log('onload');
//         var img = new Image();
//         // Render on canvas
//         img.onload = onImageReady.bind(null, img);
//         img.src = event.target.result;
//     };
//     console.log('after');
//     reader.readAsDataURL(ev.target.files[0]);
// }