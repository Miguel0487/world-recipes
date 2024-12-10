const form=document.querySelector('form');

form.addEventListener('submit', (e) => {

    e.preventDefault();
    
    const username=form.username.value.trim();
    const email=form.useremail.value.trim();
    const recipe=form.recipedescription.value.trim();

   if (!username || !email || !recipe) {
    e.preventDefault();
    console.log("Please, fill in all the information");
    return;
   }

   if (!email.includes("@")) {
    e.preventDefault();
    console.log("Please write a valid email address")

   } else {
    console.log("Thanks for submitting your recipe")
   }
});


const stars = document.querySelectorAll('.star');
let selectedRating = 0;

// Iteramos sobre cada estrella
stars.forEach((selectedStar, index) => {
    // Al pasar el mouse sobre una estrella
    selectedStar.addEventListener('mouseover', () => {
        // Cambiamos el color de las estrellas para mostrar la calificación visualmente
        selectedRating = index + 1; // Ajustamos la calificación según la estrella sobre la que pasamos el mouse
        updateStarsColor(selectedRating); // Llamamos a la función para actualizar los colores
    });


    // Al hacer clic en una estrella
    selectedStar.addEventListener('click', () => {
        alert(`Has seleccionado una calificación de ${selectedRating}`); // Mostramos la calificación final
    });
});

// Función para actualizar el color de las estrellas
function updateStarsColor(rating) {
    stars.forEach((star, i) => {
        star.style.color = i < rating ? 'gold' : 'gray'; // Cambia color a dorado si la estrella está seleccionada
    });
}


// SEARCH NAME API

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer'); // Asegúrate de que exista un contenedor con este ID

// Agregar el event listener al input
searchInput.addEventListener('input', inputContent);

// Función para manejar la entrada del usuario
function inputContent() {
  const mySearch = searchInput.value.trim(); // Obtener y limpiar el valor del input
  if (mySearch) {
    fetchMeals(mySearch); // Llamar a la función fetch con la búsqueda
  }
}

// Función para hacer fetch a la API
function fetchMeals(query) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener datos de la API');
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      displayResults(data.meals); // Llamar a la función para mostrar resultados
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error); // Manejar errores
      resultsContainer.innerHTML = '<p>Hubo un error al obtener los datos.</p>';
    });
}

// Función para mostrar resultados en el contenedor
function displayResults(meals) {
  if (!meals) {
    resultsContainer.innerHTML = '<p>No se encontraron recetas.</p>';
    return;
  }

  resultsContainer.innerHTML = meals
    .map((meal) => {
      return `
        <div class="meal">
          <h3>${meal.strMeal}</h3>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <p>${meal.strInstructions.substring(0, 100)}...</p>
        </div>
      `;
    })
    .join(''); // Unir los elementos HTML en una sola cadena
}

