/* This is how we shuffle */

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
 * Fischer-Yates Brah 
 */
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}



/* add card */  
function addCard() { 
    let newCard = blackCard.cloneNode(true);
    newCard.id = '';
    newCard.cssClass = 'shuffle-card';
    cards.appendChild(newCard);
}

/* submit */
function submitToMe(e) {
    e.preventDefault();
    let theShuffle = {}

    /* title */
    theShuffle.title = document.getElementById('shuffle-title').value;

    /* cards */
    let cards = [... document.getElementsByClassName('shuffle-card')];
    theShuffle.cards = [];
    for (current of cards) {
        if (current.value) {
            theShuffle.cards.push(current.value);
        }
    }
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    if (username.value == '' && password.value == '') {
        return false;
    }
    let resStatus = 0
    let result = document.getElementById('ajax-result');
    result.textContent = '❓';
    fetch('https://specialdelivery.rabbitrabbit.city/tools/theshuffler/submit/', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          theShuffle: theShuffle
        })
    })
    .then(res => {
      resStatus = res.status
      console.log(res);
      return res.json()
    })
    .then(res => {
      switch (resStatus) {
        case 200:
          result.textContent = '💚'; 
          console.log('success');
          break;
        case 403:
          //result.textContent = '🈲';  
          console.log(res.fieldMessages);
          break;
        case 500:
          //result.textContent = '🈲'; 
          console.log('server error, try again');
          break;
        default:
          //result.textContent = '🈲'; 
          console.log('unhandled');
          break;
      }
    })
    .catch(err => {
      //result.textContent = '🈲';  
      console.error(err)
    })
}

/* deal */
const displayTitle = document.getElementById('display-title');
const displayCard = document.getElementById('display-card');
function deal() {
    /* title */
    let title = document.getElementById('shuffle-title');
    displayTitle.textContent = title.value;

    /* card */
    let cards = document.getElementsByClassName('shuffle-card');
    //let cardsWithContent = [... cards].filter(card => card.value);
    randomCard = cards[randomInt(cards.length - 1)];
    let shuffled = shuffle([... cards]);
    displayCard.innerHTML = '';
    for (current of shuffled) {
        let para = document.createElement('p');
        para.textContent = current.value;
        displayCard.appendChild(para);
    }
    
}

/* THE SHUFFLER */
const theActualShuffler = document.getElementById('the-actual-shuffler');
theActualShuffler.addEventListener('click', deal);

/* ADD ONE MORE */
const addAnotherCard = document.getElementById('add-another-card');
const blackCard = document.getElementById('shuffle-card-prototype');
const cards = document.getElementById('cards');
addAnotherCard.addEventListener('click', addCard);

/* SUBMIT! */
const submitButton = document.getElementById('submit-your-shuffle');
submitButton.addEventListener('click', submitToMe);