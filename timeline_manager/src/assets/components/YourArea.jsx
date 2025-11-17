import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
// import { useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react"
import "./YourArea.css"

function YourArea() {
  // const [name, setName] = useState("")
  // const [surname, setSurname] = useState("")
  // const [nickname, setNickname] = useState("")
  // const [avatar, setAvatar] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)

  return (
    <>
      <Form className="updateForm wrapper frosted-glass px-5 py-3 d-flex justify-content-center">
        <div className="updateFormDiv d-flex flex-column">
          <div className="updateFormWelcomeText align-content-center">
            <h3 className="text-center m-0">
              Here you can <strong className="boldText">UPDATE</strong> your{" "}
              personal information!
            </h3>
          </div>
          <div className="updateFormAuth d-flex flex-row">
            <div className="updateStatus d-flex flex-column justify-content-center">
              <Form.Group className="" controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  Name:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Insert your Name here..."
                  />
                </Col>
                <Form.Label column sm="3">
                  Surname:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Insert your Surname here..."
                  />
                </Col>
                <Form.Label column sm="3">
                  Nickame:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Insert your Nickname here..."
                  />
                </Col>
                <Form.Label column sm="3">
                  AVATAR:
                </Form.Label>
                <Col sm="12">
                  <Form.Control
                    type="text"
                    placeholder="Insert your AVATAR here..."
                  />
                </Col>
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
                      placeholder="Choose a password..."
                      name="password"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      tooltip
                    ></Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Form.Group>
            </div>
            <div className="gifDiv d-flex justify-content-center align-items-center">
              <img
                className="gifImg"
                src="/gif/Typing_Animation.gif"
                alt="typingGif"
              />
            </div>
          </div>
          <div className="my-4 text-center d-flex justify-content-center align-items-center">
            <Button size="lg" className="custom-btn py-2">
              <p className="signUpButton m-0">Update</p>
            </Button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default YourArea
