import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../AuthContext"
import TaskCard from "./TaskCard"
import TaskModalForm from "./TaskModalForm"
import AddCategoryModal from "./AddCategoryModal"
import CategoryModalUpdate from "./CategoryModalUpdate"
import "./MainBoard.css"

function MainBoard({ project }) {
  const { token } = useContext(AuthContext)

  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])

  const [showTaskCreateModal, setShowTaskCreateModal] = useState(false)
  // const [showTaskUpdateModal, setShowTaskUpdateModal] = useState(false)
  // const [selectedTask, setSelectedTask] = useState(null)
  const [taskCategoryId, setTaskCategoryId] = useState(null)
  const [showCategoryUpdateModal, setShowCategoryUpdateModal] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  // const [newCategoryName, setNewCategoryName] = useState("")
  // const [newCategoryColor, setNewCategoryColor] = useState("#000000")

  // Carica categorie e task

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
      .then(setTasks)
      .catch(console.error)
  }, [token, project])

  // Apri modale creazione task e assegna categoria target

  function openTaskCreateModal(categoryId) {
    setTaskCategoryId(categoryId)
    setShowTaskCreateModal(true)
  }

  function closeTaskCreateModal() {
    setShowTaskCreateModal(false)
    setTaskCategoryId(null)
  }

  // Salvataggio nuova task

  function saveTask({ title, description, dueDate }) {
    if (!title.trim()) {
      alert("Task title is mandatory.")
      return
    }
    const payload = {
      taskTitle: title,
      taskDescription: description,
      dueDate,
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
        closeTaskCreateModal()
      })
      .catch((e) => alert(e.message))
  }

  // Apri modale categoria

  function openCategoryModal() {
    setShowCategoryModal(true)
  }

  function closeCategoryModal() {
    setShowCategoryModal(false)
  }

  // Salvataggio nuova categoria

  async function saveCategory({ categoryName, categoryColor }) {
    if (!categoryName.trim()) {
      alert("Category name is mandatory.")
      return
    }

    const payload = {
      categoryName,
      categoryColor,
      projectId: project.projectId,
    }

    try {
      const res = await fetch("http://localhost:3001/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Error during Category save.")
      const newCat = await res.json()
      setCategories((old) => [...old, newCat])
      closeCategoryModal()
    } catch (e) {
      alert(e.message)
    }
  }

  // Delete della categoria

  async function deleteCategory(categoryId) {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return

    try {
      const res = await fetch(
        `http://localhost:3001/api/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!res.ok) throw new Error("Error during Category delete.")
      // Rimuovi categoria dallo stato
      setCategories((old) => old.filter((cat) => cat.categoryId !== categoryId))
    } catch (e) {
      alert(e.message)
    }
  }

  // Apri modale update categoria

  function openCategoryUpdateModal(category) {
    setCategoryToEdit(category)
    setShowCategoryUpdateModal(true)
  }

  function closeCategoryUpdateModal() {
    setShowCategoryUpdateModal(false)
    setCategoryToEdit(null)
  }

  // Salvataggio update categoria

  async function updateCategory({ categoryId, categoryName, categoryColor }) {
    if (!categoryName.trim()) {
      alert("Category name is mandatory.")
      return
    }
    const payload = {
      categoryName,
      categoryColor,
      projectId: project.projectId,
    }
    try {
      const res = await fetch(
        `http://localhost:3001/api/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) throw new Error("Error during Category update.")
      const updatedCat = await res.json()
      setCategories((old) =>
        old.map((cat) => (cat.categoryId === categoryId ? updatedCat : cat))
      )
      closeCategoryUpdateModal()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <>
      <Container fluid className="mainBoard m-2 d-flex flex-row p-1">
        {categories.map((category) => (
          <div key={category.categoryId} className="category-column">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h4
                className="categoryTitle pe-4 m-0"
                style={{
                  color: category.categoryColor || "#0084ffff",
                }}
              >
                {category.categoryName}
              </h4>
              <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center justify-content-between mb-1">
                  <p className="categoryButtonDescription m-0 me-2">Edit</p>
                  <Button
                    onClick={() => openCategoryUpdateModal(category)}
                    className="categoryEditButton"
                  >
                    <i className="categoryIcon bi bi-pencil-square"></i>
                  </Button>
                  <CategoryModalUpdate
                    show={showCategoryUpdateModal}
                    handleClose={closeCategoryUpdateModal}
                    category={categoryToEdit}
                    onSubmit={updateCategory}
                  />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <p className="categoryButtonDescription m-0 me-2">Delete</p>
                  <Button
                    onClick={() => deleteCategory(category.categoryId)}
                    className="categoryDeleteButton"
                  >
                    <i className="categoryIcon bi bi-trash2-fill"></i>
                  </Button>
                </div>
              </div>
            </div>

            <hr />

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
              className="addTaskButton mt-2"
              onClick={() => openTaskCreateModal(category.categoryId)}
            >
              + Add Task
            </Button>
          </div>
        ))}

        <div className="addCategoryButtonDiv d-flex">
          <Button className="addCategoryButton" onClick={openCategoryModal}>
            + Add Category
          </Button>
        </div>
      </Container>
      <TaskModalForm
        show={showTaskCreateModal}
        handleClose={closeTaskCreateModal}
        onSubmit={saveTask}
      />

      {/* Modale nuova Categoria */}
      <AddCategoryModal
        show={showCategoryModal}
        handleClose={closeCategoryModal}
        onSubmit={({ categoryName, categoryColor }) => {
          saveCategory({ categoryName, categoryColor })
        }}
      />
    </>
  )
}

export default MainBoard
