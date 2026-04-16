"use client"

import * as client from "./client";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { addQuiz } from "./reducer";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AddQuizButton() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role !== "STUDENT";
    const dispatch = useDispatch();
    const { cid } = useParams();  
    const router = useRouter();

    const onAddQuiz = async () => {
          const newQuiz = await client.createQuizForCourse(cid as string, {
            title: "New Quiz"
          });
      
          dispatch(addQuiz(newQuiz));

          router.push(`/courses/${cid}/quizzes/${newQuiz._id}`);
    };

    return (
        <div id="wd-quiz-controls" className="text-nowrap">
            <InputGroup className="float-start" style={{ width: "50%"}}>
                <InputGroupText className="bg-white">
                    <IoSearchOutline className="fs-4"/>
                </InputGroupText>
                <FormControl 
                    className="float-start form-control-lg"
                    placeholder="Search for Quiz">
                </FormControl>
            </InputGroup>

            {isFaculty && (
            <Button id="wd-quiz-btn" onClick={onAddQuiz} className="float-end btn btn-danger btn-lg">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Quiz</Button>
            )}
        </div>
    )
}