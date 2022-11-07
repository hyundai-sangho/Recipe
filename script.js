// Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let userInput = document.getElementById("user-inp");
let recipeUrl = "https://themealdb.com/api/json/v1/1/search.php?s=";

/** 레시피 데이터 가져오는 함수
 * 1. 사진
 * 2. 이름
 * 3. 국가
 * 3. 재료와 양
 */
let getRecipe = async () => {
  let userInputValue = userInput.value;
  let searchRecipeUrl = recipeUrl + userInputValue;

  if (userInputValue.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Empty</h3>`;
  } else {
    await fetch(searchRecipeUrl)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];

        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;

            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `
      <img src=${myMeal.strMealThumb}>
      <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
      </div>
      <div id="ingredient-con"></div>
      <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
      </div>
      <button id="show-recipe">View Recipe</button>
      `;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });

        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch((error) => {
        if (error) {
          result.innerHTML = `<h3>Invalid Input</h3>`;
        }
      });
  }
};

// search 버튼 클릭시 getRecipe() 함수 호출
searchBtn.addEventListener("click", getRecipe);

// input창에서 enter키를 누르면 getRecipe() 함수 호출
userInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getRecipe();
  }
});
