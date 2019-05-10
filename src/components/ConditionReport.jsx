import React from 'react';
import moment from 'moment';
import "./styles/ConditionReport.scss";

// conditionColor: "Green"
// conditionDate: "2019-04-23 14:03:02"
// conditionDetails: "Dry"
// conditionImg: "https://cdn.apstatic.com/img/conditions/green.svg"
// conditionStatus: "All Clear"

import { ReactComponent as Green } from '../assets/green.svg';
import { ReactComponent as Yellow } from '../assets/yellow.svg';
import { ReactComponent as Red } from '../assets/red.svg';

const getImage = {
    "All Clear": <Green/>,
    "Minor Issues": <Yellow/>,
    "Bad / Closed": <Red />,
};

const ConditionReport = props => {
    const ConditionIcon = () => getImage[props.conditionStatus];

    return (
        <div className={'conditionReport'}>
            <ConditionIcon />
            <span>{props.conditionStatus}</span> -
            <span>{moment(props.conditionDate, 'YYYY-MM-DD HH:mm:ss').format('MMM D, YYYY')}</span> -
            <span>{props.conditionDetails}</span>
        </div>
    )
};

export default ConditionReport;
