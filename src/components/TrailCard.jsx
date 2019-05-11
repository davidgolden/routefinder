import React from 'react';
import "./styles/TrailCard.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltUp, faLongArrowAltDown} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import {getCondition, getIcon, getWebsite} from "./utils";

const TrailCard = props => {

    const SourceIcon = () => getIcon[props.trail.source];
    const ConditionIcon = () => getCondition[props.trail.conditionStatus];

    return <div className="trailCard" onClick={() => props.setTrailView(props.trail)}>
        {props.trail.imgMedium && <img src={props.trail.imgMedium} alt={"Trail"}/>}
        <div>
            <SourceIcon/>
            <h2>{props.trail.name}</h2>
            <h3>{props.trail.location}, {props.trail.length}mi</h3>
            <p>
                <FontAwesomeIcon icon={faLongArrowAltUp}/> {props.trail.ascent}' up to {props.trail.high}'
            </p>
            <p>
                <FontAwesomeIcon icon={faLongArrowAltDown}/> {props.trail.descent}' down to {props.trail.low}'
            </p>
            <p>
                <ConditionIcon /> {props.trail.conditionStatus} -
                {moment(props.trail.conditionDate, 'YYYY-MM-DD HH:mm:ss').format('MMM D, YYYY')}
            </p>
            <a href={props.trail.url} target={"_blank"}>See Trail on {getWebsite[props.trail.source]}</a>
        </div>
    </div>
};

export default TrailCard;
