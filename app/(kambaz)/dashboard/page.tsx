"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "../courses/client";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { RootState } from "../store";

export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser !== null && currentUser.role !== "STUDENT";
    const dispatch = useDispatch();

    const [displayAllCourses, setDisplayAllCourses] = useState(false);
    const [allCourses, setAllCourses] = useState<any[]>([]);

    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });   
    
    const fetchCourses = async () => {
      try {
        const courses = await client.findMyCourses();
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(courses));
        setAllCourses(allCourses);
      } catch (error) {
        console.error(error);
      }
    };

    const onAddNewCourse = async () => {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([ ...courses, newCourse ]));
      fetchCourses();
    };  

    const onDeleteCourse = async (courseId: string) => {
      const status = await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
      setAllCourses(allCourses.filter((course) => course._id !== courseId));
    };  

    const onUpdateCourse = async () => {
      await client.updateCourse(course);
      dispatch(setCourses(courses.map((c) => {
          if (c._id === course._id) { return course; }
          else { return c; }
    })));
    setAllCourses(allCourses.map((c) => c._id === course._id ? course : c));
    };

    const enroll = async (userId: string, courseId: string) => {
      await client.enrollIntoCourse(userId,courseId);
      fetchCourses();
    };  
    
    const unenroll = async (userId: string,courseId: string) => {
      await client.unenrollFromCourse(userId,courseId);
      fetchCourses();
    };
  
    useEffect(() => {
      fetchCourses();
    }, [currentUser]);

    // const isEnrolledInCourse = (courseId : string)  => 
    //   enrollments.some((e: any) => e.user === currentUser?._id && e.course === courseId);
    const isEnrolledInCourse = (courseId: string) =>
      courses.some((c: any) => c._id === courseId);

    // const displayCourses = displayAllCourses ?
    //   courses : courses.filter((c) => isEnrolledInCourse(c._id));
    const displayCourses = displayAllCourses ? allCourses : courses;
    
    return (
    <div id="wd-dashboard">
      <span>
         <h1 id="wd-dashboard-title">Dashboard
            <button className="btn btn-primary btn-lg float-end"
            onClick={() => setDisplayAllCourses(!displayAllCourses)}>
              Enrollments
            </button>
          </h1> 
      </span>
       <hr />

        {isFaculty && (
        <h5 className="fs-3 mb-4">New Course
          <button className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={onAddNewCourse} > 
            Add 
          </button>
          <button className="btn btn-warning float-end me-2"
            onClick={onUpdateCourse} id="wd-update-course-click">
            Update 
          </button>
        </h5>
        )}

      {isFaculty && (
      <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      )}

      {isFaculty && (
      <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      )}

      <hr />

        <h2 id="wd-dashboard-published">Published Courses ({displayCourses.length})</h2> <hr />
        <div id="wd-dashboard-courses">
            <Row xs={1} md={5} className="g-4">
            {displayCourses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href={isEnrolledInCourse(course._id) ? `/courses/${course._id}/home` : `/dashboard`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden fw-bold">
                  {course.name} </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                  {course.description} </CardText>

                  <button className="btn btn-primary mb-1" disabled={!isEnrolledInCourse(course._id)}> 
                    Go 
                  </button>

                  {!isFaculty && (<br />)}
                  
                  {isFaculty && (
                  <button onClick={(event) => {
                      event.preventDefault();
                      onDeleteCourse(course._id);
                      }} className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                      Delete
                  </button>
                  )}

                  {isFaculty && (
                  <button id="wd-edit-course-click"
                      onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                  </button>
                  )}
              </CardBody>
              </Link>

            <CardBody>
                {isEnrolledInCourse(course._id) ? (
                  <Button variant="danger" className="mt-2 mb-2"
                  onClick={(event) => {
                    event.preventDefault();
                    unenroll(currentUser._id, course._id);;
                  }}
                    id="wd-unenroll-course">
                    Unenroll
                  </Button>) : (
                  <Button variant="success" className="mt-2 mb-2"
                  onClick={(event) => {
                    event.preventDefault();
                    enroll(currentUser._id, course._id);
                  }}
                    id="wd-enroll-course">
                    Enroll
                  </Button>)}
            </CardBody>
          
                  
            </Card>
            </Col>
            ))}
        </Row>
        </div>
    </div>);}
