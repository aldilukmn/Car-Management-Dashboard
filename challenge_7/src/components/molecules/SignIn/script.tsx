import { UserRequest } from "../../../models";
import type { CredentialResponse } from "@react-oauth/google";

export default class Login {
  static async doLogin({username, password}: UserRequest) {
    const response = await fetch(
      'http://localhost:8085/api/v1/superadmin/login', 
      {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      })
    });
    const data = await response.json();
    return data;
  }

  static async googleLogin(googleCredential: CredentialResponse) {
    const response = await fetch(`http://localhost:8085/api/v1/auth/login/google?access_token=${googleCredential.credential}`, 
    {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
}
