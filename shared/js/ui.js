// UI INTERACTIONS

let currentBook = "TOG";
let currentMode = "single";

document.addEventListener("DOMContentLoaded", function () {

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

    const container = document.getElementById("bookButtons");
    if (!container) return;

    container.innerHTML = "";

    const bookOrder = ["TOG", "COM", "AB", "HOF", "QOS", "EOS", "TOD", "KOA"];

    bookOrder.forEach(book => {

        if (
            CONFIG.bookChapters[book] !== undefined ||
            book === "AB"
        ) {

            const button = document.createElement("button");

            button.className = "book-pill";
            button.dataset.book = book;

            button.textContent = CONFIG.bookNames[book] || book;

            // active state
            if (book === currentBook) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {

                currentBook = book;
                currentMode = "single";

                updateChapterDropdown(currentBook);

                currentChapter = 1;

                showFiltered();
                updateChapterNav();

                // refresh active pills
                document.querySelectorAll(".book-pill")
                    .forEach(btn => btn.classList.remove("active"));

                button.classList.add("active");
            });

            container.appendChild(button);
        }
    });

    // TANDEM BUTTON
    const tandemButton = document.createElement("button");

    tandemButton.className = "book-pill tandem-pill";
    tandemButton.textContent = "EOS/TOD Tandem Read";

    tandemButton.addEventListener("click", () => {

        currentMode = "tandem";

        // your tandem logic here

        document.querySelectorAll(".book-pill")
            .forEach(btn => btn.classList.remove("active"));

        tandemButton.classList.add("active");
    });

    container.appendChild(tandemButton);
}

