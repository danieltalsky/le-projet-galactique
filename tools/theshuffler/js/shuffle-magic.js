/* This is how we shuffle */

/*
 * Fischer-Yates Brah
 */
function shuffle(toSort) {
  let counter = toSort.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter -= 1;

    // And swap the last element with it
    const temp = toSort[counter];
    toSort[counter] = toSort[index];
    toSort[index] = temp;
  }

  return toSort;
}

/* add card */
function addCard() {
  const cards = document.getElementById('cards');
  const blackCard = document.getElementById('shuffle-card-prototype');
  const newCard = blackCard.cloneNode(true);
  newCard.id = '';
  newCard.cssClass = 'shuffle-card';
  cards.appendChild(newCard);
}

/* submit */
function submitToMe(e) {
  e.preventDefault();
  const theShuffle = {};

  /* title */
  theShuffle.title = document.getElementById('shuffle-title').value;

  /* cards */
  const cards = [...document.getElementsByClassName('shuffle-card')];
  theShuffle.cards = [];
  cards.forEach((current) => {
    if (current.value) {
      theShuffle.cards.push(current.value);
    }
  });
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  if (username.value === '' && password.value === '') {
    return false;
  }
  let resStatus = 0;
  const result = document.getElementById('ajax-result');
  result.textContent = '❓';
  fetch('https://specialdelivery.rabbitrabbit.city/tools/theshuffler/submit/', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      theShuffle,
    }),
  })
    .then((res) => {
      resStatus = res.status;
      console.log(res);
      return res.json();
    })
    .then((res) => {
      switch (resStatus) {
        case 200:
          result.textContent = '💚';
          console.log('success');
          return true;
        case 403:
          result.textContent = '🈲';
          console.log(res.fieldMessages);
          break;
        case 500:
          result.textContent = '🈲';
          console.log('server error, try again');
          break;
        default:
          result.textContent = '🈲';
          console.log('unhandled');
          break;
      }
    })
    .catch((err) => {
      result.textContent = '🈲';
      console.error(err);
    });
  return false;
}

/* deal */
const displayTitle = document.getElementById('display-title');
const displayCard = document.getElementById('display-card');
function deal() {
  /* title */
  const title = document.getElementById('shuffle-title');
  displayTitle.textContent = title.value;

  /* card */
  const cards = document.getElementsByClassName('shuffle-card');
  // const randomCard = cards[randomInt(cards.length - 1)];
  const shuffled = shuffle([...cards]);
  displayCard.innerHTML = '';
  shuffled.forEach((current) => {
    const para = document.createElement('p');
    para.textContent = current.value;
    displayCard.appendChild(para);
  });
}

/* THE SHUFFLER */
const theActualShuffler = document.getElementById('the-actual-shuffler');
theActualShuffler.addEventListener('click', deal);

/* ADD ONE MORE */
const addAnotherCard = document.getElementById('add-another-card');
addAnotherCard.addEventListener('click', addCard);

/* SUBMIT! */
const submitButton = document.getElementById('submit-your-shuffle');
submitButton.addEventListener('click', submitToMe);
