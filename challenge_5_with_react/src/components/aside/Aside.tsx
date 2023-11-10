import houseDoor from "../../assets/svg/house-door.svg";
import truck from "../../assets/svg/truck.svg";
import { Link, useLocation } from "react-router-dom";

export default function Aside() {
  const location = useLocation();
  const carId = location.pathname.split("/")[2];
  return (
    <>
      <div className="d-flex flex-column bg-primary-custom fixed-aside-bar">
        <div className="main-aside-icon">
          <img
            className="px-3"
            src="/svg/square.svg"
            alt="rectangle-icon"
            style={{ padding: "3px 0", margin: "0 auto", top: "10px" }}
          />
        </div>
        <div className="flex-grow-1">
          <Link to="/" className="link-underline link-underline-opacity-0">
            <figure
              className={`icon-1 ${
                location.pathname === "/" ? "aside-active-link" : ""
              }`}
            >
              <img src={houseDoor} alt="fi-home-icon" className="aside-icon" />
              <div>Dashboard</div>
            </figure>
          </Link>
          <Link
            to="/list-car"
            className="link-underline link-underline-opacity-0"
          >
            <figure
              className={`icon-2 ${
                (location.pathname === "/list-car" ||
                location.pathname === "/new-car" || 
                location.pathname === `/edit-car/${carId}`)
                  ? "aside-active-link"
                  : ""
              }`}
            >
              <img src={truck} alt="fi-truck-icon" className="aside-icon" />
              <div>Cars</div>
            </figure>
          </Link>
        </div>
      </div>
    </>
  );
}
