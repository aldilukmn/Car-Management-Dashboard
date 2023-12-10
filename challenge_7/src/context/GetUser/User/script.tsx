export default class Users {
  static baseUrl = 'http://localhost:8085/api/v1/';

  static async getUser(userToken: string) {
    const response = await fetch(
      `${this.baseUrl}user/current`, 
      {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    });
    const data = await response.json();
    return data;
  }
}