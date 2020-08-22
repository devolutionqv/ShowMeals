const categories = document.querySelector("#categories");
const gMeal = document.querySelector(".group-meal");

getGeneralInfo = () => {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      getCategories(response.data.categories);
    })
    .catch((error) => console.error(error));
};
getGeneralInfo();

//GetCategories: Display categories render
getCategories = (data) => {
  let allCat = "";
  //add id by new div
  data.forEach((category) => {
    allCat += `<div class="category" id="${category.strCategory}"> ${category.strCategory} </div>`;
  });

  categories.innerHTML = allCat;

  //add the img thumb to each div
  data.forEach((category) => {
    const cat = document.getElementById(`${category.strCategory}`);
    cat.style.background = `url(${category.strCategoryThumb}) no-repeat center `;
  });

  const arrayCategory = document.querySelectorAll(".category");
  selectCategory(arrayCategory);
};

selectCategory = (categories) => {
  categories.forEach((category) => {
    category.addEventListener("click", () => {
      //alert(category.id);
      getMeals(category);
    });
  });
};

getMeals = (category) => {
  const tmeal = document.querySelector(".title-meal");
  tmeal.innerText = category.id.toUpperCase();

  axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.id}`)
    .then((response) => {
      displayMeals(response.data.meals);
      window.location = "#cat-individual";
    })
    .catch((error) => console.error(error));
};

displayMeals = (data) => {
  let meals = "";
  data.forEach((meal) => {
    meals += `<div class="meal"><img src="${meal.strMealThumb}" alt ="${meal.strMeal}" title="${meal.strMeal}"><h3>${meal.strMeal}</h3></div>`;
  });
  gMeal.innerHTML = meals;
};
