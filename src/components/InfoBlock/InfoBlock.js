import React from "react";
import style from "./InfoBlock.module.css";

let InfoBlock = (props) => {
    return (
        <div  className={style.infoBlock}>
            <div className={style.mainInfo}>
                <img alt="Icon" src={props.icon} width="100"/>
                <div className={style.description}>
                    <p className={style.info}><b>{props.name}</b></p>
                    <p className={style.info}><b>{props.temp} °C</b></p>
                </div>
            </div>
            <p className={style.info}><b>Date: </b>{props.date}</p>
            <p className={style.info}><b>Weather state: </b>{props.weatherState}</p>
            <p className={style.info}><b>Max temperature: </b>{props.maxTemp} °C</p>
            <p className={style.info}><b>Min temperature: </b>{props.minTemp} °C</p>
            <p className={style.info}><b>Wind speed: </b>{props.wind} km/h</p>
        </div>
    )
};

export default InfoBlock;