import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContetxt"; 
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const {currentUser, updateEmail, updatePassword} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value  !== confirmPasswordRef.current.value){
        return setError("Passwords do not match!!")
        }

        const promises = []
        setLoading(true)
        setError("")
        if(emailRef.current.value !== currentUser.email){
            console.log("ENTER HERE")
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
            navigate("/")
        }).catch((e)=>{
            setError(e?.message || "Failed to update account")
        }).finally(()=>{
            setLoading(false)
        })
    }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group >
            <Button disabled={loading} className="w-100" type="submit">
              UpdateProfile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}