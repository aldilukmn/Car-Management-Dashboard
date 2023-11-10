import Aside from "./Aside";
import { Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <>
      <main className="flex-grow-1 bg-subtle d-flex" >
        <Aside />
        <Outlet />
      </main>
    </>
  );
}
