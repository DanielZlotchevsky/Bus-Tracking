mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuemxvdCIsImEiOiJjbDEwM3AzZ2YyZ3UzM2JwNGhrbmJmOXVxIn0.1LeaAgT5l-rHeu41RzyBpg';

document.getElementById('timeDate').innerText = new Date();

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.05856, 42.31807],
    zoom: 12.2
});

var allStops = []
var allBuses = []


//Generates Bus Stop Markers
async function createBusStops() {
    const busStop = await getBusStops();
    busStop.forEach((stop, i) => {
        allStops[i] = new mapboxgl.Marker({
            color: '#FFA500'
        })
        .setLngLat([-71.03867885945147, 42.35007028512333])
        .addTo(map);
        allStops[i].setLngLat([busStop[i].attributes.longitude, busStop[i].attributes.latitude])
    });

}

async function createBuses() {
    const buses = await getBusLocations();
    buses.forEach((bus, i) => {
        allBuses[i] = new mapboxgl.Marker()
        .setLngLat([-71.104081, 42.365554])
        .addTo(map);
    });
    //setTimeout(createBuses, 10000)
    run()
}



async function run(){
    const buses = await getBusLocations();
    buses.forEach((bus, i) => {
        allBuses[i].setLngLat([buses[i].attributes.longitude, buses[i].attributes.latitude])
    });
    setTimeout(run, 15000)
}


createBusStops()
createBuses()


// Request bus data from MBTA
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=15&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
}

// Request bus data from MBTA
async function getBusStops(){
    const url = 'https://api-v3.mbta.com/stops?filter[route]=15';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
}