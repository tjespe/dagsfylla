import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Bar } from 'grommet-icons';
import { Link, Route, Switch } from 'react-router-dom';

import * as Service from './service';

import ListView from './ListView';
import DetailView from './DetailView';
import getUserIfAbsent from '../../utils/getUserIfAbsent';

const AppBar = props => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: 'small', right: 'small', vertical: 'small' }}
        elevation="medium"
        style={{ zIndex: '1' }}
        {...props}
    />
);

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        let username = props.match.params.username;

        // Check if current user is already stored in local storage and get if it is not
        getUserIfAbsent(username).then(userRef =>
            Service.getEventsForUser(userRef).then(events => this.setState({ events }))
        );
    }

    state = {
        openNotification: false,
        events: [],
    };

    render() {
        let {
            match,
            match: { path, url },
        } = this.props;
        let { openNotification, events } = this.state;

        return (
            <Box fill>
                <AppBar>
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                        }}
                    >
                        <Heading level="3" margin="none">
                            Dagsfylla.no
                        </Heading>
                    </Link>
                    <Link
                        to={`${url}/create-event`}
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                        }}
                    >
                        <Heading level="4" margin="none">
                            Opprett arrangement
                        </Heading>
                    </Link>
                    <Button
                        icon={<Bar />}
                        onClick={() => {
                            this.setState({ openNotification: !openNotification });
                        }}
                    />
                </AppBar>
                <Switch>
                    <Route
                        exact
                        path={match.url}
                        render={props => <ListView {...props} openNotification={openNotification} events={events} />}
                    />
                    <Route path={`${path}/:id`} render={props => <DetailView {...props} events={events} />} />
                </Switch>
            </Box>
        );
    }
}

export default UserPage;
