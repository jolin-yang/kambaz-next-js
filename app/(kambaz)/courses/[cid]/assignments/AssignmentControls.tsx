import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function AssignmentControls() {
    return (
        <div id="wd-assignment-controls" className="text-nowrap">
            <InputGroup className="float-start" style={{ width: "50%"}}>
                <InputGroupText className="bg-white">
                    <IoSearchOutline className="fs-4"/>
                </InputGroupText>
                <FormControl 
                    className="float-start form-control-lg"
                    placeholder="Search...">
                </FormControl>
            </InputGroup>
            <Button variant="danger" size="lg" id="wd-assignment-btn" className="float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment</Button>
            <Button variant="secondary" size="lg" id="wd-group-btn" className="float-end me-2">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group</Button>
        </div>
    )
}