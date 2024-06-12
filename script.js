console.log("Test")
// Créer une fonction pour récupérer les travaux de l'API (works)
// Injecter ces données dans l'HTML
// Récupérer les catégories
// Faire afficher les catégories
// Créer une fonction pour filtrer les catégories au clic

async function getWorks() {
    let responseWorks = await fetch("http://localhost:5678/api/works");
    return responseWorks.json();
}

async function injectData() {
    const works = await getWorks();
    const portfolioSection = document.getElementById("portfolio");

    // Crée la div pour la galerie
    const galleryDiv = document.createElement("div");
    galleryDiv.classList.add("gallery");

    works.forEach(work => {
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        figureElement.appendChild(imageElement);

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.textContent = work.title;

        figureElement.appendChild(figcaptionElement);
        galleryDiv.appendChild(figureElement);
    });

    // Ajoute la galerie à la section portfolio
    portfolioSection.appendChild(galleryDiv);
}


async function getCategories() {
    let responseCategories = await fetch("http://localhost:5678/api/categories");
    return responseCategories.json()
}

async function displayCategories() {
    const categories = await getCategories();
    const portfolioSection = document.getElementById("portfolio");

    // Crée la div pour les filtres
    const filtresDiv = document.createElement("div");
    filtresDiv.classList.add("filtres");

    // Crée un bouton "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.addEventListener("click", () => filterWorksByCategory(null));
    filtresDiv.appendChild(allButton);

    // Boucle à travers les catégories
    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category.name;
        categoryButton.addEventListener("click", () => filterWorksByCategory(category.id));
        filtresDiv.appendChild(categoryButton);
    });

    // Ajoute la div de filtres à la section portfolio
    portfolioSection.appendChild(filtresDiv);
}


async function filterWorksByCategory(categoryId) {
    const works = await getWorks();
    const galleryDiv = document.querySelector("#portfolio .gallery");

    // Efface les travaux actuellement affichés
    galleryDiv.innerHTML = '';

    const filteredWorks = categoryId ? works.filter(work => work.categoryId === categoryId) : works;

    filteredWorks.forEach(work => {
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        figureElement.appendChild(imageElement);

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.textContent = work.title;

        figureElement.appendChild(figcaptionElement);
        galleryDiv.appendChild(figureElement);
    });
}


injectData();
displayCategories();