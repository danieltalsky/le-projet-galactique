/* element server */
const DOMStage = {

  setTheScene(es) {
    this.es = es;

    this.makeLeetleMenu();
    this.makeViewport();
    this.makeReadout();
  },

  makeLeetleMenu() {
    const leetleMenu = document.getElementById('leetleMenu');
    leetleMenu.textContent = '';
    leetleMenu.prepend(this.es.makeDiv('leetleMenuContent', 'content', 'cleek me eventually'));
    return leetleMenu;
  },

  makeViewport() {
    const viewport = document.getElementById('viewport');
    viewport.textContent = '';
    viewport.prepend(this.es.makeDiv('viewportContent', 'content', ''));
    return viewport;
  },

  makeReadout() {
    const readout = document.getElementById('readout');
    readout.textContent = '';
    readout.prepend(this.es.makeDiv('readoutContent', 'content', 'Some Magic Has Happened!'));
    return readout;
  },
};

class ScreenComponent {
  constructor(outerElementId, contentElementId) {
    this.outerElementId = outerElementId;
    this.contentElementId = contentElementId;
  }

  create() {
    this.outerElementId = '';
    this.contentElementId = '';
  }

  clear() {
    this.contentElement.innerHTML = '';
  }

  addContent(content) {
    this.contentElement.append(content);
  }
}

class leetleMenu extends ScreenComponent {
  constructor() {
    super('', '');
  }
}

class viewport extends ScreenComponent {
  constructor() {
    super('', '');
  }
}

class readout extends ScreenComponent {
  constructor() {
    super('', '');
  }
}

const ElementServer = {

  makeDiv(elementId, className, textContent) {
    const div = document.createElement('div');
    div.id = elementId;
    div.className = className;
    div.textContent = textContent;
    return div;
  },
};

const WorldState = {
  worldExists: true,
};

export { DOMStage, ElementServer, WorldState } 