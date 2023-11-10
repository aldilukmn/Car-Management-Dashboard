import Footer from "../footer/Footer";
import Navigation from "../navigation/Navigation";
import Helmet from "react-helmet";

export default function Car() {
  return (
    <>
      <Helmet>
        <title>Dashboard - Car Management Dashboard</title>
      </Helmet>
      <div className="d-flex flex-column justify-content-end w-100">
        <section className="flex-grow-1 mx-4 mt-4" style={{ height: "100vh" }}>
          <Navigation />
          <h2 className="text-center" style={{ marginTop: "150px" }}>
            Page Not Found! 404! 😫
          </h2>
        </section>
        <Footer />
      </div>
    </>
  );
}
