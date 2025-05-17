import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};


// login
export const login = async (body) => {
  const exist = await User.findOne({ email: body.email });
  if (exist == null) {
    throw new Error("User not Exist or user invaild");
  } else {
    const isPasswordVaild = await bcrypt.compare(body.password, exist.password);
    if (isPasswordVaild) {
      const token = jwt.sign({ Username: exist.fname, Email: exist.email, UserId: exist._id }, process.env.hidden_key);
      return token;
    } else {
      throw new Error('password incorrect');
    }
  }

}


//create new user
//  sign up
export const sign = async (body) => {

  const exist = await User.findOne({ email: body.email });
  if (exist) {
    throw new Error("useer Already Exsist");
  } else {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(body.password, saltRounds)
    body.password = hashPassword;
    const data = await User.create(body);
    return data;
  }



};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
