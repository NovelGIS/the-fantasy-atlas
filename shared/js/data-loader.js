// ASYNC DATA

function loadAllData() {
    return Promise.all([

    fetch(CONFIG.dataFiles.land).then(r => r.json()),
    fetch(CONFIG.dataFiles.regions).then(r => r.json()),
    fetch(CONFIG.dataFiles.habitat).then(r => r.json()),
    fetch(CONFIG.dataFiles.poilines).then(r => r.json()),
    fetch(CONFIG.dataFiles.water).then(r => r.json()),
    fetch(CONFIG.dataFiles.poi).then(r => r.json()),
    fetch(CONFIG.dataFiles.characters).then(r => r.json())
        

    ]).then(([land, regions, habitat, poilines, water, poi, characters]) => {

        window.landData = land;
        window.regionsData = regions;
        window.habitatData = habitat;
        window.poiLinesData = poilines;
        window.waterData = water;
        window.poiData = poi;
        window.allCharacterData = characters;
        
    });
}