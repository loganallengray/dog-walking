import { getWalkers } from "./database.js"
import { getWalkerCities } from "./database.js"
import { getCities } from "./database.js"

const walkers = getWalkers();
const walkerCities = getWalkerCities();
const cities = getCities();

// define a function that returns an array of walkercities objects that the walker is assigned
// define empty array to store objects into
// iterate through walkercities
// check if current walker id is equal to current walkercities walkerid
// if true, push walkercity object to empty array
// return array at the end
const findWalkerCities = (walker) => {
    const assignedCities = [];

    for (const walkerCity of walkerCities) {
        if (walker.id === walkerCity.walkerId) {
            assignedCities.push(walkerCity);
        }
    }
    
    return assignedCities;
}

// define a function that uses the assignedcities array to find the walker's city names
// define empty string to store the city names in
// iterate through assignedcities array
// iterate through cities array
// check if city id matches in both
// add city name to string
// return string of city names
const nameWalkerCities = (assignedCities) => {
    let cityNames = [];

    for (const assignedCity of assignedCities) {
        for (const city of cities) {
            if (assignedCity.cityId === city.id) {
                cityNames.push(city.name);
            }
        }
    }

    // the .join makes it look nice
    return cityNames.join(', and ');
}

document.addEventListener(
    "click",
    (clickEvent) => {

        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const assignments = findWalkerCities(walker);
                    const walkerCityNames = nameWalkerCities(assignments);
                    
                    window.alert(`${walker.name} services ${walkerCityNames}`)
                }
            }
        }
    }
)

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML;
}

