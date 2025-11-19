function getRandNum(maxNum) {
    return Math.floor(Math.random() * maxNum) + 1;
}

function getRandNumInRange(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  }

function getRandArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export { getRandNum, getRandNumInRange, getRandArr };