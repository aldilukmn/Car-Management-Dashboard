import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/style/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewCar from "./components/content/NewCar.tsx";
import ListCar from "./components/content/ListCar.tsx";
import EditCar from "./components/content/EditCar.tsx";
import Car from "./components/content/Car.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<Car/>} />
          <Route path="list-car" element={<ListCar/>}/>
          <Route path="new-car" element={<NewCar/>}/>
          <Route path="edit-car/:id" element={<EditCar/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
