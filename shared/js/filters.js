// FILTERING LOGIC

// Every time a book is selected from the drop-down, the Chapter drop-down is updated
function updateChapterDropdown(book) {
    const chapterSelect = document.getElementById("chapterSelect");

    // Clear existing options
    chapterSelect.innerHTML = "";

    // Special case for TOG Assassin's Blade
    if (book === "AB") {

        CONFIG.assassinBladeStructure.forEach(novella => {
            for (let i = 1; i <= novella.chapters; i++) {
                const option = document.createElement("option");

                // Store BOTH novella + chapter
                option.value = `${novella.name}|${i}`;

                // What user sees
                option.textContent = `${novella.name} - Ch ${i}`;

                chapterSelect.appendChild(option);
            }
        });

    } else {
        // Normal books (your existing logic)
        const totalChapters = CONFIG.bookChapters[book];

        for (let i = 1; i <= totalChapters; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `Chapter ${i}`;
            chapterSelect.appendChild(option);
        }

        // reset to chapter 1
        chapterSelect.value = "1";
        currentChapter = 1;
    }
}

function updateFilters() {
    showFiltered();
}

// Tells the map which points to show
function showFiltered() {

    let selectedBook = document.getElementById("bookSelect").value;
    let selectedValue = document.getElementById("chapterSelect").value;

    let selectedChapter;
    let selectedNovella = null;

    if (selectedBook === "AB") {
        const parts = selectedValue.split("|");
        selectedNovella = parts[0];
        selectedChapter = parseInt(parts[1]);
    } else {
        selectedChapter = parseInt(selectedValue);
    }
    
    window.locationCounts = {};

    markers.clearLayers();

    characterLayer = L.geoJSON(allCharacterData, {

        filter: function (feature) {

            let matchBook = selectedBook 
                ? feature.properties.Book === selectedBook 
                : true;

            let matchChapter = selectedChapter 
                ? feature.properties.Chapter == selectedChapter 
                : true;

            let matchNovella = true;

            if (selectedBook === "AB") {
                matchNovella = selectedNovella 
                    ? feature.properties.Novella === selectedNovella 
                    : true;
            }

            return matchBook && matchChapter && matchNovella;
        },

        pointToLayer: function (feature, latlng) {

            const location = feature.properties.Location; // use a field that groups same-place points

            // Track how many points we've already placed at this location
            if (!window.locationCounts) window.locationCounts = {};
            if (!locationCounts[location]) locationCounts[location] = 0;

            const index = locationCounts[location]++;
            const total = 10; // approximate max points at a location (can be tweaked)

            // THIS is where angle lives
            const angle = (index / total) * Math.PI * 2;

            const distance = 0.00015; // tweak this for spacing

            const newLat = latlng.lat + Math.sin(angle) * distance;
            const newLng = latlng.lng + Math.cos(angle) * distance;

            return L.circleMarker([newLat, newLng], {
                radius: 2,
                fillColor: "white",
                color: "white",
                weight: 1,
                fillOpacity: 1,
            });
        },

        //Tells it how to place the label and which styling to use
        onEachFeature: function(feature, layer) {
            const name = feature.properties.Character;

            const formatted = name.replace(/, /g, ", ");

            layer.bindTooltip(formatted, {
                permanent: true,
                direction: "center",
                className: "character-label",
            }); 
        }
    });

    markers.addLayer(characterLayer);
};

function updateChapterNav() {
    const select = document.getElementById("chapterSelect");
    if (!select || select.options.length === 0) return;

    const isFirst = select.selectedIndex <= 0;
    const isLast = select.selectedIndex >= select.options.length - 1;

    document.getElementById("prevChapter").disabled = isFirst;
    document.getElementById("nextChapter").disabled = isLast;
};

function applyCharacterVisibility() {
    if (!map || !markers) return;

    if (charactersVisible) {
        map.addLayer(markers);
    } else {
        map.removeLayer(markers);
    }
}

function resetChapterState() {
    const chapterSelect = document.getElementById("chapterSelect");

    chapterSelect.selectedIndex = 0;
    currentChapter = 1;
}