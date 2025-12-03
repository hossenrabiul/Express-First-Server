import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/DB";
const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];

  const matchPass = await bcrypt.compare(password, user.password);

  if (!matchPass) {
    return null;
  }

  const secret_Key = config.jwt_secret_key as string;
  const token = jwt.sign(
    { name: user.name, role: user.role, email: user.email },
    secret_Key,
    {
      expiresIn: "4hr",
    }
  );
  console.log(token);

  return { user, token };
};

export const authServices = {
  loginUser,
};
