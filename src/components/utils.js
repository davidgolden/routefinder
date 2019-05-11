import {ReactComponent as TrailRunnerIcon} from '../assets/trailrunicon.svg';
import {ReactComponent as MTBIcon} from '../assets/mtbicon.svg';
import {ReactComponent as HikingIcon} from '../assets/hikingicon.svg';
import {ReactComponent as Green} from '../assets/green.svg';
import {ReactComponent as Yellow} from '../assets/yellow.svg';
import {ReactComponent as Red} from '../assets/red.svg';
import {ReactComponent as Unknown} from "../assets/empty.svg";
import React from "react";

export const getIcon = {
    "trailrun": <TrailRunnerIcon/>,
    "mtb": <MTBIcon/>,
    "hiking": <HikingIcon/>,
};

export const getCondition = {
    'All Clear': <Green/>,
    'Minor Issues': <Yellow/>,
    'Bad / Closed': <Red/>,
    'Unknown': <Unknown/>,
};

export const getWebsite = {
    "trailrun": 'TrailRunProject.com',
    'mtb': 'MTBProject.com',
    'hiking': 'HikingProject.com',
};
