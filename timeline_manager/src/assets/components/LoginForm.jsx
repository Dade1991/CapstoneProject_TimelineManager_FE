import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import "./LoginForm.css"

function LoginForm() {
  return (
    <>
      <Form className="loginForm px-5 py-3 d-flex justify-content-center">
        <div className="loginFormDiv d-flex flex-column">
          <div className="loginFormWelcomeText align-content-center">
            <h3 className="text-center">
              Welcome back, ready to timemanage your activities?
            </h3>
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
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                  ></Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Form.Group>
          </div>
          <div className="my-5 text-center">
            <h3 className="signUpAdds">
              If your not yet registered to our webiste, click the following
              link: it's free!😉
            </h3>
            <Button size="lg" className="mt-5">
              <p className="signUpButton m-0">Sign-up!</p>
            </Button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default LoginForm
