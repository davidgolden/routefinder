import React from 'react';
import moment from 'moment';
import "./styles/ConditionReport.scss";

// conditionColor: "Green"
// conditionDate: "2019-04-23 14:03:02"
// conditionDetails: "Dry"
// conditionImg: "https://cdn.apstatic.com/img/conditions/green.svg"
// conditionStatus: "All Clear"

const ConditionReport = props => {
    return (
        <div className={'conditionReport'}>
            <img src={props.report.conditionImg} alt={'condition'} />
            <span>{props.report.conditionStatus}</span> -
            <span>{moment(props.report.conditionDate, 'YYYY-MM-DD HH:mm:ss').format('MMM D, YYYY')}</span> -
            <span>{props.report.conditionDetails}</span>
        </div>
    )
};

export default ConditionReport;
