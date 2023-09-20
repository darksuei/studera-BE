import { CreateUserDto, LoginUserDto } from "../dto";
import { User } from "../entities/users";
import { AppDataSource } from "../ormconfig";
const jwt = require("jsonwebtoken");

export const createUser = async ({ name, email, password }: CreateUserDto) => {
  try {
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await AppDataSource.manager.save(user);
    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const generateToken = ({ name, email, password }: CreateUserDto) => {
  const token: string = jwt.sign({ email, password }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

// export const verifyToken = async (token: string) => {
//   const isValid = await jwt.verify(token, process.env.JWT_SECRET);
//   console.log(isValid);
//   return isValid;
// };
