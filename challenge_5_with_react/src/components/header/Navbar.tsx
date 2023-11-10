import chevronDownSolid from '../../assets/svg/chevron-down-solid.svg';

export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand w-14" href="#">
          <img src="/svg/rectangle.svg" alt="rectangle-2-icon" />
        </a>
        <button
          className="navbar-toggler me-auto border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <form className="d-flex" role="search">
          <input
            className="form-control rounded-start rounded-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-primary-1 rounded-end rounded-0" type="submit">
            Search
          </button>
        </form>
        <div className="user-section d-flex align-items-center gap-2 ms-3">
          <div>
            <span className="user-name">A</span>
          </div>
          <div>aldilukmn</div>
          <img
            src={chevronDownSolid}
            alt="chevron-down-solid-icon"
            width="15"
          />
        </div>
      </div>
    </nav>
  );
}
