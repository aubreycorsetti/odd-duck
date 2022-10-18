'use strict';

let myContainer = document.querySelector('section');
let resultsBtn = document.querySelector('section + div');
let results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let howManyTimesVoted = 0;
let maxNumberOfVotes = 25;

//let allOddDuck = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass];
let allOddDuck = [];
console.log(image3.src);

function OddDuck(name, fileExtension = 'jpeg') {
  this.name = name;
  // this.fileExtension = fileExtension;
  this.src = `img/lab11/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allOddDuck.push(this);
}

new OddDuck('bag');
new OddDuck('banana');
new OddDuck('boots');
new OddDuck('boots');
new OddDuck('breakfast');
new OddDuck('bubblegum');
new OddDuck('chair');
new OddDuck('cthulhu');
new OddDuck('dog-duck');
new OddDuck('dragon');
new OddDuck('pen');
new OddDuck('pet-sweep');
new OddDuck('scissors');
new OddDuck('shark');
new OddDuck('sweep', 'png');
new OddDuck('tauntaun');
new OddDuck('unicorn');
new OddDuck('water-can');
new OddDuck('wine-glass');


function selectRandomOddDuck() {
  return Math.floor(Math.random() * allOddDuck.length);
}

function renderOddDuck() {
  let duck1 = selectRandomOddDuck();
  let duck2 = selectRandomOddDuck();
  let duck3 = selectRandomOddDuck();

  console.log(duck1, duck2, duck3);

  while (duck1 === duck2 || duck1 === duck3 || duck2 === duck3) {
    duck3 = selectRandomOddDuck();
    duck2 = selectRandomOddDuck();
  }

  image1.src = allOddDuck[duck1].src;
  image1.alt = allOddDuck[duck1].name;
  allOddDuck[duck1].views++;
  image2.src = allOddDuck[duck2].src;
  image2.alt = allOddDuck[duck2].name;
  allOddDuck[duck2].views++;
  image3.src = allOddDuck[duck3].src;
  image3.alt = allOddDuck[duck3].name;
  allOddDuck[duck3].views++;
}

function renderResults() {
  for (let i = 0; i < allOddDuck.length; i++){

    let li = document.createElement('li');
    li.textContent = `${allOddDuck[i].name} had ${allOddDuck[i].views} views and ${allOddDuck[i].score} votes`;
    results.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  console.log(event.target);
  howManyTimesVoted++;
  let clickedOddDuck = event.target.alt;

  for (let i = 0; i < allOddDuck.length; i++) {
    if (clickedOddDuck === allOddDuck[i].name) {
      console.log(allOddDuck[i]);
      allOddDuck[i].clicks++;
      break;
    }
  }

  if (howManyTimesVoted === maxNumberOfVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultsBtn.className = 'clicks-allowed';
    resultsBtn.addEventListener('click', renderResults);
  }
  else {
    renderOddDuck();
  }
  console.log(allOddDuck);
}

myContainer.addEventListener('click', handleClick);

renderOddDuck();
