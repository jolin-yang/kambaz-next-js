import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
export default function AssignmentSideButtons() {
  return (
    <div className="float-end">
      <span className="me-1 position-relative">
            <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-3" />
            <FaCircle className="text-white me-1 fs-4" />
          </span>
      <IoEllipsisVertical className="fs-4 ms-3" />
    </div> );}