import React from 'react';
import "./styles/TrailCard.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltUp, faLongArrowAltDown} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

import TrailRunnerIcon from '../../assets/trailrunicon.svg';
import MTBIcon from '../../assets/mtbicon.svg';
import HikingIcon from '../../assets/hikingicon.svg';
import Green from '../../assets/green.svg';
import Yellow from '../../assets/yellow.svg';
import Red from '../../assets/red.svg';

const getIcon = {
    "trailrun": TrailRunnerIcon,
    "mtb": MTBIcon,
    "hiking": HikingIcon,
};

const getCondition = {
    'All Clear': Green,
    'Minor Issues': Yellow,
    'Bad / Closed': Red,
};

const TrailCard = props => {
    return <div className="trailCard" onClick={() => props.setTrailView(props.trail)}>
        {props.trail.imgMedium && <img src={props.trail.imgMedium} alt={"Trail"}/>}
        <div>
            <img src={getIcon[props.trail.source]} alt={'source icon'} />
            <h2>{props.trail.name}</h2>
            <h3>{props.trail.location}, {props.trail.length}mi</h3>
            <p>
                <FontAwesomeIcon icon={faLongArrowAltUp}/> {props.trail.ascent}' up to {props.trail.high}'
            </p>
            <p>
                <FontAwesomeIcon icon={faLongArrowAltDown}/> {props.trail.descent}' down to {props.trail.low}'
            </p>
            <p>
                <img src={getCondition[props.trail.conditionStatus]} alt={'condition status'} /> - {props.trail.conditionStatus} -
                {moment(props.trail.conditionDate, 'YYYY-MM-DD HH:mm:ss').format('MMM D, YYYY')}
            </p>
            <a href={props.trail.url} target={"_blank"}>See Trail</a>
        </div>
    </div>
};

export default TrailCard;
