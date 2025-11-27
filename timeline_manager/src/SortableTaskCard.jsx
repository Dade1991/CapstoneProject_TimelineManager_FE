import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import TaskCard from "./assets/components/TaskCard"

// ================== logica per DND: ricerca dentro l'array di categoryTasks per ricavare i taskId necessari per il DND ==================

function SortableTaskCard(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.task.taskId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard {...props} />
    </div>
  )
}

export default SortableTaskCard
