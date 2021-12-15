'use strict';

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgLng = 18;
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] }];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 50,
        align: 'left',
        color: 'red',
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

function createImg(id, url, keywords) {
    var img = { id, url, keywords };
    return img;
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
    console.log('gMeme:', gMeme);
}

function setLineTxt(txt) {
    // const value = elInput.value;
    // const name = elInput.name;
    // gMeme.lines[gMeme.selectedLineIdx][name] = value;
    gMeme.lines.push({
        txt: `${txt}`,
        size: 30,
        align: 'center',
        color: 'white',
    });
    gMeme.selectedLineIdx++;
}