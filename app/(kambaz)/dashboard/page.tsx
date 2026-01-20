import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/2345" className="wd-dashboard-course-link">
            <Image src="/images/racket.png" width={200} height={150} alt="racket" />
            <div>
              <h5> CS2345 Fundies 1 </h5>
              <p className="wd-dashboard-course-title">
                Software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/java.png" width={200} height={150} alt="java" />
            <div>
              <h5> CS3456 Fundies 2 </h5>
              <p className="wd-dashboard-course-title">
                Software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/4567" className="wd-dashboard-course-link">
            <Image src="/images/ood.jpg" width={200} height={150} alt="ood" />
            <div>
              <h5> CS4567 Object-Oriented Design </h5>
              <p className="wd-dashboard-course-title">
                Software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3000" className="wd-dashboard-course-link">
            <Image src="/images/algo.jpg" width={200} height={150} alt="algo" />
            <div>
              <h5> CS3000 Algorithms and Data </h5>
              <p className="wd-dashboard-course-title">
                Software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3800" className="wd-dashboard-course-link">
            <Image src="/images/theory.jpg" width={200} height={150} alt="theory" />
            <div>
              <h5> CS3800 Theory of Computation </h5>
              <p className="wd-dashboard-course-title">
                Software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3650" className="wd-dashboard-course-link">
            <Image src="/images/systems.jpg" width={200} height={150} alt="systems" />
            <div>
              <h5> CS3650 Computer Systems </h5>
              <p className="wd-dashboard-course-title">
                Software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3520" className="wd-dashboard-course-link">
            <Image src="/images/c++.png" width={200} height={150} alt="c++" />
            <div>
              <h5> CS3520 Programming in C++ </h5>
              <p className="wd-dashboard-course-title">
                Software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
);}
