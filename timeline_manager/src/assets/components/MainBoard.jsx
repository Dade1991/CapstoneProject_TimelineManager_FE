import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../AuthContext"
// --------------------------------------
import {
  DndContext,
  useSensor,
  PointerSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
// --------------------------------------
import TaskModalForm from "./TaskModalForm"
import AddCategoryModal from "./AddCategoryModal"
import CategoryModalUpdate from "./CategoryModalUpdate"
import TaskModalUpdate from "./TaskModalUpdate"
import SortableTaskCard from "../../SortableTaskCard"
import "./MainBoard.css"
import "./DND.css"

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
    backgroundColor: "#c50619ff",
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

  // ==================================== logica per DND ====================================

  // setup DND Kit sensor

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const [activeId, setActiveId] = useState(null)

  //  ---------------------------------------------------------------------------------------

  // UX DND-Kit updgrade

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  function findTaskById(id) {
    for (const category of categories) {
      const tasks = categoryTasks[category.categoryId] || []
      const found = tasks.find((t) => t.taskId === id)
      if (found) return found
    }
    return null
  }

  // Aiuto: trova categoria task per id

  function findCategoryIdOfTask(taskId) {
    // gestisce placeholder come <empty-categoryId>

    if (typeof taskId === "string" && taskId.startsWith("empty-")) {
      const catId = parseInt(taskId.replace("empty-", ""), 10)
      return !isNaN(catId) ? catId : null
    }

    for (const category of categories) {
      const tasks = categoryTasks[category.categoryId] || []
      if (tasks.some((t) => t.taskId === taskId)) return category.categoryId
    }
    return null
  }
  //  ---------------------------------------------------------------------------------------

  // FUNZIONE DI DRAG: FONDAMENTALE PER LA RIUSCITA CORRETTA DEL D&D TRA TASK DI UNA CATEGORIA E CATEGORIE VUOTE

  function EmptyDropZone({ categoryId }) {
    const { setNodeRef, isOver } = useDroppable({
      id: `empty-${categoryId}`,
      data: {
        type: "category-drop",
        categoryId: categoryId,
      },
    })

    return (
      <div
        ref={setNodeRef}
        className={`emptyDrop d-flex justify-content-center align-items-center p-4 ${
          isOver ? "emptyDropOver" : "emptyDropInactive"
        }`}
      >
        <div className="text-center">
          <i className="dropTaskBoxIcon bi bi-plus-circle-dotted"></i>
          <div className="dropTaskBox">Drop tasks HERE !</div>
        </div>
      </div>
    )
  }

  //  ---------------------------------------------------------------------------------------

  // FUNZIONE DI DRAG: FONDAMENTALE PER LA RIUSCITA CORRETTA DEL D&D TRA TASK DI UNA CATEGORIA E TRA TASK TRA CATEGORIE

  function handleDragOver(event) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeCategoryId = findCategoryIdOfTask(activeId)
    const overCategoryId = findCategoryIdOfTask(overId)

    // se mancano categorie o ci si trova nella stessa categoria, animazione interna

    if (
      !activeCategoryId ||
      !overCategoryId ||
      activeCategoryId === overCategoryId
    ) {
      return
    }

    // anteprima spostamento tra colonne (solo stato frontend, niente API Calls)

    setCategoryTasks((prev) => {
      const sourceTasks = [...(prev[activeCategoryId] || [])]
      const targetTasks = [...(prev[overCategoryId] || [])]

      const activeIndex = sourceTasks.findIndex((t) => t.taskId === activeId)
      if (activeIndex === -1) return prev

      const [movingTask] = sourceTasks.splice(activeIndex, 1)

      // posizione nella colonna target

      const overIndex = targetTasks.findIndex((t) => t.taskId === overId)
      if (overIndex === -1) {
        targetTasks.push(movingTask)
      } else {
        targetTasks.splice(overIndex, 0, movingTask)
      }

      return {
        ...prev,
        [activeCategoryId]: sourceTasks,
        [overCategoryId]: targetTasks,
      }
    })
  }

  async function handleDragEnd(event) {
    const { active, over } = event
    if (!over) {
      return
    }

    const activeId = active.id
    const overIdRaw = over.id

    // categoria di ARRIVO: dove sto droppando

    const overCategoryId =
      over.data?.current?.categoryId != null
        ? over.data.current.categoryId
        : null

    // categoria vista da dnd-kit al momento del drop (già aggiornata da handleDragOver)

    const currentCategoryIdFromState = findCategoryIdOfTask(activeId)

    const originalCategoryIdFromTask =
      findTaskById(activeId)?.categories?.[0]?.categoryId ?? null

    // categoria ORIGINALE: da dove è partita la task

    const activeCategoryId =
      originalCategoryIdFromTask &&
      originalCategoryIdFromTask !== overCategoryId
        ? originalCategoryIdFromTask
        : currentCategoryIdFromState

    setActiveId(null)

    if (!activeCategoryId || !overCategoryId) {
      return
    }

    // STESSO CONTAINER: solo riordino

    if (activeCategoryId === overCategoryId) {
      const taskIds = (categoryTasks[activeCategoryId] || []).map(
        (t) => t.taskId
      )
      const newIndex = taskIds.indexOf(
        typeof overIdRaw === "string" && overIdRaw.startsWith("empty-")
          ? activeId
          : overIdRaw
      )
      const oldIndex = taskIds.indexOf(activeId)
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return
      }

      const newTaskIds = arrayMove(taskIds, oldIndex, newIndex)
      const newTasksOrder = newTaskIds.map((id) =>
        categoryTasks[activeCategoryId].find((t) => t.taskId === id)
      )

      setCategoryTasks((prev) => ({
        ...prev,
        [activeCategoryId]: newTasksOrder,
      }))

      await updateTaskOrder(activeCategoryId, newTaskIds)
      return
    }

    try {
      // PRIMA: aggiorna categoria backend

      await updateTaskCategory(activeId, overCategoryId)

      // DOPO: ricarica entrambe le categorie

      await Promise.all([
        reloadCategoryTasks(activeCategoryId),
        reloadCategoryTasks(overCategoryId),
      ])
    } catch (error) {
      await Promise.all([
        reloadCategoryTasks(activeCategoryId),
        reloadCategoryTasks(overCategoryId),
      ])

      alert(`Drag failed: ${error.message}.`)
    }
  }

  // FETCH DND - funzione che chiamerà API per aggiornare ordine task

  async function updateTaskOrder(categoryId, orderedTaskIds) {
    try {
      const res = await fetch(
        `http://localhost:3001/api/projects/${project.projectId}/categories/${categoryId}/tasks/dnd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderedTaskIds }),
        }
      )
      if (!res.ok) throw new Error("Error updating task order.")
    } catch (e) {
      alert(e.message)
    }
  }

  // FETCH DND - funzione che chiamerà API per aggiornare category

  async function updateTaskCategory(taskId, newCategoryId) {
    const url = `http://localhost:3001/api/projects/${project.projectId}/tasks/${taskId}/category/${newCategoryId}`

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`PATCH ${res.status}: ${errText || "Unknown error"}`)
    }
    return
  }

  // ==================================== FINE - DND ====================================

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
        if (data.length === 0) {
          const defaultCat = {
            categoryId: -1,
            categoryName: "Default",
            categoryColor: "#FFC733",
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
    return fetch(
      `http://localhost:3001/api/projects/${project.projectId}/categories/${categoryId}/tasks`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        if (!res.ok) throw new Error("GET tasks failed")
        return res.json()
      })
      .then((tasks) => {
        setCategoryTasks((prev) => ({
          ...prev,
          [categoryId]: tasks,
        }))
        return tasks
      })
      .catch((err) => {
        throw err
      })
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

  // ---------- COMPLETION/RE-OPEN TASK----------

  // flag di completamento task

  async function completeTask(categoryId, taskId) {
    try {
      const res = await fetch(
        `http://localhost:3001/api/projects/${project.projectId}/tasks/${taskId}/complete`,
        {
          method: `POST`,
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error("Error completing task.")
      await res.json()
      reloadCategoryTasks(categoryId)
    } catch (e) {
      alert(e.message)
    }
  }

  // riapertura task

  async function reopenTask(categoryId, taskId) {
    try {
      const res = await fetch(
        `http://localhost:3001/api/projects/${project.projectId}/tasks/${taskId}/reopening`,
        {
          method: `PATCH`,
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error("Error during task reopening.")
      await res.json()
      reloadCategoryTasks(categoryId)
    } catch (e) {
      alert(e.message)
    }
  }

  // ---------- STATUS ----------

  const handleStatusChange = async (taskId, newStatusId, categoryId) => {
    if (!categoryId) {
      console.warn("Missing categoryId for status change", {
        taskId,
        newStatusId,
      })
      return
    }
    await fetch(
      `http://localhost:3001/api/projects/${project.projectId}/tasks/${taskId}/statusUpdate/${newStatusId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    reloadCategoryTasks(selectedCategoryId)
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        collisionDetection={closestCenter}
      >
        <Container fluid className="mainBoard m-2 d-flex flex-row py-4">
          {categories.map((category) => {
            const tasks = categoryTasks[category.categoryId] || []
            const taskIds = tasks.map((t) => t.taskId)

            return (
              <div
                key={category.categoryId}
                className="category-column p-3"
                data-category-id={category.categoryId}
              >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h4
                    className="categoryTitle pe-4 m-0"
                    style={{
                      color: category.categoryColor || "#FFC733",
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

                <SortableContext
                  items={
                    taskIds.length > 0
                      ? taskIds
                      : [`empty-${category.categoryId}`]
                  }
                  strategy={verticalListSortingStrategy}
                >
                  {tasks.map((task) => (
                    <SortableTaskCard
                      className={`task-card-wrapper ${
                        activeId === task.taskId ? "dragging" : ""
                      }`}
                      key={task.taskId}
                      task={task}
                      categoryId={category.categoryId}
                      priorityStyles={priorityStyles}
                      onDelete={() =>
                        deleteTask(
                          task.taskId,
                          task.categories?.[0]?.categoryId
                        )
                      }
                      onUpdate={() => openTaskEditModal(task)}
                      onStatusChange={(taskId, newStatusId) =>
                        handleStatusChange(
                          taskId,
                          newStatusId,
                          category.categoryId
                        )
                      }
                      onComplete={(taskId) =>
                        completeTask(category.categoryId, taskId)
                      }
                      onReopen={(taskId) =>
                        reopenTask(category.categoryId, taskId)
                      }
                    />
                  ))}

                  {/* quando una category rimane vuota, crea un box per il DND delle tasks */}

                  {tasks.length === 0 && (
                    <EmptyDropZone categoryId={category.categoryId} />
                  )}
                </SortableContext>

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

        <DragOverlay>
          {activeId ? (
            <div className="dragOverlayWrapper">
              <SortableTaskCard
                task={findTaskById(activeId)}
                priorityStyles={priorityStyles}
                className="dragOverlayCard"
                onDelete={() => {}}
                onUpdate={() => {}}
                onStatusChange={() => {}}
                onComplete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>

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
      </DndContext>
    </>
  )
}

export default MainBoard
