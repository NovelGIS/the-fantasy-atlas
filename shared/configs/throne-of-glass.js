// CONFIG DATA

window.SERIES_CONFIG = {
    id: "throne-of-glass",
    name: "Throne of Glass",

    bookChapters: {     // For chapter drop-down count
        "TOG": 55,
        "COM": 56,
        "HOF": 68,
        "QOS": 89,
        "EOS": 75, 
        "TOD": 69,
        "KOA": 122
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

    tandemRead: [

    {
        label: "EOS - Ch 1",
        current: { Book: "EOS", Chapter: 1 },
        visible: [
            { Book: "EOS", Chapter: 1 }
        ]
    },

    {
        label: "EOS - Ch 2",
        current: { Book: "EOS", Chapter: 2 },
        visible: [
            { Book: "EOS", Chapter: 2 }
        ]
    },

    {
        label: "EOS - Ch 3",
        current: { Book: "EOS", Chapter: 3 },
        visible: [
            { Book: "EOS", Chapter: 3 }
        ]
    },

    {
        label: "EOS - Ch 4",
        current: { Book: "EOS", Chapter: 4 },
        visible: [
            { Book: "EOS", Chapter: 4 }
        ]
    },

    {
        label: "EOS - Ch 5",
        current: { Book: "EOS", Chapter: 5 },
        visible: [
            { Book: "EOS", Chapter: 5 }
        ]
    },

    {
        label: "TOD - Ch 1",
        current: { Book: "TOD", Chapter: 1 },
        visible: [
            { Book: "EOS", Chapter: 6 },
            { Book: "TOD", Chapter: 1 }
        ]
    },

    {
        label: "EOS - Ch 6",
        current: { Book: "EOS", Chapter: 6 },
        visible: [
            { Book: "EOS", Chapter: 6 },
            { Book: "TOD", Chapter: 2 }
        ]
    },

    {
        label: "EOS - Ch 7",
        current: { Book: "EOS", Chapter: 7 },
        visible: [
            { Book: "EOS", Chapter: 7 },
            { Book: "TOD", Chapter: 2 }
        ]
    },
    {
        label: "EOS - Ch 8",
        current: { Book: "EOS", Chapter: 8 },
        visible: [
            { Book: "EOS", Chapter: 8 },
            { Book: "TOD", Chapter: 2 }
        ]
    },
    {
        label: "TOD - Ch 2",
        current: { Book: "TOD", Chapter: 2 },
        visible: [
            { Book: "EOS", Chapter: 9 },
            { Book: "TOD", Chapter: 2 }
        ]
    },
    {
        label: "TOD - Ch 3",
        current: { Book: "TOD", Chapter: 3 },
        visible: [
            { Book: "EOS", Chapter: 9 },
            { Book: "TOD", Chapter: 3 }
        ]
    },
    {
        label: "EOS - Ch 9",
        current: { Book: "EOS", Chapter: 9 },
        visible: [
            { Book: "EOS", Chapter: 9 },
            { Book: "TOD", Chapter: 4 }
        ]
    }

]
};
