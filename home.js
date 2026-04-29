fetch('./series-index.json')
    .then(res => res.json())
    .then(seriesList => {

        const container = document.getElementById('seriesGrid');

        seriesList.forEach(series => {

            const card = document.createElement('a');
            card.href = `./map/index.html?series=${series.id}`;
            card.className = 'series-card';

            card.innerHTML = `
                <img src="${series.image}" alt="${series.title}">
                <div class="card-content">
                    <h2>${series.title}</h2>
                    <p>${series.description}</p>
                </div>
            `;

            container.appendChild(card);
        });

    });