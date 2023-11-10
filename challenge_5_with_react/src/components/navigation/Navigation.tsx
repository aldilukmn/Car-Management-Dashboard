import { useLocation } from "react-router-dom";
import chevronRigthSolid from "../../assets/svg/chevron-right-solid.svg";
import { Link } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const carId = location.pathname.split("/")[2];

  return (
    <>
      <p className="active-list-1">
        <span className={location.pathname === "/" ? "" : "fw-bold"}>Cars</span>
        {location.pathname === "/" ? (
          " "
        ) : (
          <>
            <img
              src={chevronRigthSolid}
              alt="chevron-right-solid-icon"
              width="5"
            />
          </>
        )}
        {location.pathname === "/list-car" ? (
          <span>List Car</span>
        ) : location.pathname === "/new-car" ? (
          <>
            <Link
              to="/"
              className="fw-bold link-underline link-underline-opacity-0 link-dark"
            >
              List Car
            </Link>
            <img
              src={chevronRigthSolid}
              alt="chevron-right-solid-icon"
              width="5"
            />
            <span>Add New Car</span>
          </>
        ) : location.pathname === `/edit-car/${carId}` ? (
          <>
            <Link
              to="/"
              className="fw-bold link-underline link-underline-opacity-0 link-dark"
            >
              List Car
            </Link>
            <img
              src={chevronRigthSolid}
              alt="chevron-right-solid-icon"
              width="5"
            />
            <span>Update Car Information</span>
          </>
        ) : null}
      </p>
    </>
  );
}
