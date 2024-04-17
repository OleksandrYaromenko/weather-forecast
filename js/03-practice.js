
// Потрібно створити функціонал для отримання прогнозу погоди в місті.
// Використай публічне API https://www.weatherapi.com/docs/
// Використовуй ендпоінт Forecast для того, щоб отримати прогноз погоди на декілька днів.

// Створи форму в яку користувач:
// 1 вводить назву міста.
// 2 обирає на яку кількість днів він хоче отримати прогноз погоди (3, 5 та 7 днів).
// (Іноді параметр не працює в такому випадку можна зробити пошук на 1, 2 та 3 дні)
// Приклад форми https://prnt.sc/kFmLOj6gBdv-

// Після сабміту форми відмалюй картки з інформацією отриманою з бекенду.
// Картка має містити відомості про:
// 1 Зображення з погодою (icon)
// 2 Текст з погодою (text)
// 3 Дату (date)
// 4 Середню температуру в Цельсія (avgtemp_c)
// Приклад картки https://prnt.sc/h_p-A6Hty-i-

const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "756bd1c7e1d64e85af3183750241504";

const serchForm = document.querySelector(".js-search-form")
const list = document.querySelector(".js-list")
serchForm.addEventListener("submit", handleSumbit)


function handleSumbit(event) {
    event.preventDefault();

    const { city, days } = event.currentTarget.elements
    serviceMeather(city.value, days.value)
        .then(data => { list.innerHTML = creatMarkup(data.forecast.forecastday) })
        .catch(error => console.log(error))
        .finally(() => serchForm.reset())
    
}
function serviceMeather(city = "", days = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: city,
        days,
        lang: "uk"

    })
    return fetch(`${BASE_URL}/forecast.json?${params}`)
        .then(response => {
        if (!response.ok) {
            throw new Error("error")
            }
            return response.json()
    })
}
function creatMarkup(arr) {
    return arr.map(({ date, day: { avgtemp_c, condition: { icon, text } } }) => 
        `<li class ="weather-card">
        <img src = "${icon}" alt="${text}" class = "weather-icon">
        <h2 class="weather-data">${date}</h2>
        <h3 class ="weather-text">${text}</h3>
        <h2 class ="weather-temperature">${avgtemp_c} C</h2>
        </li>
    `)
    .join("")
    }
    
