/* element server */
let es = {
    create() {
        return;
    },
    makeDiv(elementId, className, textContent) {
        let div = document.createElement('div');
        div.id = elementId;
        div.className = className;
        div.textContent = textContent;
        return div;
    },
}


let leetleMenu = document.getElementById('leetleMenu');
leetleMenu.prepend(es.makeDiv('leetleMenuBorder', 'border', 'cleek me eventually'))

let viewport = document.getElementById('viewport');

let readout = document.getElementById('readout');
readout.textContent = 'Some Magic Has Happened!';

let collection = document.getElementById('collection');


