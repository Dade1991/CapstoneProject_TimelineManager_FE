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

  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])

  const [showTaskCreateModal, setShowTaskCreateModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showTaskEditModal, setShowTaskEditModal] = useState(false)
  const [taskCategoryId, setTaskCategoryId] = useState(null)

  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [showCategoryUpdateModal, setShowCategoryUpdateModal] = useState(false)

  // Carica categorie e task per Id progetto

  useEffect(() => {
    console.log("Categories:", categories)
    console.log("Tasks:", tasks)
    console.log("Tasks details:", JSON.stringify(tasks, null, 2))
  }, [categories, tasks])

  useEffect(() => {
    if (!token || !project) return

    fetch(
      `http://localhost:3001/api/projects/${project.projectId}/categories`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error during Category loading.")
        return res.json()
      })
      .then((data) => {
        console.log("CARICAMENTO", data)

        if (data.length === 0) {
          const defaultCat = {
            categoryId: -1,
            categoryName: "Default",
            categoryColor: "#000000",
          }
          setCategories([defaultCat])
          setSelectedCategoryId(defaultCat.categoryId)
        } else {
          setCategories(data)
          setSelectedCategoryId(data[0].categoryId)
        }
      })
      .catch(console.error)
  }, [token, project])

  // ---------- TASK ----------

  // Fetch task del progetto

  useEffect(() => {
    if (!token || !project || selectedCategoryId === null) return

    fetch(
      `http://localhost:3001/api/projects/${project.projectId}/categories/${selectedCategoryId}/tasks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error during Task loading.")
        return res.json()
      })
      .then(setTasks)
      .catch(console.error)
  }, [token, project, selectedCategoryId])

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
    const catId = task.categories?.length ? task.categories[0].categoryId : null
    setTaskCategoryId(catId)
    setShowTaskEditModal(true)
  }

  function closeTaskEditModal() {
    setShowTaskEditModal(false)
    setTaskToEdit(null)
  }

  // Salvataggio nuova task

  function saveTask({ title, description, taskExpiryDate, priority }) {
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
      taskExpiryDate: taskExpiryDate || null,
      categoryIds: [taskCategoryId],
    }

    fetch(
      `http://localhost:3001/api/projects/${project.projectId}/categories/${taskCategoryId}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    )
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

  async function updateTask(taskData) {
    const taskId = taskData.taskId
    const categoryId = taskToEdit?.categories?.[0]?.categoryId

    if (!categoryId) {
      alert("Categoria non definita!")
      return
    }
    try {
      const res = await fetch(
        `http://localhost:3001/api/projects/${project.projectId}/categories/${taskCategoryId}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        }
      )
      if (!res.ok) throw new Error("Error during Task update.")
      const updatedTask = await res.json()
      setTasks((old) => old.map((t) => (t.taskId === taskId ? updatedTask : t)))
      closeTaskEditModal()
    } catch (e) {
      alert(e.message)
    }
  }

  // Delete task

  async function deleteTask(taskId, categoryId) {
    if (!window.confirm("Are you sure you want to delete this task?")) return

    if (!categoryId) {
      alert("Category ID undefined, cannot cancel task.")
      return
    }
    try {
      const res = await fetch(
        `http://localhost:3001/api/projects/${project.projectId}/categories/${categoryId}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error("Error deleting task.")
      setTasks((old) => old.filter((t) => t.taskId !== taskId))
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
      const res = await fetch(
        `http://localhost:3001/api/projects/${project.projectId}/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      )
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
        `http://localhost:3001/api/projects/${project.projectId}/categories/${categoryId}`,
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
        `http://localhost:3001/api/projects/${project.projectId}/categories/${categoryId}`,
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

  // ---------- STATUS ----------

  const handleStatusChange = async (taskId, newStatusId) => {
    if (!selectedCategoryId) {
      return
    }
    await fetch(
      `http://localhost:3001/api/projects/${project.projectId}/categories/${selectedCategoryId}/tasks/${taskId}/status/${newStatusId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statusId: newStatusId }),
      }
    )
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.taskId === taskId ? { ...task, statusId: newStatusId } : task
      )
    )
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
                  <p className="buttonDescription m-0 me-2">EDIT</p>
                  <Button
                    onClick={() => openCategoryUpdateModal(category)}
                    className="categoryEditButton"
                  >
                    <i className="categoryIcon bi bi-pencil-square"></i>
                  </Button>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <p className="buttonDescription m-0 me-2">DELETE</p>
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
                  onDelete={() =>
                    deleteTask(task.taskId, task.categories?.[0]?.categoryId)
                  }
                  onUpdate={() => openTaskEditModal(task)}
                  priorityStyles={priorityStyles}
                  onStatusChange={handleStatusChange}
                />
              ))}

            <Button
              className="addTaskButton mt-2"
              onClick={() => openTaskCreateModal(category.categoryId)}
            >
              <div className="d-flex flex-row justify-content-center align-items-center">
                <i className="plusButtonIconTask bi bi-plus-circle"></i>
                <p className="m-0 ms-2">Add Task</p>
              </div>
            </Button>
          </div>
        ))}

        <div className="addCategoryButtonDiv">
          <Button
            className="addCategoryButton ms-2 p-3"
            onClick={openCategoryModal}
          >
            <div className="d-flex flex-row justify-content-center align-items-center">
              <i className="plusButtonIconCategory bi bi-plus-circle"></i>
              <p className="m-0 ms-2">Add Category</p>
            </div>
          </Button>
        </div>
      </Container>

      <AddCategoryModal
        show={showCategoryModal}
        handleClose={closeCategoryModal}
        onSubmit={saveCategory}
      />

      <CategoryModalUpdate
        show={showCategoryUpdateModal}
        handleClose={closeCategoryUpdateModal}
        category={categoryToEdit}
        onSubmit={updateCategory}
      />

      <TaskModalForm
        show={showTaskCreateModal}
        handleClose={closeTaskCreateModal}
        onSubmit={saveTask}
      />

      <TaskModalUpdate
        show={showTaskEditModal}
        handleClose={closeTaskEditModal}
        task={taskToEdit}
        onSubmit={updateTask}
      />
    </>
  )
}

export default MainBoard
