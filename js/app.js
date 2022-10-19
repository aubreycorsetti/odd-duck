'use strict';

// Global Values

let myContainer = document.querySelector('section');
let resultsBtn = document.querySelector('section + div');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let howManyTimesVoted = 0;
let maxNumberOfVotes = 25;

let indexArray = [];
let allOddDuck = [];


// Constructor

function OddDuck(name, fileExtension = 'jpeg', score = 0, views = 0) {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `img/lab11/${name}.${fileExtension}`;
  this.score = score;
  this.views = views;
  allOddDuck.push(this);
}

// new OddDuck('bag');
// new OddDuck('banana');
// new OddDuck('boots');
// new OddDuck('boots');
// new OddDuck('breakfast');
// new OddDuck('bubblegum');
// new OddDuck('chair');
// new OddDuck('cthulhu');
// new OddDuck('dog-duck');
// new OddDuck('dragon');
// new OddDuck('pen');
// new OddDuck('pet-sweep');
// new OddDuck('scissors');
// new OddDuck('shark');
// new OddDuck('sweep', 'png');
// new OddDuck('tauntaun');
// new OddDuck('unicorn');
// new OddDuck('water-can');
// new OddDuck('wine-glass');

// Functions

function selectRandomOddDuck() {
  return Math.floor(Math.random() * allOddDuck.length);
}
let previousDuckArray = [];


function renderOddDuck() {

  while (indexArray.length < 3) {
    let ranNum = selectRandomOddDuck();
    if ((!indexArray.includes(ranNum)) && (!previousDuckArray.includes(ranNum))) {
      indexArray.push(ranNum);
    }
  }

  previousDuckArray = [];

  let duck1 = indexArray.shift();
  let duck2 = indexArray.shift();
  let duck3 = indexArray.shift();

  previousDuckArray.push(duck1);
  previousDuckArray.push(duck2);
  previousDuckArray.push(duck3);

  console.log(duck1, duck2, duck3);


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

// Storing data locally

function storeOddDuck() {
  let stringifiedOddDuck = JSON.stringify(allOddDuck);
  localStorage.setItem('allOddDuck', stringifiedOddDuck);

}

function getOddDuck() {
  let storeOddDuck = localStorage.getItem('allOddDuck');

  if (storeOddDuck) {
    let parseOddDuck = JSON.parse(storeOddDuck);
    console.log(parseOddDuck);

    for (let allOddDuck of parseOddDuck) {
      let name = allOddDuck.name;
      let fileExtension = allOddDuck.fileExtension;
      let score = allOddDuck.score;
      let views = allOddDuck.views;
      new OddDuck(name, fileExtension, score, views);
    }
  }
  else {
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
  }
}

// Event Handler

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  //console.log(event.target.alt);
  howManyTimesVoted++;
  let clickedOddDuck = event.target.alt;

  for (let i = 0; i < allOddDuck.length; i++) {
    if (event.target.alt === allOddDuck[i].name) {
      //console.log(allOddDuck[i]);
      allOddDuck[i].score++;
      break;
    }
  }

  if (howManyTimesVoted === maxNumberOfVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultsBtn.className = 'clicks-allowed';
    resultsBtn.addEventListener('click', renderChart);
    storeOddDuck();
  }
  else {
    renderOddDuck();
  }
  //console.log(allOddDuck);
}

function renderChart() {

  let duckNames = [];
  let duckViews = [];
  let duckScore = [];
  for (let i = 0; i < allOddDuck.length; i++) {
    duckNames.push(allOddDuck[i].name);
    duckViews.push(allOddDuck[i].views);
    duckScore.push(allOddDuck[i].score);
  }

  const data = {
    labels: duckNames,
    datasets: [
      {
        axis: 'y',
        label: 'Number of Views',
        data: duckViews,
        backgroundColor: [
          'rgba(39, 245, 93, 0.2)',
        ],
        borderColor: [
          'rgb(39, 245, 93)',
        ],
        borderWidth: 1
      },
      {
        axis: 'y',
        label: 'Number of Votes',
        data: duckScore,
        backgroundColor: [
          'rgba(255, 167, 0, 0.2)',
        ],
        borderColor: [
          'rgb(255, 167, 0)',
        ],
        borderWidth: 1
      }
    ]
  };

  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
    }
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

getOddDuck();
renderOddDuck();

// Event Listener

myContainer.addEventListener('click', handleClick);

