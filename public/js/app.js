const city = document.querySelector('input')
const searchForm = document.querySelector('form')
const parag1 = document.querySelector('#message_one')
const parag2 = document.querySelector('#message_two')

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(city.value);    

    parag1.innerText = "Loading in progress"

    fetch('https://codingstuff-weather-app-nodejs.herokuapp.com/weather?address='+ city.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                parag1.innerText = "Cette ville n\'est pas valide"
                parag2.innerText = "Erreur de chargement des données"
            } else {
                parag1.innerText = data.location
                parag2.innerHTML = data.forecast
            }
        })
    })
})