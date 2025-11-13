import { Container } from "react-bootstrap"
import "./HomeFooter.css"

function HomeFooter() {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <Container
        fluid
        className="footerBanner d-flex justify-content-center align-items-center text-center wrapper"
      >
        <p className="footerBannerText m-0 ">
          All right reserved to{" "}
          <strong className="specialFooter">Timeline</strong> &#174; Manager -{" "}
          <strong className="specialFooter">{currentYear}</strong>
        </p>
      </Container>
    </>
  )
}

export default HomeFooter
