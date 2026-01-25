import Link from "next/link";

export default function Assignments() {
    return (
      <div id="wd-assignments">
        <input placeholder="Search for Assignments"
               id="wd-search-assignment" /> <button id="wd-add-assignment-group">+ Group</button> <button id="wd-add-assignment">+ Assignment</button>
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button> </h3>
        <ul id="wd-assignment-list">
          <li className="wd-assignment-list-item">
            <Link href="/courses/1234/assignments/123"
               className="wd-assignment-link" >
              A1 - ENV + HTML
            </Link><br />
            Multiple Modules | Not available until May 6 at 12:00am | <br />
            Due May 13 at 11:59pm | 100 pts
            </li>
          <li className="wd-assignment-list-item">
            <Link href="/courses/1234/assignments/123"
               className="wd-assignment-link" >
              A2 - CSS + BOOTSTRAP
            </Link><br />
            Multiple Modules | Not available until May 13 at 12:00am | <br />
            Due May 20 at 11:59pm | 100 pts
          </li>
          <li className="wd-assignment-list-item">
            <Link href="/courses/1234/assignments/123"
                className="wd-assignment-link" >
                A3 - JAVASCRIPT + REACT
            </Link><br />
            Multiple Modules | Not available until May 20 at 12:00am | <br />
            Due May 27 at 11:59pm | 100 pts
          </li>
        </ul>
        <h3 id="wd-assignments-title">
          QUIZZES 10% of Total <button>+</button> </h3>
        <ul id="wd-quiz-list">
          <li className="wd-quiz-list-item">
            <Link href="/courses/1234/quiz"
               className="wd-quiz-link" >
              Q1
            </Link><br />
            Multiple Modules | Not available until May 6 at 12:00am | <br />
            Due May 13 at 11:59pm | 30 pts
            </li>
          <li className="wd-quiz-list-item">
            <Link href="/courses/1234/quiz"
               className="wd-quiz-link" >
              Q2
            </Link><br />
            Multiple Modules | Not available until May 13 at 12:00am | <br />
            Due May 20 at 11:59pm | 30 pts
          </li>
          <li className="wd-quiz-list-item">
            <Link href="/courses/1234/quiz"
                className="wd-quiz-link" >
                Q3
            </Link><br />
            Multiple Modules | Not available until May 20 at 12:00am | <br />
            Due May 27 at 11:59pm | 30 pts
          </li>
        </ul>
        <h3 id="wd-exams-title">
          EXAMS 20% of Total <button>+</button> </h3>
        <ul id="wd-exam-list">
          <li className="wd-exam-list-item">
            <Link href="/courses/1234/exam"
               className="wd-exam-link" >
              X1
            </Link><br />
            Not available until Feb 24 at 12:00am |<br />
            Due March 3 at 11:59pm | 80 pts
            </li>
          <li className="wd-exam-list-item">
            <Link href="/courses/1234/exam"
               className="wd-exam-link" >
              X2
            </Link><br />
            Not available until April 21 at 12:00am |<br />
            Due April 28 at 11:59pm | 103 pts
          </li>
        </ul>
        <h3 id="wd-projects-title">
          PROJECTS 30% of Total <button>+</button> </h3>
        <ul id="wd-project-list">
          <li className="wd-project-list-item">
            <Link href="/courses/1234/project"
               className="wd-project-link" >
              Project - Kambaz Quizzes
            </Link><br />
            Due April 19 at 11:59pm | 315 pts
            </li>
          <li className="wd-project-list-item">
            <Link href="/courses/1234/project"
               className="wd-project-link" >
              Project - Kambaz Pazza
            </Link><br />
            Due April at 11:59pm | 282 pts
          </li>
          <li className="wd-project-list-item">
            <Link href="/courses/1234/project"
                className="wd-project-link" >
                Project - Open-Ended Web Application Final Project
            </Link><br />
            Due April 19 at 11:59pm | 267 pts
          </li>
        </ul>
      </div>
  );}
  
  
  