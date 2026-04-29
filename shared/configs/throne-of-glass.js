// CONFIG DATA

window.SERIES_CONFIG = {
    id: "throne-of-glass",
    name: "Throne of Glass",

    bookChapters: {     // For chapter drop-down count
        "TOG": 55,
        "COM": 56,
        "HOF": 68,
        "QOS": 63,
        "EOS": 70,  // ** DOUBLE CHECK **
        "TOD": 59, // ** DOUBLE CHECK **
        "KOA": 120
    },

    assassinBladeStructure: [
        { name: "The Pirate Lord", chapters: 10 },
        { name: "The Healer", chapters: 6 },
        { name: "The Desert", chapters: 12 },
        { name: "The Underworld", chapters: 12 },
        { name: "The Empire", chapters: 14 }
    ],

    dataFiles: {
        land: "../series/throne-of-glass/data/land.geojson",
        regions: "../series/throne-of-glass/data/regions.geojson",
        habitat: "../series/throne-of-glass/data/habitat.geojson",
        poilines: "../series/throne-of-glass/data/poilines.geojson",
        water: "../series/throne-of-glass/data/water.geojson",
        poi: "../series/throne-of-glass/data/poi.geojson",
        characters: "../series/throne-of-glass/data/characters.geojson"
    },

    bookNames: {        // For book drop-down names to link to geoJSON file
        TOG: "Throne of Glass",
        COM: "Crown of Midnight",
        AB: "Assassin's Blade",
        HOF: "Heir of Fire",
        QOS: "Queen of Shadows",
        EOS: "Empire of Storms",
        TOD: "Tower of Dawn",
        KOA: "Kingdom of Ash"
    },
};