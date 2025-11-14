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
            <h3 className="text-center">
              A brief explanation on how{" "}
              <strong className="boldText">Timeline Manager</strong> works!
            </h3>
          </div>
        </div>
        <div className="flex-grow-1">
          <p className="textDocumentation mb-2">
            Timeline Management is an innovative app designed to help
            inContaineriduals, teams, and organizations efficiently plan,
            coordinate, and track their projects from start to finish. The app
            provides a clear visual timeline where users can manage tasks,
            deadlines, and milestones in one place. It is ideal for project
            managers, team leaders, freelancers, and anyone seeking to improve
            productivity and task organization through effective project
            management.
          </p>
          <p className="textDocumentation">
            Our app is inspired by popular Kanban tools like Trello, focusing on
            task and time management to ensure smooth project execution. Key
            features include:
          </p>
          <ul className="textDocumentationList">
            <li>
              <strong className="boldText">Visual Task Boards:</strong>{" "}
              Drag-and-drop Kanban-style boards that allow users to move tasks
              between stages, improving workflow and clarity.
            </li>
            <li>
              <strong className="boldText">Task and Time Management:</strong>{" "}
              Create, assign, and schedule tasks with deadlines, allowing for
              prioritization and timely completion.
            </li>
            <li>
              <strong className="boldText">
                To-Do Lists and Verification:
              </strong>{" "}
              Track task progress with to-do lists and verification features to
              ensure accountability and task completion.
            </li>
            <li>
              <strong className="boldText">
                Real-Time Updates and Notifications:
              </strong>{" "}
              Receive instant notifications and status updates to keep all team
              members informed and aligned.
            </li>
            <li>
              <strong className="boldText">Resource Allocation:</strong> Assign
              team members and resources efficiently, balancing workloads to
              optimize productivity.
            </li>
            <li>
              <strong className="boldText">Collaboration Tools:</strong>{" "}
              Facilitate communication within the team through comments, file
              sharing, and discussion threads embedded in the app.
            </li>
          </ul>
          <p className="textDocumentation">
            In conclusion, Timeline Management is more than just a project
            tracking tool—it transforms how teams plan, coordinate, and deliver
            projects. With its visual timelines and workflow management, it
            empowers users to stay focused and productive throughout the project
            lifecycle. And for those who appreciate the nuances of coding (like
            the author of the app), here’s a little joke: “Why do programmers
            prefer dark mode? Because light attracts bugs!”
          </p>
        </div>
      </Container>
    </>
  )
}

export default HowItWorksPage
