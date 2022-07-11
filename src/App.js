import React, { useState } from 'react'
import { auth } from './firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

function App() {
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [user, setUser] = React.useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    // -- FIREBASE AUTH --
    function register() {
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then((user) => {
                console.log(user)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    function login() {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then(({ user }) => {
                console.log(user)
                setUser(user)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    function logout() {
        signOut(auth)
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <h4>REGISTER NEW</h4>
                    <form>
                        <input
                            type="email"
                            placeholder="Email..."
                            onChange={(event) => {
                                setRegisterEmail(event.target.value)
                            }}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password..."
                            onChange={(event) => {
                                setRegisterPassword(event.target.value)
                            }}
                        />
                    </form>
                    <button onClick={register}>Register</button>
                </div>

                <div className="row">
                    <h4>LOGIN EXISTING</h4>
                    <form>
                        <input
                            type="email"
                            placeholder="Email..."
                            onChange={(event) => {
                                setLoginEmail(event.target.value)
                            }}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password..."
                            onChange={(event) => {
                                setLoginPassword(event.target.value)
                            }}
                        />
                    </form>
                    <button onClick={login}>Login</button>
                    <button onClick={logout}>Logout</button>
                </div>

                <div className="row">
                    <h4>CURRENT USER</h4>
                    {user?.email}
                </div>
            </div>
        </div>
    )
}

export default App
