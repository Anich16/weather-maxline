import * as axios from "axios";

const SET_INFO_ABOUT_CITY = "WEATHER/SET_INFO_ABOUT_CITY";
const SET_CITY = "WEATHER/SET_CITY";
const SET_STATUS ="WEATHER/SET_STATUS";
const SET_HINT_STATUS = "WEATHER/SET_HINT_STATUS";

const icons = {
    "clear sky": "http://openweathermap.org/img/w/01d.png",
    "few clouds": "http://openweathermap.org/img/w/02d.png",
    "scattered clouds": "http://openweathermap.org/img/w/03d.png",
    "broken clouds": "http://openweathermap.org/img/w/04d.png",
    "shower rain": "http://openweathermap.org/img/w/09d.png",
    "rain": "http://openweathermap.org/img/w/10d.png",
    "thunderstorm": "http://openweathermap.org/img/w/11d.png",
    "snow": "http://openweathermap.org/img/w/13d.png",
    "mist": "http://openweathermap.org/img/w/50d.png"
};


export const statuses = {
    INIT: "INIT",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    INPROGRESS: "INPROGRESS",
    CAPTCHAREQUIRED: "CAPTCHAREQUIRED"
};

let initialState = {
    status: statuses.INIT,
    cityName: "",
    infoWeather: [ ],
    count: 0,
    hintsList: [],
    hintState: "close"

};

let WeatherReducer = (state =initialState, action) => {
    switch (action.type){
        case SET_CITY:
            return {
                ...state, cityName: action.city
            };
        case SET_INFO_ABOUT_CITY:
            let newHint = {};
            for (let i = 0; i < state.hintsList.length; i++){
                if (state.hintsList[i].name !== action.newCity.name && action.newCity.name) {
                      newHint.id =  state.count++;
                        newHint.name =  action.newCity.name
                    }

                }

            return {
                ...state, infoWeather: [...state.infoWeather, action.newCity],
                hintsList: [...state.hintsList, newHint]
            };
        case SET_STATUS:
            return {
                ...state, status: action.status
            };
        case SET_HINT_STATUS:
            return {
                ...state, hintState: action.status
            };
        default:
            return state
    }
};

export let setInfoAboutCityThunk = (cityName, server)=> (dispatch)=> {
    dispatch(setStatusAC(statuses.INPROGRESS));
            axios.get(`https://cors-anywhere.herokuapp.com/https://openweathermap.org/data/2.5/weather?q=${cityName}&appid=b6907d289e10d714a6e88b30761fae22`)
            .then(res=>{
                let newCity = {
                    icon: icons[res.data.weather[0].description],
                    date: res.headers.date,
                    name: cityName.toUpperCase(),
                    temp: res.data.main.temp,
                    weatherState: res.data.weather[0].description,
                    maxTemp: res.data.main["temp_max"].toFixed(2),
                    minTemp: res.data.main["temp_min"].toFixed(2),
                    wind: res.data.wind.speed.toFixed(2)
                };
                dispatch(setInfoAboutCityAC(newCity));
                dispatch(setStatusAC(statuses.SUCCESS));
                dispatch(setHintStateAC("close"))
            })
            .catch (error => {
                alert(error);
                dispatch(setStatusAC(statuses.ERROR))
            })
};



export let setCityAC = (city) => ({type: SET_CITY, city});
export let setInfoAboutCityAC =(newCity) => ({type: SET_INFO_ABOUT_CITY, newCity});
export let setStatusAC = (status) => ({type: SET_STATUS, status});
export let setHintStateAC = (status) => ({type: SET_HINT_STATUS, status});



export let getCityNameSelector = (state) => {
    return state.weather.cityName
};
export let getInfoWeatherSelector = (state) => {
    return state.weather.infoWeather
};
export let getStatusSelector = (state) => {
    return state.weather.status
};
export let getHintsListSelector = (state) => {
    return state.weather.hintsList
};
export let getHintStateSelector = (state) => {
    return state.weather.hintState
};




export default WeatherReducer;

