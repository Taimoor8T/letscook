import "./style.css"

const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const results = document.getElementById("results") as HTMLElement;
const details = document.getElementById("details") as HTMLElement;

async function fetchRecipes(ingredient: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();

  results.innerHTML = "";
  details.innerHTML = "";

  if (data.meals) {
    data.meals.forEach((meal: any) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;
      div.addEventListener("click", () => fetchRecipeDetails(meal.idMeal));
      results.appendChild(div);
    });
  } else {
    results.innerHTML = `<p>No recipe found for "${ingredient}".</p>`;
  }
}

async function fetchRecipeDetails(id: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  const meal = data.meals[0];

  details.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>
    <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
  `;
}


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const ingredient = searchInput.value.trim();
  if (ingredient) {
    fetchRecipes(ingredient);
  }
});
