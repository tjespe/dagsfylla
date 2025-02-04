import React, { Component } from 'react';

import { StyledClock } from './style';
import differenceInSeconds from 'date-fns/difference_in_seconds';

const second = 1,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

class BigClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: differenceInSeconds(new Date(this.props.date), new Date()),
        };
    }

    componentDidMount() {
        let { date } = this.props;
        this.interval = setInterval(
            () =>
                this.setState({
                    seconds: differenceInSeconds(new Date(date), new Date()),
                }),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let distance = this.state.seconds;

        return (
            <StyledClock>
                <ul>
                    <li>
                        <span id="days">{Math.floor(distance / day)}</span>dager
                    </li>
                    <li>
                        <span id="hours">{Math.floor((distance % day) / hour)}</span>timer
                    </li>
                    <li>
                        <span id="minutes">{Math.floor((distance % hour) / minute)}</span>minutter
                    </li>
                    <li>
                        <span id="seconds">{Math.floor((distance % minute) / second)}</span>sekunder
                    </li>
                </ul>
            </StyledClock>
        );
    }
}

export default BigClock;
