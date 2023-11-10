import { useEffect, useState } from "react";

export default function Card() {
  type resultCar = {
    id: number;
    image: string;
    name: string;
    rent: number;
    update: string;
  };

  const [cars, setCars] = useState<resultCar[]>([]);
  useEffect(() => {
    async function fetchCars() {
      const response = await fetch("http://localhost:8085/v1/cars");
      const result = await response.json();
      setCars(result.data);
    }
    fetchCars();
  }, []);


  if (!cars) return <h2>Loading...</h2>;

  return (
    <>
      {cars.map((car) => {
        return (
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm">
              <img
                src={car.image ? car.image : '/images/default.png'}
                className="card-img-top img-car-list"
                alt="car-icon"
              />
              <div className="card-body mx-3 p-0 mt-3">
                <p className="card-title fs-5">{car.name}</p>
                <h5 className="card-text">Rp. {car.rent.toLocaleString('id-ID')} / hari</h5>
                <p>Update Mobil</p>
                <div className="container text-center">
                  <div className="row gx-4">
                    <a
                      href=""
                      className="btn btn-outline-danger col-12 col-lg-6 mb-3 me-2 rounded-1 fw-bold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash mb-1 me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                      </svg>
                      Delete
                    </a>
                    <a
                      href="#"
                      className="btn btn-success col mb-3 rounded-1 fw-bold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square mb-1 me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        ></path>
                      </svg>
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
