// 배열속의 단어 한개를 return.
export function getRandomArbitrary(min, max) {
  return Number.parseInt( Math.random() * (max - min) + min) ;
}


// 4개의 답안 descrition을 생성한다.
export function getRandomAr4Answer(arList = [],  succIndex){
  // list에 arList의 값을 복사하여 대입한다.
  let list = arList.map(item => item);

  //새로운 배열 생성. return 배열
  let arr = [];

  //정답인 요소 push
  arr.push(list[succIndex]);
  // 정답인 요소 제거.
  list.splice(succIndex, 1);

  //  list 배열 속 랜덤한 값 추출 후 arr 푸시 후 제거.
  for(let i = 1; i < 4; i++){
    let arIndex = getRandomArbitrary(0,list.length);
    arr.push(list[arIndex]);
    list.splice(arIndex, 1);
  }
  return arr;
}

export function getShuffleArray(array){
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}