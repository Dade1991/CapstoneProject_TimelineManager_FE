import { Container, Row, Col } from "react-bootstrap"
import SidebarBanner from "./SidebarBanner"

function HomePage() {
  return (
    <>
      <Container fluid className="bg-danger d-flex flex-row">
        <SidebarBanner />
        <Row className="bg-success vh-100 d-flex flex-row flex-grow-1">
          <Col lg={5} className="text-black bg-info ">
            <p>Porcoddio</p>
          </Col>
          <Col lg={7} className="text-black bg-info ">
            <p>Porcoddio</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
