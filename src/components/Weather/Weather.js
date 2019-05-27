import React from "react";
import style from "./Weather.module.css";
import InfoBlock from "../InfoBlock/InfoBlock";

let Weather = (props) => {

    let createCity = (e) => {
        let city = e.target.value;
        props.setCity(city);
        e.target.value = "";

    };

    let findWeather = () => {
        props.setInfoAboutCityThunk(props.cityName, props.server);
        props.setHintState("close");
    };



    let getObj = ()=> {
        let obj =   JSON.parse(localStorage.getItem("myWeather"));
        if (Object.keys(obj).length) {
            props.setInfoAboutCity(obj);

        }
    };

    let openHintsList = () => {
        if(props.hintState === "close"){
            props.setHintState("open")
        } else if (props.hintState === "open"){
            props.setHintState("close")
        }
    };

    let chooseHint =(e) => {
        let value = e.target.innerHTML;
        props.setCity(value);
    };

    return (
        <div className={style.weatherBlock}>

            <div>
                <form className={style.form}>
                    <div>
                        <input type="text" placeholder="City" value={props.cityName} onFocus={openHintsList}
                           onChange={createCity} className={style.field}/>
                        {props.hintState === "open" &&
                        <ul className={style.hintsList} onClick={chooseHint}>
                            {props.hintsList.map((i) => {
                                return <li key={i.id} className={style.item}>{i.name}</li>
                            })}
                        </ul>
                        }
                    </div>
                    <button type="button" onClick={findWeather} className={style.button}>Find</button>

                </form>
                {props.status === "INPROGRESS" && <div className={style.unloadingBlock}><p>Loading
                    <div className={style.loader}> </div></p></div>}


                <div className={style.list}>

                    {
                        !props.infoWeather.length && getObj()
                    }
                    {
                        props.infoWeather.map((i, index) => {
                            let objSave = {
                                icon: i.icon,
                                temp: i.temp,
                                date: i.date,
                                name: i.name,
                                weatherState: i.weatherState,
                                maxTemp: i.maxTemp,
                                minTemp: i.minTemp,
                                wind: i.wind ,
                                dateView: new Date()
                            };
                            localStorage.setItem("myWeather", JSON.stringify(objSave));

                            return <InfoBlock {...i} key={index} className={style.infoBlock}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default Weather;