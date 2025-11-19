import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../AuthContext"
import TaskCard from "./TaskCard"
import TaskModalForm from "./TaskModalForm"
import AddCategoryModal from "./AddCategoryModal"
import CategoryModalUpdate from "./CategoryModalUpdate"
import TaskModalUpdate from "./TaskModalUpdate"
import "./MainBoard.css"

const priorityStyles = {
  VERY_LOW: {
    backgroundColor: "#d3f9d8",
    color: "#27632a",
    border: "2px solid #27632a",
  },
  LOW: {
    backgroundColor: "#e5f4ff",
    color: "#2a4d76",
    border: "2px solid #2a4d76",
  },
  MEDIUM: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    border: "2px solid #856404",
  },
  HIGH: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "2px solid #721c24",
  },
  CRITICAL: {
    backgroundColor: "#c82333",
    color: "white",
    border: "2px solid white",
  },
}

function MainBoard({ project }) {
  const { token } = useContext(AuthContext)

  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])

  const [showTaskCreateModal, setShowTaskCreateModal] = useState(false)
  const [taskCategoryId, setTaskCategoryId] = useState(null)

  const [showCategoryUpdateModal, setShowCategoryUpdateModal] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)

  const [showTaskEditModal, setShowTaskEditModal] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  // Carica categorie e task

  useEffect(() => {
    console.log("Categories:", categories)
    console.log("Tasks:", tasks)
    console.log("Tasks details:", JSON.stringify(tasks, null, 2))
  }, [categories, tasks])

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
          setCategories([
            {
              categoryId: -1,
              categoryName: "Default",
              categoryColor: "#CCCCCC",
            },
          ])
        } else {
          setCategories(data)
        }
      })
      .catch(console.error)

    // ---------- TASK ----------

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

  // Gestione modale creazione task

  function openTaskCreateModal(categoryId) {
    setTaskCategoryId(categoryId)
    setShowTaskCreateModal(true)
  }

  function closeTaskCreateModal() {
    setShowTaskCreateModal(false)
    setTaskCategoryId(null)
  }

  // Gestione modale edit task

  function openTaskEditModal(task) {
    setTaskToEdit(task)
    setShowTaskEditModal(true)
  }

  function closeTaskEditModal() {
    setShowTaskEditModal(false)
    setTaskToEdit(null)
  }

  // Salvataggio nuova task

  function saveTask({ title, description, dueDate, priority }) {
    console.log("Task Category ID:", taskCategoryId)
    console.log("Categories array:", [taskCategoryId])

    if (!priority) {
      alert("Task priority is mandatory.")
      return
    }
    if (!title.trim()) {
      alert("Task title is mandatory.")
      return
    }
    const payload = {
      taskTitle: title,
      taskDescription: description,
      taskPriority: priority,
      projectId: project.projectId,
      statusId: 1,
      taskExpiryDate: dueDate,
      categoryIds: [taskCategoryId],
    }

    console.log("Payload inviato:", JSON.stringify(payload, null, 2))

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

  // Modifica task esistente

  async function updateTask({
    taskId,
    title,
    description,
    dueDate,
    priority,
    categories,
  }) {
    if (!title.trim()) {
      alert("Task title is mandatory.")
      return
    }
    const payload = {
      taskTitle: title,
      taskDescription: description,
      dueDate,
      priority,
      categories,
      projectId: project.projectId,
    }
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Error during Task update.")
      const updatedTask = await res.json()
      setTasks((old) => old.map((t) => (t.taskId === taskId ? updatedTask : t)))
      closeTaskEditModal()
    } catch (e) {
      alert(e.message)
    }
  }

  // Delete task

  async function deleteTask(taskId) {
    if (!window.confirm("Are you sure you want to delete this task?")) return
    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Error deleting task.")
      setTasks((old) => old.filter((t) => t.taskId !== taskId))
    } catch (e) {
      alert(e.message)
    }
  }

  // Toggle completamento task

  async function toggleCompleteTask(task) {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    }
    try {
      const res = await fetch(
        `http://localhost:3001/api/tasks/${task.taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTask),
        }
      )
      if (!res.ok) throw new Error("Error updating task completion.")
      const data = await res.json()
      setTasks((old) => old.map((t) => (t.taskId === task.taskId ? data : t)))
    } catch (e) {
      alert(e.message)
    }
  }

  // ---------- CATEGORY ----------

  // Apri modale nuova categoria

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

  // Apertura e chiusura modale update categoria

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

  return (
    <>
      <Container fluid className="mainBoard m-2 d-flex flex-row py-4">
        {categories.map((category) => (
          <div key={category.categoryId} className="category-column">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h4
                className="categoryTitle pe-4 m-0"
                style={{
                  color: category.categoryColor || "#000000",
                  textShadow: `2px 2px 6px ${category.categoryColor}90`,
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

            <hr className="brInterruption my-3" />

            {tasks
              .filter((task) =>
                task.categories?.some(
                  (cat) => cat.categoryId === category.categoryId
                )
              )
              .map((task) => (
                <TaskCard
                  key={task.taskId}
                  task={task}
                  onDelete={() => deleteTask(task.taskId)}
                  onUpdate={() => openTaskEditModal(task)}
                  onToggleComplete={() => toggleCompleteTask(task)}
                  priorityStyles={priorityStyles}
                />
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
          <Button
            className="addCategoryButton ms-2 p-3"
            onClick={openCategoryModal}
          >
            + Add Category
          </Button>
        </div>
      </Container>

      <CategoryModalUpdate
        show={showCategoryUpdateModal}
        handleClose={closeCategoryUpdateModal}
        category={categoryToEdit}
        onSubmit={updateCategory}
      />

      <TaskModalUpdate
        show={showTaskEditModal}
        handleClose={closeTaskEditModal}
        task={taskToEdit}
        onSubmit={updateTask}
      />

      <TaskModalForm
        show={showTaskCreateModal}
        handleClose={closeTaskCreateModal}
        onSubmit={saveTask}
      />

      <AddCategoryModal
        show={showCategoryModal}
        handleClose={closeCategoryModal}
        onSubmit={saveCategory}
      />
    </>
  )
}

export default MainBoard
