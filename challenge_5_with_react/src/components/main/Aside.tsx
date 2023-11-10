import { Link, useLocation } from "react-router-dom";

export default function Aside() {
  const location = useLocation();
  const carId = location.pathname.split("/")[2];

  return (
    <>
      <aside className="main-aside bg-white w-17">
        <Link
          to="/"
          className={`main-aside-1 ${
            location.pathname === "/" ? "main-aside-active-link" : ""
          }`}
        >
          CARS
        </Link>
        <Link
          to="/list-car"
          className={`main-aside-2 ${
            location.pathname === "/list-car" ||
            location.pathname === "/new-car" ||
            location.pathname === `/edit-car/${carId}`
              ? "main-aside-active-link"
              : ""
          }`}
        >
          List Car
        </Link>
      </aside>
    </>
  );
}
