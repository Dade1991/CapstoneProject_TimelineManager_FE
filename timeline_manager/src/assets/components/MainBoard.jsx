import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../AuthContext"
import TaskCard from "./TaskCard"
import TaskModalForm from "./TaskModalForm"
import AddCategoryModal from "./AddCategoryModal"
import CategoryModalUpdate from "./CategoryModalUpdate"
import TaskModalUpdate from "./TaskModalUpdate"
import "./MainBoard.css"

// colori per pills status

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

function MainBoard({ project, categories, setCategories }) {
  const { token } = useContext(AuthContext)

  const [categoryTasks, setCategoryTasks] = useState({})
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [showTaskCreateModal, setShowTaskCreateModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showTaskEditModal, setShowTaskEditModal] = useState(false)
  const [taskCategoryId, setTaskCategoryId] = useState(null)
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [showCategoryUpdateModal, setShowCategoryUpdateModal] = useState(false)

  // render all'avvio con categoria vuota di "default" o pre-esistenti

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
        console.log("LOADING", data)

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

          // rederizza tasks preesistenti all'avvio del progetto per categoria

          data.forEach((cat) => {
            fetch(
              `http://localhost:3001/api/projects/${project.projectId}/categories/${cat.categoryId}/tasks`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
              .then((res) => res.json())
              .then((tasks) =>
                setCategoryTasks((prev) => ({
                  ...prev,
                  [cat.categoryId]: tasks,
                }))
              )
              .catch(console.error)
          })
        }
      })
      .catch(console.error)
  }, [token, project, setCategories])

  // ---------- TASK ----------

  // gestione modale creazione task

  function openTaskCreateModal(categoryId) {
    setTaskCategoryId(categoryId)
    setShowTaskCreateModal(true)
  }

  function closeTaskCreateModal() {
    setShowTaskCreateModal(false)
    setTaskCategoryId(null)
  }

  // gestione modale edit task

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

  // ========== HELPER x TASK ==========

  // ricarica solo i tasks di una categoria (dopo update/creazione)

  function reloadCategoryTasks(categoryId) {
    fetch(
      `http://localhost:3001/api/projects/${project.projectId}/categories/${categoryId}/tasks`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then((tasks) =>
        setCategoryTasks((prev) => ({
          ...prev,
          [categoryId]: tasks,
        }))
      )
      .catch(console.error)
  }

  // salvataggio nuova task

  function saveTask({ title, description, taskExpiryDate, priority }) {
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
      .then(() => {
        reloadCategoryTasks(taskCategoryId)
        closeTaskCreateModal()
      })
      .catch((e) => alert(e.message))
  }

  // modifica task esistente

  async function updateTask(taskData) {
    const taskId = taskData.taskId
    const categoryId = taskToEdit?.categories?.[0]?.categoryId

    if (!categoryId) {
      alert("Category undefined!")
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
      await res.json()
      reloadCategoryTasks(taskCategoryId)
      closeTaskEditModal()
    } catch (e) {
      alert(e.message)
    }
  }

  // delete task

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
      reloadCategoryTasks(categoryId)
    } catch (e) {
      alert(e.message)
    }
  }

  // ---------- CATEGORY ----------

  // getione modale nuova categoria

  function openCategoryModal() {
    setShowCategoryModal(true)
  }

  function closeCategoryModal() {
    setShowCategoryModal(false)
  }

  //gestione modale update categoria

  function openCategoryUpdateModal(category) {
    setCategoryToEdit(category)
    setShowCategoryUpdateModal(true)
  }
  function closeCategoryUpdateModal() {
    setShowCategoryUpdateModal(false)
    setCategoryToEdit(null)
  }

  // salvataggio nuova categoria

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
      reloadCategoryTasks(newCat.categoryId)
      closeCategoryModal()
    } catch (e) {
      alert(e.message)
    }
  }

  // salvataggio update categoria

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

  // delete della categoria

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
    reloadCategoryTasks(selectedCategoryId)
  }

  return (
    <>
      <Container fluid className="mainBoard m-2 d-flex flex-row py-4">
        {categories.map((category) => {
          const tasks = categoryTasks[category.categoryId] || []

          return (
            <div key={category.categoryId} className="category-column">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <h4
                  className="categoryTitle pe-4 m-0"
                  style={{
                    color: category.categoryColor || "#000000",
                    textShadow: `2px 2px 6px #000000`,
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

              <div
                className="colorCODING my-4"
                style={{
                  backgroundColor: category.categoryColor,
                  boxShadow: `2px 2px 6px #000000`,
                }}
              ></div>

              {/* <hr className="brInterruption my-3" /> */}

              {tasks.map((task) => (
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
          )
        })}
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
