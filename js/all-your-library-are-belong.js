import { KnowledgeDropper as kd } from './all-the-knowledge-comes-from-here.js'
import {
  LivingThing,
  SentientThing,
  AlienCreature,
} from './all-the-fake-sentience-is-here.js'

/* element server */
const ElementServer = {

  makeDiv(elementId, className, textContent) {
    const div = document.createElement('div');
    div.id = elementId;
    div.className = className;
    div.textContent = textContent;
    return div;
  },

  makeActionLink(elementId, className, linkText, action) {
    const a = document.createElement('a');
    a.id = elementId;
    a.className = className;
    a.textContent = linkText;
    a.href = `#${action}`;
    return a;
  },
};

/* DOMStage coordinates the browser model actions */
const DOMStage = {

  setTheScene(leetleMenu, viewport, readout) {
    this.leetleMenu = leetleMenu;
    this.viewport = viewport;
    this.readout = readout;

    this.leetleMenu.create();
    this.viewport.create();
    this.readout.create();

    // Set up the leeeeeetle menu:
    // - go to a random planet
    this.leetleMenu.addContent(
      ElementServer.makeActionLink('planetsActionLink', 'actionLink', 'Visit Planets', 'visitPlanets'),
    );
    this.leetleMenu.addContent(' | ');
    // - go to a random location
    this.leetleMenu.addContent(
      ElementServer.makeActionLink('locationActionLink', 'actionLink', 'Visit a Random Location', 'visitLocation'),
    );
    this.leetleMenu.addContent(' | ');
    // - go to a random location
    this.leetleMenu.addContent(
      ElementServer.makeActionLink('citizenActionLink', 'actionLink', 'Meet a Citizen of the Universe', 'meetCitizen'),
    );
  },
};

/* The WorldState coordinates all the other stuff */
const WorldState = {
  worldExists: true,

  ACTIONS: {
    visitPlanets: () => {
      DOMStage.viewport.clear();
      DOMStage.viewport.makeNewPlanetAppear();
      DOMStage.readout.displayPlanetText();
    },
    visitLocation: () => {
      DOMStage.viewport.clear();
      DOMStage.viewport.createLandscape();
      DOMStage.viewport.makeNewLocationAppear();
      DOMStage.readout.displayLocationText();
    },
    meetCitizen: () => {
      DOMStage.viewport.clear();
      DOMStage.viewport.createLandscape();
      DOMStage.viewport.makeCitizenAppear();
      const citizen = new AlienCreature();
      DOMStage.readout.displayCitizenText(citizen);
    },
  },

  possibleACTIONS: () => Object.keys(WorldState.ACTIONS),

  makeAUniverse() {
    WorldState.createActionLinkCapturing();
  },

  ACTION(actionUrl) {
    const action = actionUrl.substring(actionUrl.indexOf('#') + 1);

    if (WorldState.possibleACTIONS().includes(action)) {
      WorldState.ACTIONS[action]();
    } else {
      console.error(`User requested the action #${action} but there's nothing I know how to do called that.`);
    }
  },

  createActionLinkCapturing() {
    document.querySelector('body').addEventListener('click', (e) => {
      // Do some check on target
      if (e.target.classList.contains('actionLink')) {
        WorldState.ACTION(e.target.href);
      }
    }, true); // Use Capturing
  },
};

/* ScreenComponents are boxes on the screen with content and corresponding CSS rules */
class ScreenComponent {
  constructor(outerElementId, contentElementId) {
    this.contentClass = 'content';

    this.outerElementId = outerElementId;
    this.contentElementId = contentElementId;
    this.outerElement = null;
    this.contentElement = null;
  }

  create() {
    this.outerElement = document.getElementById(this.outerElementId);
    this.outerElement.innerHTML = '';
    this.contentElement = ElementServer.makeDiv(this.contentElementId, this.contentClass, '');
    this.outerElement.prepend(this.contentElement);
  }

  clear() {
    this.contentElement.innerHTML = '';
  }

  addContent(content) {
    this.contentElement.append(content);
  }
}

class LeetleMenu extends ScreenComponent {
  constructor() {
    super('leetleMenu', 'leetleMenuContent');
  }
}

class Viewport extends ScreenComponent {
  constructor() {
    super('viewport', 'viewportContent');
  }

