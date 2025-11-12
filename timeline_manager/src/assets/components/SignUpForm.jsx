import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import "./SignUpForm.css"

function SignUpForm() {
  return (
    <>
      <Form className="signUpForm wrapper px-5 py-3 d-flex justify-content-center">
        <div className="signUpFormDiv d-flex flex-column">
          <div className="signUpFormWelcomeText align-content-center mb-3">
            <h3 className="text-center">
              Get ready with <strong>Timeline Manager</strong> functionalities{" "}
              <br />
              and organize at best you Projects!
            </h3>
          </div>
          <div className="signUpFormAuth d-flex flex-row">
            <div className="d-flex flex-column justify-content-center flex-grow-1">
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
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
              <p>IMG/GIF</p>
            </div>
          </div>
          <div className="my-2 text-center d-flex flex-row justify-content-around align-items-center">
            <div className="d-flex flex-row align-items-center">
              <h3 className="signUpAdds m-0">
                You're ready to enjoy our <strong>COMMUNITY</strong>
              </h3>
              <div className="pt-1 d-flex flex-row">
                <i className="bi bi-caret-right-fill ms-3"></i>
                <i className="bi bi-caret-right ms-3"></i>
                <i className="bi bi-caret-right-fill ms-3"></i>
              </div>
            </div>
            <div className="">
              <Button size="lg" className="ms-5 py-2">
                <p className="signUpButton m-0">Sign-up!</p>
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}

export default SignUpForm
