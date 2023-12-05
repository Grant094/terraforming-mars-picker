function randomize() {
    // NOTE on terminology: 
    // * "checked" means checkboxes checked by the user
    // * "picked" and "chosen" mean components picked or chosen by the web app
    // * "selected" has been avoided because it is seen as too ambiguous
    let componentsChecked = document.querySelectorAll('input[name="component"]:checked');
    let componentsPicked = new Set();
    const numOfColoniesByPlayerCount = {
        1: 4,
        2: 5,
        3: 5,
        4: 6,
        5: 7
    };

    let pickedComponentsElement = document.getElementById("picked_components");
    pickedComponentsElement.innerHTML = ''; // clear out previously picked components

    let pickedColoniesElement = document.getElementById('picked_colonies');
    pickedColoniesElement.innerHTML = ""; // clear-out previously picked colonies

    let resultsDiv = document.getElementById('results');
    let componentsDiv = document.getElementById('picked_components_td');
    let minComponents = document.getElementById('min_components').value;
    let maxComponents = document.getElementById('max_components').value;
    let numComponentsToUse = Math.floor(Math.random() * (maxComponents - minComponents + 1)) + Number(minComponents);

    while (componentsPicked.size < numComponentsToUse) {
        componentsPicked.add(pick(componentsChecked));
    }
    
    // clear out message about the base game if it is there
    let baseGameOnlyElement = document.getElementById('base_game_only');
    if (baseGameOnlyElement) {
        componentsDiv.removeChild(baseGameOnlyElement);
    }
    
    if (componentsPicked.size === 0) {
        document.getElementById('picked_components').style.display = 'none';
        let child = document.createElement('p');
        child.setAttribute('id', 'base_game_only');
        child.innerHTML = "Play with just the base game!";
        componentsDiv.appendChild(child);
    } else {
        listPickedItems(componentsPicked, pickedComponentsElement);
    }

    // if the Colonies component was picked, pick which colonies to play with
    for (const component of componentsPicked) {
        if (component.value === "Colonies") {
            let players = document.getElementById('players').value;
            let numColoniesToPick = numOfColoniesByPlayerCount[players];
            let coloniesChecked = document.querySelectorAll('input[name="colony"]:checked');
            let coloniesPicked = new Set();
            
            while (coloniesPicked.size < numColoniesToPick) {
                coloniesPicked.add(pick(coloniesChecked));
            }
    
            listPickedItems(coloniesPicked, pickedColoniesElement);
        }
    }
    
    let mapsChecked = document.querySelectorAll('input[name="map"]:checked');
    let mapPicked = mapsChecked[Math.floor(Math.random() * mapsChecked.length)];
    document.getElementById('picked_map_td').innerHTML = mapPicked.value;

    let pickedColoniesCol = document.getElementById('picked_colonies_col');
    if (pickedColoniesElement.children.length > 0) {
        pickedColoniesCol.style.visibility = 'visible';
    } else {
        pickedColoniesCol.style.visibility = 'collapse';
    }

    
    resultsDiv.style.display = 'inline';
};

function showOrHideColonies() {
    let coloniesDiv = document.getElementById('colonies_div');
    let coloniesElement = document.getElementById('Colonies');

    if (coloniesElement.checked) {
        coloniesDiv.style.display = 'inline';
    } else {
        coloniesDiv.style.display = 'none';
    }
};

function invertCheckedComponents() {
    let components = document.querySelectorAll('input[name="component"]');
    for (const component of components) {
        component.checked = !(component.checked);
    }

    showOrHideColonies(); // needed since toggling checkbox this way does not trigger inline onchange event
};

function alignMinAndMax() {
    let minComponentsElement = document.getElementById('min_components');
    let maxComponentsElement = document.getElementById('max_components');

    minComponentsElement.setAttribute('max', maxComponentsElement.value);
    maxComponentsElement.setAttribute('min', minComponentsElement.value);
};

function pick(pickFrom) {
    return pickFrom[Math.floor(Math.random() * pickFrom.length)];
};

function listPickedItems(pickedItems, parentElement) {
    for (const item of pickedItems) {
        let child = document.createElement('li');
        child.innerHTML = item.value;
        parentElement.appendChild(child);
    }
};