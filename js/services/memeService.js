'use strict';

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];
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

function getMeme() {
    return gMeme;
}

function setLineTxt(elInput) {
    const value = elInput.value;
    const name = elInput.name;
    gMeme.lines[gMeme.selectedLineIdx][name] = value;
}