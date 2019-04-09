/*
 * All the Magic Starts Here
 */
import {
  DOMStage as dom,
  ElementServer as es,
  WorldState as ws,
} from './all-your-library-are-belong.js';

document.addEventListener('DOMContentLoaded', (e) => {
  dom.setTheScene(es);
  // ws.makeAUniverse();
});
