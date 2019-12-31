import React from 'react'
import {Route,Redirect} from 'react-router-dom';
const AuthRoute =({component:Component,authenticate, ...rest}) =>(
        <Route {...rest} render={(props) => authenticate === true ? <Redirect to='/'/> : <Component {...props}/>
        }
        />
)

export default AuthRoute ;