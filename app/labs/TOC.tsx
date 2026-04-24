"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
 return (
   <Nav variant="pills">
     <NavItem>
        <NavLink href="/labs" as={Link} className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`}>
        Labs </NavLink>
     </NavItem>
     <NavItem>
        <NavLink href="/labs/lab1" as={Link} className={`nav-link ${pathname.endsWith("lab1") ? "active" : ""}`}>
        Lab 1 </NavLink>
      </NavItem>
     <NavItem>
        <NavLink href="/labs/lab2" as={Link} className={`nav-link ${pathname.endsWith("lab2") ? "active" : ""}`}>
        Lab 2 </NavLink> 
     </NavItem>
     <NavItem>
        <NavLink href="/labs/lab3" as={Link} className={`nav-link ${pathname.endsWith("lab3") ? "active" : ""}`}>
        Lab 3 </NavLink> 
     </NavItem>
     <NavItem>
        <NavLink href="/labs/lab4" as={Link} className={`nav-link ${pathname.endsWith("lab4") ? "active" : ""}`}>
        Lab 4 </NavLink> 
     </NavItem>
     <NavItem>
        <NavLink href="/labs/lab5" as={Link} className={`nav-link ${pathname.endsWith("lab5") ? "active" : ""}`}>
        Lab 5 </NavLink> 
     </NavItem>
     <NavItem>
       <NavLink href="/" as={Link}>Kambaz</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/jolin-yang/kambaz-next-js/tree/quizzes" id="wd-github">My GitHub</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/jolin-yang/kambaz-node-server-app/tree/quizzes" id="wd-github">Server repo</NavLink>
     </NavItem><NavItem>
       <NavLink href="https://kambaz-node-server-app-1-iabg.onrender.com" id="wd-github">Root of server</NavLink>
     </NavItem>
   </Nav>
);}
