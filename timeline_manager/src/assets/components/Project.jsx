import { Container, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import React, { useState, useEffect, useContext } from "react"
import Button from "react-bootstrap/Button"
import Navbar from "react-bootstrap/Navbar"
import MainBoard from "./MainBoard"
import { AuthContext } from "../../AuthContext"
import "./Project.css"
import { useNavigate } from "react-router-dom"

function Project() {
  const navigateHome = useNavigate()
  const navigatePersonalPJT = useNavigate()
  const { projectId } = useParams()

  const { token } = useContext(AuthContext)

  const [projectData, setProjectData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Add Member

  // const [showAddMemberModal, setShowAddMemberModal] = useState(false)

  // const handleShowAddMember = () => setShowAddMemberModal(true)
  // const handleCloseAddMember = () => setShowAddMemberModal(false)

  // const handleAddMemberSubmit = (memberData) => {
  //   console.log("Nuovo membro aggiunto:", memberData)
  //   handleCloseAddMember()
  // }

  useEffect(() => {
    if (!projectId || !token) return

    fetch(`http://localhost:3001/api/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.text()
          throw new Error(err || "Failed to fetch project data")
        }
        return res.json()
      })
      .then((data) => {
        setProjectData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [projectId, token])

  if (loading) return <p>Loading project...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <>
      <Navbar expand="lg" className="projectNavbar frosted-glass-project">
        {projectData && (
          <Navbar.Brand className="projectNavbarTitle mx-3">
            {projectData.projectName}
          </Navbar.Brand>
        )}
        <Container fluid className="d-flex justify-content-end">
          <div>
            <Button
              className="returnProjectButton me-2"
              onClick={() => {
                navigatePersonalPJT("/Projects")
              }}
            >
              <div className="d-flex flex-row">
                <p className="returnDetails m-0 me-2">Projects</p>
                <i className="returnIcon bi bi-arrow-return-left"></i>
              </div>
            </Button>
          </div>
          <div>
            <Button
              className="returnHomeButton"
              onClick={() => {
                navigateHome("/Home")
              }}
            >
              <div className="d-flex flex-row">
                <p className="returnDetails m-0 me-2">Hompage</p>
                <i className="returnIcon bi bi-arrow-return-left"></i>
              </div>
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container fluid className="mainBoardDiv d-flex justify-content-center">
        <MainBoard project={projectData} />
      </Container>
    </>
  )
}

export default Project
