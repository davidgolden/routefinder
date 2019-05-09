import React from 'react';
import "./styles/TrailCard.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltUp, faLongArrowAltDown, faStar} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

const TrailCard = props => {
    return <div className="trailCard">
        <img src={props.trail.imgMedium} alt={"Trail"}/>
        <div>
            <h2>{props.trail.name}</h2>
            <h3>{props.trail.location}, {props.trail.length}mi</h3>
            <h4>{props.trail.summary}</h4>
            <p>
                <FontAwesomeIcon icon={faLongArrowAltUp}/>{props.trail.ascent}' up to {props.trail.high}'
            </p>
            <p>
                <FontAwesomeIcon icon={faLongArrowAltDown}/>{props.trail.descent}' down to {props.trail.low}'
            </p>
            <p>
                {props.trail.stars} <FontAwesomeIcon icon={faStar}/> of {props.trail.starVotes} reviews
            </p>
            <p>
                {moment(props.trail.conditionDate, 'YYYY-MM-DD hh:MM:SS').format('MMM D, YYYY')} - {props.trail.conditionStatus}
            </p>
            <p>
                {props.trail.conditionDetails}
            </p>
            <a href={props.trail.url} target={"_blank"}>See Trail</a>
        </div>
    </div>
};

export default TrailCard;
