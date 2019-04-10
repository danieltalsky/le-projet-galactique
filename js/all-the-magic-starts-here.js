/*
 * All the Magic Starts Here
 */
import {
  DOMStage as dom,
  ElementServer as es,
  WorldState as ws,
} from '/js/all-your-library-are-belong.js';

document.addEventListener('DOMContentLoaded', () => {
  dom.setTheScene(es);
  // ws.makeAUniverse();
});
