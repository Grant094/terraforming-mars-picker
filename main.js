function randomize() {
    // NOTE on terminology: 
    // * "checked" means expansions selected by the user
    // * "chosen" means expansions chosen by the web app
    // * "selected" has been avoided because it is seen as too ambiguous
    let expansionsChecked = document.querySelectorAll('input[name="expansion"]:checked');
    let expansionsChosen = [];
    
    for (let expansion of expansionsChecked) {
        if (Math.random() > 0.5) {
            expansionsChosen.push(expansion);
        }
    }
    
    let chosenExpansionsElement = document.getElementById("chosen_expansions");
    chosenExpansionsElement.innerHTML = ''; // clear out previously chosen expansions
    for (let expansion of expansionsChosen) {
        let child = document.createElement('li');
        child.innerHTML = expansion.value;
        chosenExpansionsElement.appendChild(child);
    }
    
    let mapsChecked = document.querySelectorAll('input[name="map"]:checked');
    let mapChosen = mapsChecked[Math.floor(Math.random() * mapsChecked.length)];
    document.getElementById('chosen_map').innerHTML = "Map: " + mapChosen.value;

    document.getElementById('results').style.display = 'inline';
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
};