import "./SidebarBanner.css"
import { Container } from "react-bootstrap"

function SidebarBanner() {
  const icons = [
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
    "iconDot bi bi-suit-diamond-fill",
  ]

  // Duplicazione delle icone per loop continuo
  const doubledIcons = [...icons, ...icons]
  return (
    <>
      <Container className="wrapper">
        <div className="sideBanner p-0 d-flex">
          <div className="sideBannerDots">
            <div className="scrollContent">
              {doubledIcons.map((iconClass, index) => (
                <i key={index} className={iconClass}></i>
              ))}
            </div>
          </div>
          <div className="titleContainer d-flex flex-column">
            <h1 className="sideBannerTitle">TIMELINE</h1>
            <h2 className="sideBannerUnderTitle">Manager</h2>
          </div>
          {/* <div className="sideBannerLogoDiv">
            <img
            className="sideBannerLogoImg"
            src="./images/TimelineLogo.png"
            alt="TimelineLogo"
          />
          </div> */}
        </div>
      </Container>
    </>
  )
}

export default SidebarBanner
