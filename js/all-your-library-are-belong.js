/* element server */
const DOMStage = {

  setTheScene(es) {
    const leetleMenu = this.leetleMenu(es);
    const viewport = this.viewport();
    const readout = this.readout();
  },

  leetleMenu(es) {
    const leetleMenu = document.getElementById('leetleMenu');
    leetleMenu.prepend(es.makeDiv('leetleMenuBorder', 'border', 'cleek me eventually'));
    return leetleMenu;
  },

  viewport() {
    const viewport = document.getElementById('viewport');
    return viewport;
  },

  readout() {
    const readout = document.getElementById('readout');
    readout.textContent = 'Some Magic Has Happened!';
    return readout;
  },
};

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