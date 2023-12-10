export default class Cars {
  static baseUrl = 'http://localhost:8085/api/v1/';

  static async getCar(userToken: string, role: string, sizeFilter: string, searchCar: string, currentPage: number, perPage: number) {
    const queryParams = new URLSearchParams({
      size: sizeFilter,
      search: searchCar,
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });
    const response = await fetch(
      `${this.baseUrl}${role}/cars?${queryParams}`,
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

  static async getCarById(id: number) {
    try {
      const response = await fetch(`${this.baseUrl}cars/${id}`, {
        method: "GET",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting or fetching data:", error);
    }
  }

  static formatDate = (dateString: string) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' } as Intl.DateTimeFormatOptions;
    const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
    return formattedDate;
  }

  static async updateCar(parseIntId: number, userToken: string, role: string, formData: FormData) {
    const response = await fetch(`${this.baseUrl}${role}/cars/${parseIntId}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
      body: formData,
    });
    const data = response.json();
    return data;
  }

  static async addNewCar(userToken: string, formData: FormData, role: string) {
    const response = await fetch(`${this.baseUrl}${role}/cars`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
      body: formData,
    });
    const data = response.json();
    return data;
  }
  
  static async deleteCar(userToken: string, role: string, id: number) {
    try {
      const response = await fetch(`${this.baseUrl}${role}/cars/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error("Error deleting or fetching data:", error);
    }
  }
}