import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { Container } from "react-bootstrap"
import "./ContactUsPage.css"

function ContactUsPage() {
  return (
    <>
      <Form className="contactUsForm wrapper frosted-glass px-5 py-3 d-flex justify-content-center">
        <div className="d-flex flex-column">
          <div className="signUpFormWelcomeText align-content-center">
            <h3 className="text-center mb-3">
              Any questions or suggestions? <br />
              <strong className="boldText">Contatct us!</strong>
            </h3>
            <p>
              If you have any questions, feedback, or need assistance, feel free
              to reach out to us. We’re here to help and look forward to hearing
              from you. You can contact us via email, phone, or through our
              social media channels. Your feedback is important, and we aim to
              respond promptly to all inquiries.
            </p>
          </div>
          <div className="contactUsFormAuth d-flex flex-row">
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
                <Col className="mt-5" sm="12">
                  <Form.Group className="" controlId="">
                    <Form.Label column sm="3">
                      Text:
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Insert here your text here..."
                      rows={3}
                    />
                  </Form.Group>
                </Col>
              </Form.Group>
            </div>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
              <Container className="px-5">
                <div className="mb-4">
                  <div>
                    <h4 className="m-0">Contact</h4>
                  </div>
                  <div>
                    <p>info.timeline@clada.com</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div>
                    <h4 className="m-0">Based in</h4>
                  </div>
                  <div>
                    <p>
                      Piacenza, <br />
                      Italy
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div>
                    <h4 className="mb-3">Find us on Socials too!</h4>
                  </div>
                  <div className="d-flex justify-content-between">
                    <a href="*" className="socialIcon m-0 p-0">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="*" className="socialIcon m-0 p-0">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="*" className="socialIcon m-0 p-0">
                      <i className="bi bi-github"></i>
                    </a>
                    <a href="*" className="socialIcon m-0 p-0">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="*" className=" socialIcon m-0 p-0">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="*" className="socialIcon m-0 p-0">
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <div className="my-2 text-center d-flex flex-row justify-content-end align-items-center flex-grow-1">
            <div className="">
              <Button size="lg" className="custom-btn  ms-5 py-2">
                <p className="contactUsButton m-0">Submit</p>
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}

export default ContactUsPage
