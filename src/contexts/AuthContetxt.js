import React, { useContext, useEffect, useState } from "react";
import firebaseApp from '../firebase'
export const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}
 
export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return firebaseApp.auth().signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return firebaseApp.auth().signOut()
    }
    function resetPassword(email){
        return firebaseApp.auth().sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    useEffect(()=>{
        const unsubscribe = firebaseApp.auth().onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [currentUser])
    
    const value = {currentUser, signup, login, logout, resetPassword, updateEmail, updatePassword}


    return(<div>
         <AuthContext.Provider value={value}>
            {!loading && children}
         </AuthContext.Provider>
    </div>)
}