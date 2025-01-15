import mysql from "mysql2/promise";

export const executeQuery = async (query, data) => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    const [result] = await db.execute(query, data);
    db.end();

    return result;
  } catch (error) {
    return error;
  }
};
export default executeQuery;
