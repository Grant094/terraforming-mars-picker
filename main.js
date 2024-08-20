const MILESTONES = [
    "Briber",
    "Builder",
    "Coastguard",
    "Diversifier",
    "Ecologist",
    "Enegizer",
    "Engineer",
    "Farmer",
    "Forester",
    "Fundraiser",
    "Gardener",
    "Generalist",
    "Geologist",
    "Hydrologist",
    "Landshaper",
    "Legend",
    "Lobbyist",
    "Mayor",
    "Merchant",
    "Metallurgist",
    "Philantropist",
    "Pioneer",
    "Planetologist",
    "Planner",
    "Producer",
    "Researcher",
    "Rim Settler",
    "Spacefarer",
    "Sponsor",
    "Tactician",
    "Terraformer",
    "Terran",
    "Thawer",
    "Trader",
    "Tycoon",
];

const AWARDS = [
    "Administrator",
    "Banker",
    "Benefactor",
    "Biologist",
    "Botanist",
    "Celebrity",
    "Collector",
    "Constructor",
    "Contractor",
    "Cultivator",
    "Electrician",
    "Estate Dealer",
    "Excentric",
    "Forecaster",
    "Founder",
    "Highlander",
    "Incorporator",
    "Industrialist",
    "Investor",
    "Landlord",
    "Landscaper",
    "Magnate",
    "Manufacturer",
    "Metropolist",
    "Miner",
    "Mogul",
    "Politician",
    "Promoter",
    "Scientist",
    "Space Baron",
    "Suburbian",
    "Thermalist",
    "Traveller",
    "Visionary",
    "Zoologist",
];

const MILESTONES_OR_AWARDS_TO_PICK = 5;

function pick() {
    // NOTE on terminology: 
    // * "checked" means checkboxes checked by the user
    // * "picked" and "chosen" mean components picked or chosen by the web app
    // * "selected" has been avoided because it is seen as too ambiguous
    alignMinAndMax();
    let componentsChecked = document.querySelectorAll('input[name="component"]:checked');
    let componentsPicked = new Set();
    const numOfColoniesByPlayerCount = {
        1: 4,
        2: 5,
        3: 5,
        4: 6,
        5: 7
    };

    //#region clear out previously picked items
    let pickedComponentsElement = document.getElementById("picked_components");
    pickedComponentsElement.innerHTML = '';

    let pickedColoniesElement = document.getElementById('picked_colonies');
    pickedColoniesElement.innerHTML = "";

    let pickedMilestonesElement = document.getElementById('picked_milestones');
    pickedMilestonesElement.innerHTML = "";

    let pickedAwardsElement = document.getElementById('picked_awards');
    pickedAwardsElement.innerHTML = "";
    //#endregion

    let resultsDiv = document.getElementById('results');
    let componentsDiv = document.getElementById('picked_components_td');
    let minComponents = document.getElementById('min_components').value;
    let maxComponents = document.getElementById('max_components').value;
    let numComponentsToUse = Math.floor(Math.random() * (maxComponents - minComponents + 1)) + Number(minComponents);

    while (componentsPicked.size < numComponentsToUse) {
        componentsPicked.add(pickItem(componentsChecked));
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
        document.getElementById('picked_components').style.display = 'inline';
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
                coloniesPicked.add(pickItem(coloniesChecked));
            }
    
            listPickedItems(coloniesPicked, pickedColoniesElement);
        } else if (component.value === "Awards & Milestones") {
            let milestonesChecked = document.querySelectorAll('input[name="milestone"]:checked');
            let milestonesPicked = new Set();
            let awardsChecked = document.querySelectorAll('input[name="award"]:checked');
            let awardsPicked = new Set();

            while (milestonesPicked.size < MILESTONES_OR_AWARDS_TO_PICK) {
                milestonesPicked.add(pickItem(milestonesChecked));
            }

            while (awardsPicked.size < MILESTONES_OR_AWARDS_TO_PICK) {
                awardsPicked.add(pickItem(awardsChecked));
            }

            if (pickedComponentsElement.innerHTML.includes("Venus")) {
                let hoverlordMilestone = document.createElement('input');
                let venuphileAward = document.createElement('input');

                hoverlordMilestone.value = "Hoverlord";
                venuphileAward.value = "Venuphile";

                milestonesPicked.add(hoverlordMilestone);
                awardsPicked.add(venuphileAward);
            }

            listPickedItems(milestonesPicked, pickedMilestonesElement);
            listPickedItems(awardsPicked, pickedAwardsElement);
        }
    }
    
    let mapsChecked = document.querySelectorAll('input[name="map"]:checked');
    const mapPicked = pickItem(mapsChecked);
    document.getElementById('picked_map_td').innerHTML = mapPicked.value;

    document.getElementById('picked_colonies_col').style.visibility = (pickedColoniesElement.children.length > 0) ? 'visible' : 'collapse';

    document.getElementById('picked_milestones_col').style.visibility = (pickedMilestonesElement.children.length > 0) ? 'visible' : 'collapse';

    document.getElementById('picked_awards_col').style.visibility = (pickedAwardsElement.children.length > 0) ? 'visible' : 'collapse';
    
    resultsDiv.style.display = 'inline';
};

