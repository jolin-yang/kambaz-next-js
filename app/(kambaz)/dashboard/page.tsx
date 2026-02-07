import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
      <Row xs={1} md={5} className="g-4">
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Full Stack software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/2345/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/racket.png" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2345 Fundies 1</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/3456/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/java.png" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3456 Fundies 2</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/4567/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/ood.jpg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4567 OOD</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/3000/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/algo.jpg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3000 Algorithms</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/3800/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/theory.jpg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3800 Theory of Comp</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/3650/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/systems.jpg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3650 Computer Systems</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/3520/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/c++.png" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3520 C++ Programming</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
      </Row>
      </div>
    </div>
);}
