export class Car {
  static listCar = async (size?: string | null) => {
    try {
      const response = await fetch(`http://localhost:8085/v1/cars${size ? '?size=' + size : ''}`, {
        method: "GET",
      });
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.log("Error fetching data : ", error);
    }
  };

  static deleteCar = async (id: number) => {
    try {
      await fetch(`http://localhost:8085/v1/cars/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting or fetching data:", error);
    }
  };

  static getCar = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8085/v1/cars/${id}`, {
        method: "GET",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting or fetching data:", error);
    }
  };
}
