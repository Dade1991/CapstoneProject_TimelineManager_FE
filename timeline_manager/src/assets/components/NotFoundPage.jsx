import { Container, Row, Col } from "react-bootstrap"
import "./NotFoundPage.css"

function NotFoundPage() {
  return (
    <>
      <Container className="wrapper">
        <Row className="notFoundBanner">
          <Col
            className="d-flex justify-content-center align-items-center text-center "
            lg={3}
          >
            <div className="notFoundDiv">
              <img
                className="notFoundImg"
                src="/gif/Payment_Failed.gif"
                alt=""
              />
            </div>
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            lg={9}
          >
            <div className="">
              <h4 className="notFoundText m-0 text-center">
                Oops! <br /> You’ve hit a 404 bug!
              </h4>
              <div className="mt-4 text-center">
                <i className="notFoundBug bi bi-bug"></i>
              </div>
              <p className="notFoundJoke fst-italic text-center mt-4">
                "Code not found... Maybe it never existed?"
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NotFoundPage
