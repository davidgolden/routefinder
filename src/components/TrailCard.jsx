import React from 'react';
import "./styles/TrailCard.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltUp, faLongArrowAltDown} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

import { ReactComponent as TrailRunnerIcon } from '../assets/trailrunicon.svg';
import { ReactComponent as MTBIcon } from '../assets/mtbicon.svg';
import { ReactComponent as HikingIcon } from '../assets/hikingicon.svg';
import { ReactComponent as Green } from '../assets/green.svg';
import { ReactComponent as Yellow } from '../assets/yellow.svg';
import { ReactComponent as Red } from '../assets/red.svg';
import { ReactComponent as Unknown } from "../assets/empty.svg";

const getIcon = {
    "trailrun": <TrailRunnerIcon/>,
    "mtb": <MTBIcon />,
    "hiking": <HikingIcon />,
};

const getCondition = {
    'All Clear': <Green />,
    'Minor Issues': <Yellow />,
    'Bad / Closed': <Red />,
    'Unknown': <Unknown/>,
};

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
                <ConditionIcon /> - {props.trail.conditionStatus} -
                {moment(props.trail.conditionDate, 'YYYY-MM-DD HH:mm:ss').format('MMM D, YYYY')}
            </p>
            <a href={props.trail.url} target={"_blank"}>See Trail</a>
        </div>
    </div>
};

export default TrailCard;
