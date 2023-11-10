import db from "../../config/knex";

class CarDAO {
  async createCar(
    name: string,
    rent: number,
    size: string,
    image: string
  ) {
    const [id] = await db("cars")
      .insert({
        name,
        rent,
        update: new Date().toISOString,
        size,
        image,
      })
      .returning("id");
    return id;
  }
}

export default new CarDAO();
