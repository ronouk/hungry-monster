const search_body = document.getElementById('fooditem');
const searchButton = document.getElementById('search-button');
const errorMessage = document.getElementById('error-message');
const logoimage = document.querySelector('.logo');
const inputBoxText = document.querySelector('#input-box');

// Event Listener For button Click

searchButton.addEventListener('click', function () {
    const inputText = document.getElementById('input-box').value;
    search_body.innerHTML = '';

    if (inputText === '') {
        errorMessage.style.display = 'block';
    } else {
        foodList(inputText);
        errorMessage.style.display = 'none';
    }
});

// Event Listener For Enter key

inputBoxText.addEventListener('keyup', function (e) {

    if(e.keyCode === 13){
    const inputText = document.getElementById('input-box').value;
    search_body.innerHTML = '';

    if (inputText === '') {
        errorMessage.style.display = 'block';
    } else {
        foodList(inputText);
        errorMessage.style.display = 'none';
    }
    }
});

// Single item information

const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            singleItemInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};

const singleItemInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');

    foodDetailsDiv.innerHTML = `
    <h3 class="single-item-name">Item name: ${food.strMeal}</h3>
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    
    <h5 class="pt-2 pb-2"><i class="fas fa-utensils food-icons"></i> Cooking ingredients:</h5>
    <ul class="ingredient-list">
        <li class = "ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food.strIngredient1}</li>
        <li class = "ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food.strIngredient2}</li>
        <li class = "ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food.strIngredient3}</li>
        <li class = "ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food.strIngredient4}</li>
        <li class = "ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food.strIngredient5}</li>
        <li class = "ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food.strIngredient6}</li>
        <li class = "ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food.strIngredient7}</li>
        <li class = "ingredient-list-item"><i class="far fa-hand-point-right food-icons"></i> ${food.strIngredient8}</li>
    </ul>
`;
};

// Items display function
function foodList(mealId) {
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = fooditem => {
        const foodsDiv = document.getElementById('fooditem');
        if (fooditem != null) {
            fooditem.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-sm-6 col-md-4';
                const foodInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="text-center h-100 single-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            errorMessage.style.display = 'block';
        }
    };
}

// Reload uplon clicking logo
logoimage.addEventListener('click', function () {
    location.reload();
})