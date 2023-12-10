import { Link } from 'react-router-dom';

type LinkProps = {
  link: string,
  icon?: React.ReactNode,
  name: string,
  className: string,
}

function SignLink({link, icon, name, className}: LinkProps) {
  return (
    <>
      <Link className={className} to={link}>
       {icon}{name}
      </Link>
    </>
  )
}

export default SignLink