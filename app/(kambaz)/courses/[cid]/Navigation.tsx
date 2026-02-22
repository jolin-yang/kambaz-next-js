"use client"

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { ListGroupItem } from "react-bootstrap";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams(); 
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">

      {links.map((link) => (
        <ListGroupItem key={link} 
              as={Link}
              href= {link === "People" ? `/courses/${cid}/${link.toLowerCase()}/table` : `/courses/${cid}/${link.toLowerCase()}`}
              className={`list-group-item border-0
                ${pathname.includes(link.toLowerCase()) ? "active" : "text-danger"} `}>
        {link}
        </ListGroupItem>
      ))}
    </div>
);}
