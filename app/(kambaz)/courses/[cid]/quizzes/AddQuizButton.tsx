import { FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

import InputGroupText from "react-bootstrap/esm/InputGroupText";
import Link from "next/link";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

export default function AssignmentControls() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role !== "STUDENT";

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
            <Link href="./quizzes/new" id="wd-quiz-btn" className="float-end btn btn-danger btn-lg">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Quiz</Link>
            )}
        </div>
    )
}