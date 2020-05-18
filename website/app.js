/* Global Variables */
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "41ff85eb4557cd323fdeb67e3d33c97a";
const localServer = "http://localhost:3000/";
//Event Listener added to element with id generate
document.getElementById("generate").addEventListener("click", () => getWeatherData(apiKey));
//function to get weather data from the api
async function getWeatherData(Key) {
    let zipCode = document.getElementById("zip").value;
    await fetch(apiUrl + zipCode + ",us&appid=" + Key + "&units=imperial").then((response) => {
        return response.json();
    }).then((result) => {
        postData(result.main.temp);
    });
}
//function get projectData
async function getProjectData() {
    await fetch(localServer + 'projectData').then((response) => {
        return response.json();
    }).then((result) => {
        document.getElementById("date").innerHTML = result.date;
        document.getElementById("temp").innerHTML = JSON.stringify(result.temp);
        document.getElementById("content").innerHTML = result.content;
        document.getElementById("zip").value = "";
        document.getElementById("feelings").value = "";
    });
}
//function post projectData
async function postData(temp) {
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
    let content = document.getElementById("feelings").value;
    let data = {
        date: newDate,
        temp: temp,
        content: content,
    };
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    await fetch(localServer + 'projectData', options).then((response) => {
        return response.json();
    }).then((result) => {
        getProjectData()
    });
}