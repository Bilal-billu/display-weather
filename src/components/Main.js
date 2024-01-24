import React from "react";
import axios from 'axios';
import { useEffect, useState, } from "react";
import { Icon } from '@iconify/react';


function Main() {
    const [customLocation, setCustomLocation] = useState(null);
    const [resultLocation, setResultLocation] = useState({});
    const [userLocationState, setUserLocationState] = useState(null)

    const weatherIcons = [
         "ic:round-cloud", // cloud
        // "la:wind", //passing cloud
        // "carbon:rain", //mild raid
        // "cil:rain", //heavy rain

        "solar:thermometer-outline", //thermometer

        "cil:rain", //wind
        "teenyicons:arrow-solid", //wind direction

        "akar-icons:sun-fill", //sun
        "line-md:moon-loop", //moon
        "system-uicons:location" //location
    ]
    const iconStyle = {
        height: "60px",
        width: "60px"
    }


    function setValues(data) {
        setResultLocation({
            name: data.location.name,
            region: data.location.region,
            country: data.location.country,
            localtime: data.location.localtime,
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            wind_kph: data.current.wind_kph,
            wind_mph: data.current.wind_mph,
            wind_degree: data.current.wind_degree,
            wind_dir: data.current.wind_dir,
            humidity: data.current.humidity,
            cloud: data.current.cloud,
            feels_like_c: data.current.feelslike_c,
            feels_like_f: data.current.feelslike_f,
            icon: data.current.condition.icon,
            conditionText: data.current.condition.text
        })
    }

    useEffect(() => {
        let loc = ""
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                loc = latitude + ", " + longitude;
                setUserLocationState(loc);
                console.log("location", loc + "");
            });
        }
        else {
            console.log("Location not available")
        }
        callingAPI(userLocationState)
        console.log("calling", loc, typeof (loc));

    }, [userLocationState]);

    function callingAPI(location) {
        if (!location) {
            return
        }
        let urlAPI = `https://api.weatherapi.com/v1/current.json?key=f5fe5f572bd54e4db0e80524242201&q=${location}&aqi=no`
        console.log("Start of calling func", location)
        axios({
            method: 'get',
            url: urlAPI,
            responseType: 'stream'
        })
            .then(function (response) {
                console.log("Start of then in calling")
                setValues(JSON.parse(response.data))
                console.log(urlAPI);
            })
            .catch(function (response) {
                console.log("Start of catch in calling")
                console.log("Error: ", response)
                console.log(urlAPI);
            });
    }


    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <form className="d-flex flex-column align-items-center row" onSubmit={(e) => {
                e.preventDefault();
                callingAPI(customLocation)
            }}>
                <input type="text" placeholder="What is your location?" className="col-12 m-2"
                    name="location" id="inputLocation" onChange={(e) => {
                        e.preventDefault();
                        setCustomLocation(e.target.value)
                    }} />
                <input type="submit" value="submit" className="btn btn-dark m-2 col-8"
                />
            </form>

            {/* //-------------------------------------- */}
            <div>
                <div className="bg-black text-light m-2 my-5 p-2">
                    <h1>
                        Location
                        <Icon icon={weatherIcons[6]} className="text text-light mx-2" />
                        </h1>

                    <div className="d-flex flex-column flex-md-row justify-content-between justify-content-md-center align-content-center align-items-center flex-wrap m-2 p-4">
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Name: {resultLocation.name}</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Region: {resultLocation.region}</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Country: {resultLocation.country}</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Time: {resultLocation.localtime}</h5>
                    </div>
                </div>

                <div className="bg-black text-light m-2 my-5 p-2">
                    <h1>
                        Temperature
                        <Icon icon={weatherIcons[1]} className="text text-light mx-2" />
                    </h1>
                    <div className="d-flex flex-row justify-content-between align-content-center align-items-center">
                        <img src={resultLocation.icon} className="col-5 m-2 m-md-0" style={iconStyle} />
                        <h5 className="col-5 text-end m-2 m-md-0 d-inline px-3" >{resultLocation.conditionText}</h5>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-center align-content-center align-items-center flex-wrap m-2 p-4">
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Current Temperature: {resultLocation.temp_c}&deg;C</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Feels Like: {resultLocation.feels_like_c}&deg;C</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Current Temperature: {resultLocation.temp_f}&deg;F</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Feels Like: {resultLocation.feels_like_f}&deg;F</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Humidity: {resultLocation.humidity}</h5>
                    </div>
                </div>

                <div className="bg-black text-light m-2 my-5 p-2">
                    <h1>
                        Weather
                        <Icon icon={weatherIcons[0]} className="text text-light mx-2" />
                    </h1>
                    <div className="d-flex flex-column flex-md-row justify-content-center align-content-center align-items-center flex-wrap m-2 p-4">
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Wind Speed (KM): {resultLocation.wind_kph}</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Wind Speed (M): {resultLocation.wind_mph}</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Wind Direction: {resultLocation.wind_dir}</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Wind Degree: {resultLocation.wind_degree}</h5>
                        <h5 className="col-12 col-md-5 m-2 m-md-0">Clouds: {resultLocation.cloud}</h5>

                    </div>
                </div>
            </div>

        </div >
    )
}


export default Main;