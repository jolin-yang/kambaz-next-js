"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import QuizDetailsEditor from "./details/page";
import QuizQuestionsEditor from "./questions/page";

export default function QuizEditor() {
    const [tab, setTab] = useState("Details");

    return (
        <div id="quiz-editor">
            <Nav variant="tabs">
                <NavItem>
                    <NavLink onClick={() => setTab("Details")}>
                        Details
                    </NavLink>
                </NavItem>
                <NavItem>
                <NavLink onClick={() => setTab("Questions")}>
                        Questions
                    </NavLink>
                </NavItem>
            </Nav>

            {(tab === "Details") ?
                <QuizDetailsEditor /> : <QuizQuestionsEditor />
            }

        </div>
    );}
