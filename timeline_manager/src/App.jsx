import "./App.css"
import HomePage from "./assets/components/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Projects from "./assets/components/Projects"
import Project from "./assets/components/Project"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Project/:projectId" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
