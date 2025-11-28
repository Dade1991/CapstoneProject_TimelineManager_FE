import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import TaskCard from "./assets/components/TaskCard"

// ================== logica per DND: ricerca dentro l'array di categoryTasks per ricavare i taskId necessari per il DND ==================

function SortableTaskCard({ task, categoryId, ...props }) {
  if (!task) {
    console.error("SortableTaskCard: task è undefined")
    return null
  }
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.taskId,
      data: {
        type: "task",
        categoryId: categoryId,
      },
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} categoryId={categoryId} {...props} />
    </div>
  )
}

export default SortableTaskCard
