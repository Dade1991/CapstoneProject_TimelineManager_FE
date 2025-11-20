import { Container } from "react-bootstrap"
import "./HowItWorksPage.css"

function HowItWorksPage() {
  return (
    <>
      <Container
        fluid
        className="howItWorksMenuCard wrapper frosted-glass d-flex flex-column justify-content-center py-5 px-4"
      >
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <div className="textDocumentationWelcomeText">
            <h3 className="welcomeText text-center">
              A brief explanation on how <br />
              <strong className="welcomeBoldText">Timeline Manager</strong>{" "}
              works!
            </h3>
          </div>
        </div>
        <hr className="brInterruptionBIG my-4" />
        <div className="flex-grow-1">
          <p className="textDocumentation mb-2">
            Timeline Management is a smart app designed to help individuals,
            teams, and organizations plan, coordinate, and oversee projects
            efficiently. It provides a clear visual timeline where tasks,
            deadlines, and milestones are easily managed in one place. Ideal for
            managers, freelancers, and teams aiming to boost productivity.
          </p>
          <p className="textDocumentation mb-2">
            Inspired by Kanban tools like Trello, it focuses on smooth task and
            time management. Key features include:
          </p>
          <ul className="textDocumentationList">
            <li>
              <strong className="boldText">Visual Task Boards:</strong>{" "}
              Drag-and-drop Kanban-style boards for seamless workflow.
            </li>
            <li>
              <strong className="boldText">Task and Time Management:</strong>{" "}
              Create, assign, and prioritize tasks with deadlines.
            </li>
            <li>
              <strong className="boldText">Progress tracking:</strong> To-do
              lists and verification to ensure accountability.
            </li>
            <li>
              <strong className="boldText">
                Real-Time Updates and Notifications:
              </strong>{" "}
              Instant updates keep everyone aligned.
            </li>
            <li>
              <strong className="boldText">Resource management:</strong> Assign
              team members and balance workloads. optimize productivity.
            </li>
            <li>
              <strong className="boldText">Collaboration Tools:</strong>{" "}
              Comments, file sharing, and discussions embedded for easy
              communication.
            </li>
          </ul>
          <p className="textDocumentation">
            In short, Timeline Management transforms project planning with
            intuitive timelines and workflow control, empowering teams to stay
            focused and efficient. And for coding fans: “Why do programmers
            prefer dark mode? Because light attracts bugs!”
          </p>
        </div>
      </Container>
    </>
  )
}

export default HowItWorksPage
