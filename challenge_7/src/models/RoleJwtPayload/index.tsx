import { JwtPayload } from 'jwt-decode';


export default interface RoleJwtPayload extends  JwtPayload {
  role: string,
}