// CONFIG DATA

window.SERIES_CONFIG = {
    id: "acotar",
    name: "A Court of Thorns and Roses",

    bookChapters: {     // For chapter drop-down count
        "ACOTAR": 5,
        "ACOMAF": 6,
        "ACOWAR": 7,
        "ACOFAS": 8,
        "ACOSF": 9,
    },

    dataFiles: {
        land: "../series/acotar/data/land.geojson",
        regions: "../series/acotar/data/regions.geojson",
        habitat: "../series/acotar/data/habitat.geojson",
        poilines: "../series/acotar/data/poilines.geojson",
        water: "../series/acotar/data/water.geojson",
        poi: "../series/acotar/data/poi.geojson",
        characters: "../series/acotar/data/characters.geojson"
    },

    bookNames: {        // For book drop-down names to link to geoJSON file
        ACOTAR: "A Court of Thorns and Roses",
        ACOMAF: "A Court of Mist and Fury",
        ACOWAR: "A Court of Wings and Ruin",
        ACOFAS: "A Court of Frost and Starlight",
        ACOSF: "A Court of Silver Flames",
    },
};