import React from 'react';
import moment from 'moment';
import "./styles/ConditionReport.scss";
import {getCondition} from "./utils";

const ConditionReport = props => {
    const ConditionIcon = () => getCondition[props.conditionStatus];

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
