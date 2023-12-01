function randomize() {
    // NOTE on terminology: 
    // * "owned" means expansions selected by the user
    // * "chosen" means expansions chosen by the web app
    // * "selected" has been avoided because it is seen as too ambiguous
    let expansionsOwned = document.querySelectorAll('input[name="expansion"]:checked');
    let expansionsChosen = [];
    
    for (let expansion of expansionsOwned) {
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
};

function showOrHideMaps(e) {
    let mapsDiv = document.getElementById('maps_div');

    if (document.querySelectorAll('input[name="maps_expansion"]:checked').length > 0) {
        mapsDiv.style.display = 'inline';
    } else {
        mapsDiv.style.display = 'none';
    }
};