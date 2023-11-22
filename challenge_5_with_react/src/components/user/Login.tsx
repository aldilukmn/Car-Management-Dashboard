import { Link } from "react-router-dom";
import { useState } from "react";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    switch(name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  }

  return (
    <>
      <div className='bg-white shadow-sm card' style={{ width: "25rem", margin: "100px auto" }}>
        <div className="card-body">
          <h4 className='text-center border-bottom pb-3 mb-4'>Login</h4>
          <div className="d-sm-flex align-item-center mb-3">
            <label className="form-label col-form-label col-sm-3" htmlFor="username">Username</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="username" name="username"onChange={handleChange} value={username}/>
            </div>
          </div>
          <div className="d-sm-flex align-item-center mb-4">
            <label className="form-label col-form-label col-sm-3" htmlFor="password">Password</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={password}/>
            </div>
          </div>
          <div className="col-12 mb-3">
            <button type="submit" className="btn btn-primary fw-bold rounded-1 px-4 w-100" disabled={!username || !password}>
              Login
            </button>
          </div>
          <div className="col-12 text-center">
            <Link to={"/register"}>
              Don't have an account ?
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
