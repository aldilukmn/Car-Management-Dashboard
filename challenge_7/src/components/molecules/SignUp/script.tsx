import { UserRequest } from "../../../models";

export default class Register {
  static async doRegister({...props}: UserRequest) {
    const {email, username, password} = props
    const response = await fetch(`http://localhost:8085/api/v1/user/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password
      })
    });
    const data = await response.json();
    return data;
  }
}