import React from "react";

export function getRandomArbitrary(min, max) {
    return Number.parseInt( Math.random() * (max - min) + min) ;
  }


export function getRandomAr4Answer(arList = [], max, succIndex){
  let list = arList.map(item => item);
  let arr = [];
  arr.push(list[succIndex]);
  list.splice(succIndex, 1);
    for(let i = 1; i < 4; i++){
      let arIndex = getRandomArbitrary(0,list.length);
      arr.push(list[arIndex]);
      list.splice(arIndex, 1);
    }
    return arr;
}

export function getShuffleArray(array) {
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