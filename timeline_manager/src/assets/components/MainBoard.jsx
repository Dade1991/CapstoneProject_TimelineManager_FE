import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../AuthContext"
import TaskCard from "./TaskCard"
import "./MainBoard.css"

function MainBoard({ project }) {
  const { token } = useContext(AuthContext)

  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])

  const [showTaskModal, setShowTaskModal] = useState(false)
  const [taskCategoryId, setTaskCategoryId] = useState(null)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryColor, setNewCategoryColor] = useState("#ff0000ff")

  useEffect(() => {
    if (!token || !project) return

    fetch(
      `http://localhost:3001/api/categories?projectId=${project.projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error during Category loading.")
        return res.json()
      })
      .then((data) => {
        if (data.length === 0) {
          const defaultCategory = {
            categoryId: -1,
            categoryName: "Default",
            categoryColor: "#CCCCCC",
          }
          setCategories([defaultCategory])
        } else {
          setCategories(data)
        }
      })
      .catch(console.error)

    // Fetch task del progetto

    fetch(`http://localhost:3001/api/tasks/project/${project.projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error during Task loading.")
        return res.json()
      })
      .then((data) => setTasks(data))
      .catch(console.error)
  }, [token, project])

  // Apertura modale task

  function openTaskModal(categoryId) {
    setTaskCategoryId(categoryId)
    setNewTaskTitle("")
    setNewTaskDescription("")
    setShowTaskModal(true)
  }

  // Salvataggio nuova task

  function saveTask() {
    if (!newTaskTitle.trim()) {
      alert("Il titolo è obbligatorio")
      return
    }
    const payload = {
      taskTitle: newTaskTitle,
      taskDescription: newTaskDescription,
      categories: [{ categoryId: taskCategoryId }],
      projectId: project.projectId,
    }
    fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error during Task save.")
        return res.json()
      })
      .then((newTask) => {
        setTasks((old) => [...old, newTask])
        setShowTaskModal(false)
      })
      .catch((e) => alert(e.message))
  }

  // Apertura modale categoria

  function openCategoryModal() {
    setNewCategoryName("")
    setNewCategoryColor("#CCCCCC")
    setShowCategoryModal(true)
  }

  // Salvataggio nuova categoria

  function saveCategory() {
    if (!newCategoryName.trim()) {
      alert("Category name is mandatory!")
      return
    }
    const payload = {
      categoryName: newCategoryName,
      categoryColor: newCategoryColor,
      projectId: project.projectId,
    }
    fetch("http://localhost:3001/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error during Category save.")
        return res.json()
      })
      .then((newCat) => {
        setCategories((old) => [...old, newCat])
        setShowCategoryModal(false)
      })
      .catch((e) => alert(e.message))
  }

  return (
    <>
      <Container
        fluid
        className="mainBoard m-2 d-flex flex-row"
        style={{ overflowX: "auto", height: "85vh" }}
      >
        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="category-column"
            style={{
              margin: "0",
              minWidth: "250px",
              color: category.categoryColor || "#efefef",
              backgroundColor: "blue",
              borderRadius: "8px",
              padding: "10px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h5
              style={{
                color: category.categoryColor || "#000",
                textAlign: "center",
              }}
            >
              {category.categoryName}
            </h5>

            {tasks
              .filter((task) =>
                task.categories?.some(
                  (cat) => cat.categoryId === category.categoryId
                )
              )
              .map((task) => (
                <TaskCard key={task.taskId} task={task} />
              ))}

            <Button
              variant="outline-primary"
              onClick={() => openTaskModal(category.categoryId)}
              className="mt-2"
            >
              + Add Task
            </Button>
          </div>
        ))}
        <div style={{ alignSelf: "start", margin: "0 10px" }}>
          <Button variant="success" onClick={openCategoryModal}>
            + Add Category
          </Button>
        </div>
      </Container>

      {/* Modal nuova Task */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveTask}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Category Color</Form.Label>
            <Form.Control
              type="color"
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCategoryModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={saveCategory}>
            Save Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MainBoard
