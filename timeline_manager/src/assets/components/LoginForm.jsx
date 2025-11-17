import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { AuthContext } from "../../AuthContext"
import { useContext } from "react"
import "./LoginForm.css"

function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const { setToken } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const body = await res.json()
        console.log("Risposta completa dal backend:", body)
        if (!res.ok) {
          throw new Error(body.message || "Errore login")
        }
        return body
      })
      .then((data) => {
        console.log(data.accessToken)
        setToken(data.accessToken)
        localStorage.setItem("token", data.accessToken)
        navigate("/home")
      })
      .catch((err) => {
        console.error("Login error:", err)
        setError(err.message)
      })
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="loginForm wrapper frosted-glass px-5 py-5 d-flex justify-content-center"
      >
        <div className="loginFormDiv d-flex flex-column">
          <div className="loginFormWelcomeText align-content-center">
            <h3 className="text-center">
              Welcome back, ready to timemanage your activities?
            </h3>
            <div className="gifDiv m-0 p-0">
              <img
                className="checkGif m-0 p-0"
                src="/gif/Check_Animation.gif"
                alt="checkAnimation"
              />
            </div>
          </div>
          <div className="loginFormAuth d-flex flex-column justify-content-center">
            <Form.Group className="" controlId="formPlaintextEmail">
              <Form.Label column sm="3">
                E-mail:
              </Form.Label>
              <Col sm="12">
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Insert here your @email..."
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                  ></Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                Password:
              </Form.Label>
              <Col sm="12">
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Insert here your password..."
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                  ></Form.Control.Feedback>
                </InputGroup>
                <div className="d-flex justify-content-center align-items-center">
                  <Button type="submit" size="lg" className="custom-btn mt-5">
                    <p className="submitButton m-0">Submit</p>
                  </Button>
                </div>
              </Col>
            </Form.Group>
            {error && <p className="text-danger text-center">{error}</p>}
          </div>
          <div className="my-5 text-center">
            <h3 className="signUpAdds">
              If your not yet registered to our webiste, click the following
              link: it's free!😉
            </h3>
            <Button
              onClick={() => {
                navigate("/SignUpForm")
              }}
              size="lg"
              className="custom-btn mt-5"
            >
              <p className="signUpButton m-0">Sign-up!</p>
            </Button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default LoginForm
