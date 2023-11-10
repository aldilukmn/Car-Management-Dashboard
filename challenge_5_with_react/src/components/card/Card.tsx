import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { resultCar } from "../../models/entity";
import { Car } from "../../services/Cars";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Card({
  selectedFilter,
}: {
  selectedFilter: string | null;
}) {
  const [cars, setCars] = useState<resultCar[]>([]);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      let data = await Car.fetchCars();
      if (selectedFilter) {
        data = [...data].filter((car) => car.size === selectedFilter);
      }
      setCars(data);
    } catch (error) {
      console.log("Error => ", error);
    }
  };

  const deleteCar = async (id: number) => {
    await Car.deleteCar(id);
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  };

  const customStyles = {
    overlay: {
      background: 'rgba(0, 0, 0, 1)',
    },
    content: {
      width: "400px",
      margin: "auto",
      padding: "30px",
      background: "#fff",
      borderRadius: "5px",
      textAlign: "center" as const,
      border: "1px solid #ccc",
      boxShadow: "0 0 10px #CFD4ED"
    },
    h1: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "20px",
      marginTop: "20px",
    },
    p: {
      fontSize: "16 px",
    },
    btn_flex: {
      display: "flex",
      justifyContent: "center",
      gap: "20px"
    },
    btn_yes: {
      width: "100px",
      background: "#0D28A6",
      color: "#fff",
      padding: "8px",
      fontWeight: "700",
      border: "none",
      borderRadius: "2px"
    },
    btn_no: {
      width: "100px",
      background: "#fff",
      color: "#0D28A6",
      padding: "8px",
      fontWeight: "700",
      border: "1px solid #0D28A6",
      borderRadius: "2px"
    }
  };

  const confirDelete = (id: number) => {
    confirmAlert({
      title: "Menghapus Data Mobil",
      message:
        "Setelah dihapus, data mobil tidak dapat dikembalikanl. Yakin ingin menghapus?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            deleteCar(id);
          },
        },
        {
          label: "Tidak",
        },
      ],
      customUI: ({ onClose }) => {
        return (
          <div style={customStyles.content}>
            <img src="svg/beep-vehicle.svg" alt="beep-vehicle-img" />
            <h2 style={customStyles.h1}>{"Menghapus Data Mobil"}</h2>
            <p style={customStyles.p}>
              {
                "Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?"
              }
            </p>
            <div style={customStyles.btn_flex}>
              <button
              style={customStyles.btn_yes}
                onClick={() => {
                  deleteCar(id);
                  onClose();
                }}
              >
                Ya
              </button>
              <button style={customStyles.btn_no} onClick={onClose}>Tidak</button>
            </div>
          </div>
        );
      },
    });
  };

  const editCar = async (id: number) => {
    await Car.getCarById(id);
    navigate(`/edit-car/${id}`);
  };

  useEffect(() => {
    fetchCars();
  }, [selectedFilter]);

  if (selectedFilter && cars.length === 0)
    return (
      <h2
        className="text-center"
        style={{ height: "100vh", marginTop: "200px" }}
      >
        Your Favorite Car Not Found ... 😔😔
      </h2>
    );

  if (!cars || cars.length === 0)
    return (
      <h2
        className="text-center"
        style={{ height: "100vh", marginTop: "200px" }}
      >
        Loading...
      </h2>
    );

  return (
    <>
      <Helmet>
        <title>List Car - Car Management Dashboard</title>
      </Helmet>
      {cars.map((car) => {
        return (
          <div className="col-lg-4 mb-4" key={car.id}>
            <div className="card shadow-sm">
              <img
                src={car.image ? car.image : "/images/default.png"}
                className="card-img-top img-car-list"
                alt="car-icon"
              />
              <div className="card-body mx-3 p-0 mt-3">
                <p className="card-title fs-5 mb-3">{car.name}</p>
                <h5 className="card-text mb-3">
                  Rp. {Number(car.rent).toLocaleString("id-ID")} / hari
                </h5>
                <div className="d-flex gap-2 mb-3">
                  <img src="/svg/fi_clock.svg" alt="fi-clock-icon" width={25} />
                  <div style={{ fontSize: "18px" }}>{car.update}</div>
                </div>
                <div className="container text-center">
                  <div className="row gx-4">
                    <button
                      onClick={() => confirDelete(car.id)}
                      className="btn btn-outline-danger col-12 col-lg-6 mb-3 me-2 rounded-1 fw-bold d-flex align-items-center justify-content-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                      </svg>
                      <div>Delete</div>
                    </button>
                    <button
                      onClick={() => editCar(car.id)}
                      className="btn btn-success col mb-3 rounded-1 fw-bold d-flex align-items-center justify-content-center gap-1"
                    >
                      <img src="/svg/fi_edit.svg" alt="fi-edit-icon" />
                      <div>Edit</div>
                    </button>
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
