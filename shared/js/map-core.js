// MAP AND DRAWING

var map = L.map('map', {
    maxZoom: 22
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// panes
map.createPane('landPane');
map.createPane('regionsPane');
map.createPane('habitatPane');
map.createPane('poiLinesPane');
map.createPane('waterPane');
map.createPane('poiPane');
map.createPane('characterPane');

// zIndex
map.getPane('landPane').style.zIndex = 200;
map.getPane('regionsPane').style.zIndex = 250;
map.getPane('habitatPane').style.zIndex = 300;
map.getPane('poiLinesPane').style.zIndex = 350;
map.getPane('waterPane').style.zIndex = 400;
map.getPane('poiPane').style.zIndex = 450;
map.getPane('characterPane').style.zIndex = 1000;


let regionsLayer, habitatLayer, poiLinesLayer, waterLayer, poiLayer;

let charactersVisible = true;
let currentChapter = 1;
let characterLayer;

function getSeriesFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("series") || "throne-of-glass";
}

function loadSeriesConfig(series) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `../shared/configs/${series}.js`;

        script.onload = () => {
            window.SERIES_CONFIG = window.SERIES_CONFIG;
            window.CONFIG = window.SERIES_CONFIG;
            resolve();
        };

        script.onerror = reject;

        document.head.appendChild(script);
    });
}

const series = getSeriesFromURL();

function zoomToFirstFeature() {
    if (!window.allCharacterData || !window.CONFIG) return;

    // 🔹 Get first book from config (same logic you already use elsewhere)
    const firstBook = Object.keys(CONFIG.bookChapters)[0];

    let firstFeature;

    if (firstBook === "AB") {
        // Handle Assassin's Blade structure
        const firstNovella = CONFIG.assassinBladeStructure[0].name;

        firstFeature = allCharacterData.features.find(f =>
            f.properties.Book === "AB" &&
            f.properties.Novella === firstNovella &&
            parseInt(f.properties.Chapter) === 1
        );

    } else {
        // Normal books
        firstFeature = allCharacterData.features.find(f =>
            f.properties.Book === firstBook &&
            parseInt(f.properties.Chapter) === 1
        );
    }

    if (!firstFeature) {
        console.warn("No feature found for first book/chapter");
        return;
    }

    const [lng, lat] = firstFeature.geometry.coordinates;

    map.setView([lat, lng], 17); // adjust zoom as needed
}

loadSeriesConfig(series).then(() => {
    loadAllData().then(() => {

        document.getElementById("currentSeries").textContent = CONFIG.name;

        drawLand();
        drawRegions();
        drawHabitat();
        drawPoiLines();
        drawWater();
        drawPoi();

        populateBooks();

        const firstBook = Object.keys(CONFIG.bookChapters)[0];

        document.getElementById("bookSelect").value = firstBook;

        updateChapterDropdown(firstBook);
        updateFilters();
        updateChapterNav();
        zoomToFirstFeature();
        map.invalidateSize();
        map.fire('zoomend');
    });
});

function drawLand() {
    if (!window.landData) {
        console.warn("No land data");
        return;
    }

    landLayer = L.geoJSON(window.landData, {
        pane: 'landPane',
        style: {
            color: "#101B12",
            fillColor: "#949C77"
        }
    }).addTo(map);
}

function drawRegions() {
    regionsLayer = L.geoJSON(window.regionsData, {
            pane: 'regionsPane',
            style: {
            color: "#101B12",
            weight: 1,
            fillColor: "#949C77",
            fillOpacity: 0.6 },
      
            onEachFeature: function(feature, layer) {
                const name = feature.properties.Name;

                // Split label manually or format as needed
                const formatted = name.replace(" - ", "<br>");

                layer.bindTooltip(formatted, {
                    direction: "center",
                    className: "region-label",
                    permanent: true,
                });
            }
        }).addTo(map);
}

