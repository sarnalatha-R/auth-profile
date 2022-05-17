import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContetxt";


export default function PrivateRoute({component: Component, ...rest}) {
 
  const {currentUser} = useAuth()
//   return (
//         <Route
//             {...rest}
//             render={props=>{
                return currentUser? <Component {...rest}/> : <Navigate to="/login"/>
        //     }}>
        // </Route>
    
//   );
} 