function showOrHideDiv(divId, checkboxId) {
    let div = document.getElementById(divId);
    let checkbox = document.getElementById(checkboxId);

    div.style.display = (checkbox.checked ? 'inline': 'none');
}

function invertCheckedComponents() {
    let components = document.querySelectorAll('input[name="component"]');
    for (const component of components) {
        component.checked = !(component.checked);
    }

    // below statements needed since toggling checkbox this way does not trigger inline onchange event
    showOrHideDiv('colonies_div', 'Colonies');
    showOrHideDiv('awards_and_milestones_div', 'Awards & Milestones');

    alignMinAndMax();
};

function alignMinAndMax() {
    let minComponentsElement = document.getElementById('min_components');
    let maxComponentsElement = document.getElementById('max_components');
    let componentsChecked = document.querySelectorAll('input[name="component"]:checked');

    maxComponentsElement.setAttribute('max', componentsChecked.length);
    maxComponentsElement.setAttribute('value', (maxComponentsElement.value > maxComponentsElement.max ? maxComponentsElement.max : maxComponentsElement.value));
    maxComponentsElement.value = maxComponentsElement.getAttribute('value'); // make sure change in value attribute propagates to the page

    minComponentsElement.setAttribute('max', maxComponentsElement.value);
    minComponentsElement.setAttribute('value', (minComponentsElement.value > minComponentsElement.max ? minComponentsElement.max : minComponentsElement.value));
    minComponentsElement.value = minComponentsElement.getAttribute('value'); // make sure change in value attribute propagates to the page

    maxComponentsElement.setAttribute('min', minComponentsElement.value);
};

function pickItem(pickFrom) {
    return pickFrom[Math.floor(Math.random() * pickFrom.length)];
};

function listPickedItems(pickedItems, parentElement) {
    for (const item of pickedItems) {
        let child = document.createElement('li');
        child.innerHTML = item.value;
        parentElement.appendChild(child);
    }
};

function increment(id) {
    let element = document.getElementById(id);
    if (element.value < element.max) {
        element.value = Number(element.value) + 1;
        element.setAttribute('value', Number(element.getAttribute('value')) + 1);
    }
    alignMinAndMax();
};

function decrement(id) {
    let element = document.getElementById(id);
    if (element.value > element.min) {
        element.value = Number(element.value) - 1;
        element.setAttribute('value', Number(element.getAttribute('value')) - 1);
    }
    alignMinAndMax();
};

function toggleFormVisibility(prefix) {
    const form = document.getElementById(prefix + "_form");
    const button = document.getElementById(prefix + "_collapse_button");

    if (form.style.display === "none") {
        form.style.display = "flex";
        button.classList.remove("plus_button");
        button.classList.add("minus_button");
        button.innerHTML = "-";
    } else {
        form.style.display = "none";
        button.classList.remove("minus_button");
        button.classList.add("plus_button");
        button.innerHTML = "+";
    }
}