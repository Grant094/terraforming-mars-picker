function randomize() {
    // NOTE on terminology: 
    // * "checked" means expansions selected by the user
    // * "picked" and "chosen" mean expansions picked or chosen by the web app
    // * "selected" has been avoided because it is seen as too ambiguous
    let expansionsChecked = document.querySelectorAll('input[name="expansion"]:checked');
    let expansionsChosen = [];
    const numOfExpansionsByPlayerCount = {
        1: 4,
        2: 5,
        3: 5,
        4: 6,
        5: 7
    };
    let resultsDiv = document.getElementById('results');
    let expansionsDiv = document.getElementById('expansions_div');

    for (let expansion of expansionsChecked) {
        if (Math.random() > 0.5) {
            expansionsChosen.push(expansion);
        }
    }
    
    let chosenExpansionsElement = document.getElementById("chosen_expansions");
    chosenExpansionsElement.innerHTML = ''; // clear out previously chosen expansions
    let chosenColoniesElement = document.getElementById('chosen_colonies');
    chosenColoniesElement.innerHTML = ""; // clear-out previously chosen colonies

    // clear out message about the base game if it is there
    let baseGameOnlyElement = document.getElementById('base_game_only');
    if (baseGameOnlyElement) {
        expansionsDiv.removeChild(baseGameOnlyElement);
    }
    
    if (expansionsChosen.length === 0) {
        let child = document.createElement('p');
        child.setAttribute('id', 'base_game_only');
        child.innerHTML = "Play with just the base game!";
        expansionsDiv.appendChild(child);
    } else {
        for (let expansion of expansionsChosen) {
            let child = document.createElement('li');
            child.innerHTML = expansion.value;
            chosenExpansionsElement.appendChild(child);

            // if the Colonies expansion was chosen, choose which colonies to play with
            if (expansion.value === "Colonies") {
                let players = document.getElementById('players').value;
                let numOfExpansionsToUse = numOfExpansionsByPlayerCount[players];
                let coloniesChecked = document.querySelectorAll('input[name="colony"]:checked');
                let coloniesChosen = new Set();
                
                while (coloniesChosen.size < numOfExpansionsToUse) {
                    coloniesChosen.add(chooseColony(coloniesChecked));
                }
        
                for (let colony of coloniesChosen) {
                    let child = document.createElement('li');
                    child.innerHTML = colony.value;
                    chosenColoniesElement.appendChild(child);
                }
        
                
            }
        }
    }
    
    let mapsChecked = document.querySelectorAll('input[name="map"]:checked');
    let mapChosen = mapsChecked[Math.floor(Math.random() * mapsChecked.length)];
    document.getElementById('chosen_map').innerHTML = "Map: " + mapChosen.value;

    let coloniesResultsDiv = document.getElementById('colonies_results');
    if (chosenColoniesElement.children.length > 0) {
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

function chooseColony(colonies) {
    return colonies[Math.floor(Math.random() * colonies.length)];
};