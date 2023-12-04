function randomize() {
    // NOTE on terminology: 
    // * "checked" means checkboxes checked by the user
    // * "picked" and "chosen" mean expansions picked or chosen by the web app
    // * "selected" has been avoided because it is seen as too ambiguous
    let expansionsChecked = document.querySelectorAll('input[name="expansion"]:checked');
    let expansionsPicked = new Set();
    const numOfExpansionsByPlayerCount = {
        1: 4,
        2: 5,
        3: 5,
        4: 6,
        5: 7
    };

    let pickedExpansionsElement = document.getElementById("picked_expansions");
    pickedExpansionsElement.innerHTML = ''; // clear out previously picked expansions

    let pickedColoniesElement = document.getElementById('picked_colonies');
    pickedColoniesElement.innerHTML = ""; // clear-out previously picked colonies

    let resultsDiv = document.getElementById('results');
    let expansionsDiv = document.getElementById('expansions_div');
    let minExpansions = document.getElementById('min_expansions').value;
    let maxExpansions = document.getElementById('max_expansions').value;
    let numExpansionsToUse = Math.floor(Math.random() * (maxExpansions - minExpansions + 1)) + Number(minExpansions);

    while (expansionsPicked.size < numExpansionsToUse) {
        expansionsPicked.add(pick(expansionsChecked));
    }
    
    // clear out message about the base game if it is there
    let baseGameOnlyElement = document.getElementById('base_game_only');
    if (baseGameOnlyElement) {
        expansionsDiv.removeChild(baseGameOnlyElement);
    }
    
    if (expansionsPicked.size === 0) {
        let child = document.createElement('p');
        child.setAttribute('id', 'base_game_only');
        child.innerHTML = "Play with just the base game!";
        expansionsDiv.appendChild(child);
    } else {
        listPickedItems(expansionsPicked, pickedExpansionsElement);
    }

    // if the Colonies expansion was picked, pick which colonies to play with
    for (const expansion of expansionsPicked) {
        if (expansion.value === "Colonies") {
            let players = document.getElementById('players').value;
            let numColoniesToPick = numOfExpansionsByPlayerCount[players];
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
    document.getElementById('picked_map').innerHTML = "Map: " + mapPicked.value;

    let coloniesResultsDiv = document.getElementById('colonies_results');
    if (pickedColoniesElement.children.length > 0) {
        coloniesResultsDiv.style.display = 'inline';
    } else {
        coloniesResultsDiv.style.display = 'none';
    }

    
    resultsDiv.style.display = 'inline';
};

function showOrHideMaps(ele) {
    let mapsDiv = document.getElementById('maps_div');
    let expansionMaps = document.getElementsByClassName(ele.value);

    for (const map of expansionMaps) {
        map.checked = ele.checked;
    }

    if (document.querySelectorAll('input[name="maps_expansion"]:checked').length > 0) {
        mapsDiv.style.display = 'inline';
    } else {
        mapsDiv.style.display = 'none';
    }
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

function invertCheckedExpansions() {
    let expansions = document.querySelectorAll('input[name="expansion"]');
    for (const expansion of expansions) {
        expansion.checked = !(expansion.checked);
    }

    let mapsExpansions = document.querySelectorAll('input[name="maps_expansion"]');
    for (const mapsExpansion of mapsExpansions) {
        mapsExpansion.checked = !(mapsExpansion.checked);
        showOrHideMaps(mapsExpansion); // needed since toggling checkbox this way does not trigger inline onchange event
    }

    showOrHideColonies(); // needed since toggling checkbox this way does not trigger inline onchange event
};

function alignMinAndMax() {
    let minExpansionsElement = document.getElementById('min_expansions');
    let maxExpansionsElement = document.getElementById('max_expansions');

    minExpansionsElement.setAttribute('max', maxExpansionsElement.value);
    maxExpansionsElement.setAttribute('min', minExpansionsElement.value);
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