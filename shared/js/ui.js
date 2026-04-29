// UI INTERACTIONS

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("bookSelect").addEventListener("change", function () {
        const selectedBook = this.value;

        updateChapterDropdown(selectedBook);

        // force reset chapter state FIRST
        const chapterSelect = document.getElementById("chapterSelect");
        chapterSelect.selectedIndex = 0;
        currentChapter = 1;

        showFiltered();

        // updates nav AFTER state is correct
        updateChapterNav();
    });

    // CHARACTER VISIBILITY TOGGLE BUTTON
    // Toggles marker layer visibility on/off without changing filters
    document.getElementById("toggleCharacters").addEventListener("click", function () {

        charactersVisible = !charactersVisible;

        applyCharacterVisibility();

        this.textContent = charactersVisible
            ? "👁️ Labels visible"
            : "🚫 Labels hidden";
    });

    // PREVIOUS CHAPTER BUTTON
    // Moves chapter dropdown backward by 1 step
    // Then refreshes map using updated selection
    document.getElementById('prevChapter').onclick = () => {
        const select = document.getElementById('chapterSelect');

        if (select.selectedIndex > 0) {
            select.selectedIndex--;
            updateFilters();
            updateChapterNav();
        }
    };

    // NEXT CHAPTER BUTTON
    // Moves chapter dropdown forward by 1 step
    // Then refreshes map using updated selection
    document.getElementById('nextChapter').onclick = () => {
        const select = document.getElementById('chapterSelect');

        if (select.selectedIndex < select.options.length - 1) {
            select.selectedIndex++;
            updateFilters();
            updateChapterNav();
        }
    };

    document.getElementById("chapterSelect").addEventListener("change", () => {
        updateFilters();
        updateChapterNav();
    });

});

function populateBooks() {
    const bookSelect = document.getElementById("bookSelect");
    if (!bookSelect) return;

    bookSelect.innerHTML = "";

    // Define the exact order you want
    const bookOrder = ["TOG", "COM", "AB", "HOF", "QOS", "EOS", "TOD", "KOA"];

    bookOrder.forEach(book => {
        // Skip if it doesn't exist in this series config
        if (
            CONFIG.bookChapters[book] !== undefined || 
            book === "AB"
        ) {
            const option = document.createElement("option");
            option.value = book;
            option.textContent = CONFIG.bookNames[book] || book;
            bookSelect.appendChild(option);
        }
    });
};

