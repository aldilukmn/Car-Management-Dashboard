import { useState } from "react";
import Footer from "../footer/Footer";
import Navigation from "../navigation/Navigation";
import { useNavigate } from "react-router-dom";

export default function NewCar() {
  // const [name, setName] = useState("");
  // const [rent, setRent] = useState("");
  // const [size, setSize] = useState("");
  // const [image, setImage] = useState<File | null>(null);
  // const navgiate = useNavigate();

  // const handleChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target;

  //   if (name === "image") {
  //     const selectedFile = (event.target as HTMLInputElement).files;
  //     if (selectedFile && selectedFile.length > 0) {
  //       setImage(selectedFile[0]);
  //     }

  //   } else {
  //     // Handle other input changes as before
  //     switch (name) {
  //       case "name":
  //         setName(value);
  //         break;
  //       case "rent":
  //         setRent(value);
  //         break;
  //       case "size":
  //         setSize(value);
  //         break;
  //     }
  //   }
  // };

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("rent", rent);
  //   formData.append("size", size);
  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const response = await fetch("http://localhost:8085/v1/cars", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     await response.json();
  //     navgiate("/");
  //   } catch (error) {
  //     console.error("Kesalahan:", error);
  //   }
  // };

  return (
    <>
      <div className="d-flex flex-column justify-content-end w-100">
        <section className="flex-grow-1 mx-4 mt-4" style={{ height: "100vh" }}>
          <Navigation />
          <div className="mb-4 active-list-2">
            <div className="fw-bold">Add New Car</div>
          </div>
          <form encType="multipart/form-data">
            <div className="border bg-white shadow-sm p-4 rounded-1">
              <div className="row mb-3">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-4">
                  <input
                    
                    value={name}
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="rent" className="col-sm-2 col-form-label">
                  Sewa Per Hari
                </label>
                <div className="col-sm-4">
                  <input
                    
                    value={rent}
                    type="number"
                    className="form-control"
                    id="rent"
                    name="rent"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="size" className="col-sm-2 col-form-label">
                  Ukuran
                </label>
                <div className="col-sm-4">
                  <select
                    className="form-select"
                    id="size"
                    name="size"
                    
                    value={size}
                  >
                    <option value="">Pilih Ukuran</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="image" className="col-sm-2 col-form-label">
                  Foto
                </label>
                <div className="col-sm-4">
                  <input
                    onChange={(e) => {handleChange(e)}}
                    type="file"
                    id="image"
                    className="form-control"
                    name="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mb-4 btn-submit">
              <a
                href="/v1/cars"
                className="btn btn-white fw-bold me-3 rounded-1"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="btn btn-primary fw-bold rounded-1 px-4"
                disabled={!name || !rent || !size || !image}
              >
                Save
              </button>
            </div>
          </form>
        </section>
        <Footer />
      </div>
    </>
  );
}
