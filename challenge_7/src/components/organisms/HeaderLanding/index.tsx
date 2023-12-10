import { Jumbotron, NavLanding } from "../.."

type HeaderLandingProps = {
  children?: React.ReactNode
}

function HeaderLanding({children}: HeaderLandingProps) {
  return (
    <>
      <div className="relative bg-indigo-100 pb-20 px-44">
        <NavLanding/>
        <Jumbotron/>
        {children}
      </div>
    </>
  )
}

export default HeaderLanding