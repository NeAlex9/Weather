function SetMap(lat, lng) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxtMjAyMSIsImEiOiJja29yNXBveXIwano5MnJubGx0dWE4YjI4In0.iQfUeGjuxuSzT-rgp2wYNQ';
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
}

async function GetLocation(url) {
    const res = await fetch(url);
    return await res.json();
}

document.querySelector(".searchbar__button").addEventListener('click', () => {
    try {
        const city = document.querySelector('.searchbar__input').value;
        GetLocation(`https://api.opencagedata.com/geocode/v1/google-v3-json?address=${city}+belarus&pretty=1&key=62bd9f9ed68a4d43940f68885af97938`).then((data => {
                SetMap(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
            })
        )
    } catch (e) {

    }
})

document.addEventListener("keyup", function (event){
    if (event.code === 'Enter' && event.target === document.querySelector('.searchbar__input')) {
        event.preventDefault();
        document.querySelector('.searchbar__button').click();
    }
});
