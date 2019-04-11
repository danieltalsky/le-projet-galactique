/*
 * All the Magic Starts Here
 */
import {
  DOMStage as dom,
  WorldState as ws,
  LeetleMenu,
  Viewport,
  Readout,
} from '/js/all-your-library-are-belong.js';


const leetleMenu = new LeetleMenu();
const viewport = new Viewport();
const readout = new Readout();

document.addEventListener('DOMContentLoaded', () => {
  dom.setTheScene(leetleMenu, viewport, readout);
  ws.makeAUniverse();
});
