import React, { useState } from 'react'
import { auth, db } from './firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, getDocs, doc, getDoc, query, where, updateDoc, deleteDoc } from 'firebase/firestore'

function App() {
    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    // -- FIRESTORE DATABASE -- (CRUD)
    // CREATE (C)
    function createPost() {
        const post = {
            title: 'Testing UID again',
            description: 'Hello Hello',
            uid: user.uid,
        }
        addDoc(collection(db, 'posts'), post)
    }

    // READ (R)
    async function getAllPosts() {
        const { docs } = await getDocs(collection(db, 'posts'))
        const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }))

        console.log(posts)
    }

    async function getPostById(id) {
        const Id = 'lF6iRm8S90iAc1GUiLbn'
        const postRef = doc(db, 'posts', id)
        const postSnap = await getDoc(postRef)
        return postSnap.data()
    }

    async function getPostByUid() {
        const postCollectionRef = await query(collection(db, 'posts'), where('uid', '==', '1'))
        const { docs } = await getDocs(postCollectionRef)

        console.log(docs.map((doc) => doc.data()))
    }

    // UPDATE (U)
    async function updatePost() {
        const Id = 'lF6iRm8S90iAc1GUiLbn'
        const postRef = doc(db, 'posts', Id)

        const post = await getPostById(Id)
        console.log(post)

        const newPost = {
            ...post,
            title: 'Land a $320k job',
        }
        console.log(newPost)
        updateDoc(postRef, newPost)
    }

    // DELETE (D)
    function deletePost() {
        const Id = 'XTdfiGQquSGt9c5fsHmG'
        const postRef = doc(db, 'posts', Id)
        deleteDoc(postRef)
    }

    // -- FIREBASE AUTH --
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(false)
            if (user) {
                setUser(user)
            }
        })
    })

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    function register() {
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then((user) => {
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
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
        setUser({})
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
                    {/* {loading ? 'loading...' : user?.email} */}
                    {user?.email}
                </div>

                <div className="row">
                    <h4>CRUD</h4>
                    <button onClick={createPost}>Create Post</button>
                    <button onClick={updatePost}>Update Post</button>
                    <button onClick={deletePost}>Delete Post</button>
                    <br />
                    <button onClick={getAllPosts}>Get All Posts</button>
                    <button onClick={getPostById}>Get Post by ID</button>
                    <button onClick={getPostByUid}>Get Post by UID</button>
                </div>
            </div>
        </div>
    )
}

export default App
