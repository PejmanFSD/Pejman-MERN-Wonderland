function getRandNum(maxNum) {
    return Math.floor(Math.random() * maxNum) + 1;
}

function getRandArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export { getRandNum, getRandArr };