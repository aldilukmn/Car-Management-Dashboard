import Footer from "../footer/Footer";
import Card from "../card/Card";
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ListCar() {
  const [selectFilter, setSelectFilter] = useState<string | null>(null);

  const handleFilter = (filter: string | null) => {
    setSelectFilter(filter);
  }

  return (
    <>
      <div className="d-flex flex-column w-100" >
        <section className="flex-grow-1 mx-4 mt-4">
          <Navigation/>
          <div className="d-flex justify-content-between align-items-center mb-3 active-list-2">
            <div className="fw-bold">List Car</div>
            <Link to="/new-car" className="btn btn-primary rounded-1">
              <b>+</b>Add New Car
            </Link>
          </div>
          <div className="d-flex gap-3 active-list-3">
            <button className={`btn btn-light rounded-1 border-primary-1 ${selectFilter === null ? "border-primary-1-active" : ""}`} onClick={() => handleFilter(null) }>
              All
            </button>
            <button className={`btn btn-light rounded-1 border-primary-1 ${selectFilter === "small" ? "border-primary-1-active" : ""}`} onClick={() => handleFilter("small")}>
              Small
            </button>
            <button className={`btn btn-light rounded-1 border-primary-1 ${selectFilter === "medium" ? "border-primary-1-active" : ""}`} onClick={() => handleFilter("medium")}>
              Medium
            </button>
            <button className={`btn btn-light rounded-1 border-primary-1 ${selectFilter === "large" ? "border-primary-1-active" : ""}`} onClick={() => handleFilter("large")}>
              Large
            </button>
          </div>
          <div className="row my-3">
            <Card selectedFilter={selectFilter}/>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