function drawHabitat() {
    habitatLayer = L.geoJSON(window.habitatData, {
            pane: 'habitatPane',

            style: function(feature) {
                let type = feature.properties.Type;
                return {
                    color: "#555",
                    weight: 1,
                    fillOpacity: 0.9,
                    fillColor:
                        type === "Forest" ? "#465D38" :
                        type === "Desert" ? "#F6F7ED" :
                        type === "Mountain" ? "#E6E6E6" :
                        type === "Lake" ? "#2A4461" :
                        "#ccc"
                };
            },

            onEachFeature: function(feature, layer) {
                const name = feature.properties.Name;

                // Split label manually or format as needed
                const formatted = name.replace(" - ", "<br>");

                layer.bindTooltip(formatted, {
                    direction: "center",
                    className: "habitat-label",
                    permanent: true,
                });
            }

        }).addTo(map);
}

function drawPoiLines() {
    poiLinesLayer = L.geoJSON(window.poiLinesData, {
        pane: 'poiLinesPane',
        style: { color: "#808080", fillColor: "#ccc", fillOpacity: 0.5 },

        onEachFeature: function(feature, layer) {
            const name = feature.properties.Name;
            const angle = feature.properties.LabelAngle || 0;

            const formatted = name.replace(" - ", "<br>");

            layer.bindTooltip(
                `<div style="transform: rotate(${angle}deg); transform-origin: center;">
                    ${formatted}
                </div>`,
                {
                    permanent: true,
                    direction: "center",
                    className: "poi-label"
                }
            );
        }

    }).addTo(map);
}

function drawWater() {
    waterLayer = L.geoJSON(window.waterData, {
        pane: 'waterPane', //assigns a pane which then gets weighted
        style: { 
                color: "#2A4461", 
                fillColor: "#2A4461", 
                fillOpacity: 0 
        },

        onEachFeature: function(feature, layer) {
            const name = feature.properties.Name;
            const angle = feature.properties.LabelAngle || 0;

            const formatted = name.replace(" - ", "<br>");

            layer.bindTooltip(
                `<div style="transform: rotate(${angle}deg); transform-origin: center;">
                    ${formatted}
                </div>`,
                {
                    permanent: true,
                    direction: "center",
                    className: "water-label"
                }
            );
        }

    }).addTo(map);

}

function drawPoi() {
    poiLayer = L.geoJSON(window.poiData, {
        pane: 'poiPane',

        pointToLayer: function(feature, latlng) {
            const type = feature.properties.Type;

            if (type === "City") {
                return L.circleMarker(latlng, {
                    radius: 5,
                    color: "yellow",
                    weight: 1,
                    fillColor: "gray",
                    fillOpacity: 1
                });
            }

            if (type === "Tower") {
                return L.circleMarker(latlng, {
                    radius: 5,
                    color: "black",
                    weight: 1,
                    fillColor: "black",
                    fillOpacity: 1
                });
            }

            if (type === "Ocean") {
                return L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'empty-icon',
                        html: '',
                        iconSize: [0, 0]
                    })
                });
            }

            return L.circleMarker(latlng, {
                radius: 5,
                color: "black",
                weight: 1,
                fillColor: "gray",
                fillOpacity: 1
            });
        },

        onEachFeature: function(feature, layer) {
            layer.bindTooltip(feature.properties.Name, {
                direction: "top",
                offset: [-20, 0],
                className: "poi-label",
                permanent: true
            });
        }
    }).addTo(map);

    console.log("POI features:", window.poiData.features.length);
};

window.markers = L.markerClusterGroup({
    maxClusterRadius: 30,
    zoomToBoundsOnClick: false
});

map.addLayer(window.markers);

function toggleTooltips(layer, minZoom) {
    if (!layer || !layer.eachLayer) return;

    layer.eachLayer(l => {
        if (!l.getTooltip) return;

        if (map.getZoom() >= minZoom) {
            if (!l.isTooltipOpen()) l.openTooltip();
        } else {
            if (l.isTooltipOpen()) l.closeTooltip();
        }
    });
}

map.on("zoomend", () => {
    toggleTooltips(regionsLayer, 14);
    toggleTooltips(habitatLayer, 16);
    toggleTooltips(poiLinesLayer, 16);
    toggleTooltips(waterLayer, 16);
    toggleTooltips(poiLayer, 16);
});