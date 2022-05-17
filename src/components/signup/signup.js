import React, { useContext, useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContetxt"; 

import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../../contexts/AuthContetxt";
// import { AuthProvider } from "../../contexts/AuthContetxt";

export default function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const auth = useContext(AuthContext)
  const {signup} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  console.log("ENTER HERE")
  console.log({auth})


  async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value  !== confirmPasswordRef.current.value){
      return setError("Passwords do not match!!")
    }

    try{
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    }
    catch(e){
      setError(e?.message|| "Failed to create an account!!")

    }
    setLoading(false)

  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                required
              ></Form.Control>
            </Form.Group >
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}