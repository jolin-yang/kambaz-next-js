"use client";

import { useState } from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import QuizDetailsEditor from "./details/page";
import QuizQuestionsEditor from "./questions/page";
import { SearchParams } from "next/dist/server/request/search-params";
import { useSearchParams } from "next/navigation";

export default function QuizEditor() {
    const searchParams = useSearchParams();
    const tabParameter = searchParams.get("tab");
    
    const [tab, setTab] = useState((tabParameter === "questions") ? "Questions" : "Details");

    return (
        <div id="quiz-editor">
            <Nav variant="tabs">
                <NavItem>
                    <NavLink onClick={() => setTab("Details")} active={tab === "Details"} className="text-black">
                        Details
                    </NavLink>
                </NavItem>
                <NavItem>
                <NavLink onClick={() => setTab("Questions")} active={tab === "Questions"} className="text-black">
                        Questions
                    </NavLink>
                </NavItem>
            </Nav>

            {(tab === "Details") ?
                <QuizDetailsEditor /> : <QuizQuestionsEditor />
            }

        </div>
    );}
