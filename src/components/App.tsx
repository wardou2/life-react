import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Landing } from './Landing';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/life">Conway's Game of Life</Link>
                </nav>

                <Switch>
                    <Route path="/life">
                        <Landing />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
