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
  const { token } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const { projectId } = useParams()
  const navigateHome = useNavigate()
  const navigatePersonalPJT = useNavigate()

  const [projectData, setProjectData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])

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

  // funzione di SAVE da passare come prop a MainBoard

  function handleSaveProject(categories, tasks) {
    if (!Array.isArray(categories) || !Array.isArray(tasks)) {
      alert("Dati non caricati correttamente!")
      return
    }
    if (!projectData || !token) {
      alert("Project or token missing!")
      return
    }

    // payload

    const payload = {
      categories: categories.map((cat, catIdx) => ({
        categoryId: cat.categoryId,
        position: catIdx,
        tasks: tasks
          .filter(
            (task) =>
              task.categories &&
              task.categories.some((c) => c.categoryId === cat.categoryId)
          )
          .sort((a, b) => a.position - b.position)
          .map((task, tIdx) => ({
            taskId: task.taskId,
            position: tIdx,
          })),
      })),
    }

    fetch(`http://localhost:3001/api/projects/${projectData.projectId}/save`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Error has occured during saving operation.")
        alert("Project successfully saved!")
      })
      .catch((err) => alert(err.message))
  }

  if (loading) return <p>Loading project...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <>
      <Navbar expand="lg" className="projectNavbar frosted-glass-project">
        {projectData && (
          // <Navbar.Brand className="projectNavbarTitle mx-3">
          // </Navbar.Brand>
          <div className="d-flex flex-row align-items-baseline w-100">
            <p className="loggedText m-0 me-2">Logged as</p>
            <p className="loggedNickname m-0">{user.nickname} </p>{" "}
            <p className="loggedText m-0 mx-2"> PROJECT</p>
            <p className="projectNavbarTitle m-0">{projectData.projectName}</p>
          </div>
        )}
        <Container fluid className="d-flex justify-content-end">
          <div>
            <Button
              className="saveProjectButton me-2"
              onClick={() => handleSaveProject(categories, tasks)}
            >
              <div className="d-flex flex-row">
                <p className="saveDetails m-0 me-2">SAVE</p>
                <i className="saveIcon bi bi-bookmark-check"></i>
              </div>
            </Button>
          </div>
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
        <MainBoard
          project={projectData}
          categories={categories}
          setCategories={setCategories}
          tasks={tasks}
          setTasks={setTasks}
        />
      </Container>
    </>
  )
}

export default Project
