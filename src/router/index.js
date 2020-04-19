import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes';

const Root = () => (
            <Switch>
            {routes.map(i => ( <Route exact={i.exact} key={i.path} path={i.path} component={i.component} />))}
            </Switch>
)


export default Root
