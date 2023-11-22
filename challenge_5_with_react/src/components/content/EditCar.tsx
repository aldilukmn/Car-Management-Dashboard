import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Navigation from "../navigation/Navigation";
import { useEffect, useState } from "react";
import { Car } from "../../services/Cars";
import { Helmet } from "react-helmet";

export default function EditCar() {
  const carId = useParams<{ id: string }>();
  const parseIntId = Number(carId.id);
  const [name, setName] = useState("");
  const [rent, setRent] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");
  const [updateImage, setUpdateImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await Car.getCar(parseIntId);
      setName(result.data.name);
      setRent(result.data.rent);
      setSize(result.data.size);
      setImage(result.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "image") {
      const selectedFile = (event.target as HTMLInputElement).files;
      if (selectedFile && selectedFile.length > 0) {
        setUpdateImage(selectedFile[0]);
      }
    } else {
      switch (name) {
        case "name":
          setName(value);
          break;
        case "rent":
          setRent(value);
          break;
        case "size":
          setSize(value);
          break;
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = {
    //   name: name,
    //   rent: Number(rent),
    //   size: size,
    // };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rent", rent);
    formData.append("size", size);
    if (updateImage) {
      formData.append("image", updateImage);
    }
    try {
      await fetch(`http://localhost:8085/v1/cars/${parseIntId}`, {
        method: "PATCH",

        body: formData,
      });
      navigate("/list-car");
    } catch (error) {
      console.log("ada Kesalah bro", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [carId]);

  return (
    <>
      <Helmet>
        <title>Edit Car - Car Management Dashboard</title>
      </Helmet>
      <div className="d-flex flex-column justify-content-end w-100">
        <section className="flex-grow-1 mx-4 mt-4" style={{ height: "100vh" }}>
          <Navigation />
          <div className="mb-4 active-list-2">
            <div className="fw-bold">Update Car Information</div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="border bg-white shadow-sm p-4 rounded-1 d-sm-flex gap-5">
              <div className="col-sm-5">
                <div className="d-sm-flex align-items-center mb-3">
                  <label htmlFor="name" className="col-sm-4 col-form-label">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={handleChange}
                      value={name}
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                    />
                  </div>
                </div>
                <div className="d-sm-flex align-item-center mb-3">
                  <label htmlFor="rent" className="col-sm-4 col-form-label">
                    Sewa Per Hari
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={handleChange}
                      value={rent}
                      type="number"
                      className="form-control"
                      id="rent"
                      name="rent"
                    />
                  </div>
                </div>
                <div className="d-sm-flex align-item-center mb-3">
                  <label htmlFor="size" className="col-sm-4 col-form-label">
                    Ukuran
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      id="size"
                      name="size"
                      onChange={handleChange}
                      value={size}
                    >
                      <option value="">Pilih Ukuran</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
                <div className="d-sm-flex align-item-center">
                  <label htmlFor="image" className="col-sm-4 col-form-label">
                    Foto
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      type="file"
                      id="image"
                      className="form-control"
                      name="image"
                    />
                  </div>
                </div>
              </div>
              <div className="align-self-center">
                <img
                  src={image ? image : "/images/default.png"}
                  alt="image-preview"
                  className="object-fit-cover border rounded"
                  height={"200px"}
                  width={"200px"}
                />
              </div>
            </div>
            <div className="col-12 mb-4 btn-submit">
              <Link
                to={"/list-car"}
                className="btn btn-white fw-bold me-3 rounded-1"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary fw-bold rounded-1 px-4"
                disabled={!name || !rent || !size}
              >
                Update
              </button>
            </div>
          </form>
        </section>
        <Footer />
      </div>
    </>
  );
}
