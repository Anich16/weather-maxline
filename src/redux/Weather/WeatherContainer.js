import Weather from "../../components/Weather/Weather";
import {connect} from "react-redux";
import {
    getCityNameSelector, getHintsListSelector, getHintStateSelector, getInfoWeatherSelector,
    getStatusSelector, setCityAC, setHintStateAC, setInfoAboutCityAC, setInfoAboutCityThunk
} from "./WeatherReducer";


let mapStateToProps = (state) => {
    return {
        cityName: getCityNameSelector(state),
        infoWeather: getInfoWeatherSelector(state),
        status: getStatusSelector(state),
        hintsList: getHintsListSelector(state),
        hintState: getHintStateSelector(state)
    }
};

let mapDispatchToProps =(dispatch) => {
    return {
        setCity: (city) => {
            dispatch(setCityAC(city))
        },
        setInfoAboutCityThunk: (cityName, server) => {
            dispatch(setInfoAboutCityThunk(cityName, server))
        },
        setInfoAboutCity: (newCity) => {
            dispatch(setInfoAboutCityAC(newCity))
        },
        setHintState: (status) => {
            dispatch(setHintStateAC(status))
        }
    }
};

let WeatherContainer = connect(mapStateToProps, mapDispatchToProps)(Weather);
export default WeatherContainer;