  makeNewPlanetAppear() {
    this.contentElement.style.backgroundSize = 'contain';
    this.contentElement.style.backgroundImage = 'url(/img/sample-planet.png)';
    this.contentElement.style.backgroundRepeat = 'no-repeat';
    this.contentElement.style.backgroundPositionX = '30%';
  }

  makeNewLocationAppear() {
    this.contentElement.appendChild(ElementServer.makeDiv('alienLocation', 'alienLocation', ''));
    const citizen = document.getElementById('alienLocation');
    citizen.style.cssText = 'position: absolute; left: 5%; right: 0; top: 0; bottom: 0;';
    citizen.style.backgroundSize = 'contain';
    citizen.style.backgroundRepeat = 'no-repeat';
    citizen.style.backgroundImage = 'url(/img/sample-location.png)';
  }

  createLandscape() {
    this.contentElement.style.backgroundSize = 'contain';
    this.contentElement.style.backgroundImage = 'url(/img/sample-landscape.png)';
    this.contentElement.style.backgroundImage = 'url(/img/sample-landscape.png), linear-gradient(0deg, #3E261C, #F1FBFD 80%)';
    this.contentElement.style.backgroundRepeat = 'no-repeat';
    this.contentElement.style.backgroundPosition = 'center';
  }

  makeCitizenAppear() {
    this.contentElement.appendChild(ElementServer.makeDiv('alienCitizen', 'alienCitizen', ''));
    const citizen = document.getElementById('alienCitizen');
    citizen.style.cssText = 'position: absolute; left: 60%; right: 0; top: 0; bottom: 0;';
    citizen.style.backgroundSize = 'contain';
    citizen.style.backgroundRepeat = 'no-repeat';
    citizen.style.backgroundImage = 'url(/img/sample-alien.png)';
  }
}

class Readout extends ScreenComponent {
  constructor() {
    super('readout', 'readoutContent');
  }

  displayPlanetText() {
    this.clear();

    const planetPrefixes = kd.yank('planetPrefixes');
    const planetSuffixes = kd.yank('planetSuffixes');

    const planetPrefix = planetPrefixes[Math.floor(Math.random() * planetPrefixes.length)];
    const planetSuffix = planetSuffixes[Math.floor(Math.random() * planetSuffixes.length)];

    this.addContent(ElementServer.makeDiv(null, 'message', `You visit a brand new planet called ${planetPrefix} ${planetSuffix}. `));
    this.addContent(ElementServer.makeActionLink(null, 'actionLink', 'Take off and visit a different planet? ... ', 'visitPlanets'));
    this.addContent(ElementServer.makeActionLink(null, 'actionLink', 'or land on the planet and explore?', 'visitLocation'));
  }

  displayLocationText() {
    this.clear();
    this.addContent(ElementServer.makeDiv(null, 'message', 'You visit a brand new location. '));

    /* cheap and dirty random location text */
    const possibilities = Object.keys(kd.yank('possibleThingsOnAPlanet'));
    const categoryFound = possibilities[Math.floor(Math.random() * possibilities.length)];
    const possibleThingsOnAPlanet = kd.yank('possibleThingsOnAPlanet');
    const additionalPlanetDetails = kd.yank('additionalPlanetDetails');
    const sourceText = possibleThingsOnAPlanet[categoryFound];
    const details = additionalPlanetDetails[categoryFound];
    let displayText = sourceText.replace('{1}', details[Math.floor(Math.random() * details.length)]);
    displayText = displayText.replace('{2}', details[Math.floor(Math.random() * details.length)]);

    this.addContent(ElementServer.makeDiv(null, 'message', displayText));

    this.addContent(ElementServer.makeActionLink(null, 'actionLink', 'Walk around some more on this planet? ... ', 'visitLocation'));
    this.addContent(ElementServer.makeActionLink(null, 'actionLink', 'or visit another planet? ', 'visitPlanets'));
  }

  displayCitizenText(citizen) {
    this.clear();
    this.addContent(ElementServer.makeDiv(null, 'message', citizen.describe()));
    this.addContent(ElementServer.makeDiv(null, 'message', citizen.talk()));
    this.addContent(ElementServer.makeDiv(null, 'message', citizen.makeActionLink(
      'speakToTheCitizen', 'actionLink', 'Say to the citizen, "Do you speak galactic standard?', 'askCitizenAboutLanguage',
    )));
  }
}

export {
  DOMStage,
  ElementServer,
  WorldState,
  LeetleMenu,
  Viewport,
  Readout,
};
