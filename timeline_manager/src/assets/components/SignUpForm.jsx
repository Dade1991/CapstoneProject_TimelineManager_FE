import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./SignUpForm.css"

function SignUpForm() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [nickname, setNickname] = useState("")
  const [avatar, setAvatar] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const payload = { name, surname, nickname, avatar, email, password }

    fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        setLoading(false)
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("Error has occurred during retrieving info")
        }
      })
      .then((data) => {
        console.log(data)
        alert("Registration successful! You can now log in!")
        navigate("/home")
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="signUpForm wrapper frosted-glass px-5 py-3 d-flex justify-content-center"
      >
        <div className="signUpFormDiv d-flex flex-column">
          <div className="signUpFormWelcomeText align-content-center mb-3">
            <h3 className="text-center">
              Get ready with{" "}
              <strong className="boldText">Timeline Manager</strong>{" "}
              functionalities <br />
              and organize at best you Projects!
            </h3>
          </div>
          <div className="signUpFormAuth d-flex flex-row">
            <div className="signUpStatus d-flex flex-column justify-content-center">
              <Form.Group controlId="formName">
                <Form.Label column sm="3">
                  Name:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Insert your Name here..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="formSurname">
                <Form.Label column sm="3">
                  Surname:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Insert your Surname here..."
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="formNickname">
                <Form.Label column sm="3">
                  Nickame:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Insert your Nickname here..."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="formAvatar">
                <Form.Label column sm="3">
                  AVATAR:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Insert your AVATAR here..."
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label column sm="3">
                  E-mail:
                </Form.Label>
                <Col sm="12">
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Insert here your @email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label column sm="3">
                  Password:
                </Form.Label>
                <Col sm="12">
                  <InputGroup hasValidation>
                    <Form.Control
                      type="password"
                      placeholder="Choose a password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
            <div className="gifDiv d-flex justify-content-center align-items-center">
              <img
                className="gifImg"
                src="/gif/Compiler.gif"
                alt="compilerGif"
              />
            </div>
          </div>
          <div className="my-2 text-center d-flex flex-row justify-content-start align-items-center">
            <div className="d-flex flex-row align-items-center">
              <h3 className="signUpAdds m-0">
                You're ready to enjoy our <strong>COMMUNITY</strong>
              </h3>
              <div className="pt-1 d-flex flex-row">
                <i className="boldText bi bi-caret-right-fill ms-3"></i>
                <i className="boldText bi bi-caret-right ms-3"></i>
                <i className="boldText bi bi-caret-right-fill ms-3"></i>
              </div>
            </div>
            <div className="">
              <Button
                type="submit"
                size="lg"
                className="custom-btn ms-5 py-2"
                disabled={loading}
              >
                <p className="signUpButton m-0">
                  {loading ? "Submitting..." : "SUBMIT"}
                </p>
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}

export default SignUpForm
