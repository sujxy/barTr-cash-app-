import User from "../models/user.js";
import zod from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Account from "../models/account.js";

const userSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string().max(30),
  lastName: zod.string().max(30),
});

const loginUserSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

//can edit any number of parameters : zod.partial
const editUserSchema = zod.object({
  password: zod.string().min(6),
  firstName: zod.string().max(30),
  lastName: zod.string().max(30),
});

export const handleSignup = async (req, res) => {
  try {
    const validatedUser = userSchema.safeParse(req.body);

    if (validatedUser.success) {
      const { username, password, firstName, lastName } = validatedUser.data;
      //check for any pre existing user
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(411).json({ error: "username already taken !" });
      } else {
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          username,
          password: hashedPassword,
          firstName,
          lastName,
        });
        //assign a random balance to user
        await Account.create({
          userId: newUser._id,
          balance: Math.floor(1 + Math.random() * 10000),
        });
        //create token w userId
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        return res
          .status(200)
          .json({ message: "user created successfully !", token: token });
      }
    } else {
      return res.status(411).json({ error: validatedUser.error });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const handleSignin = async (req, res) => {
  try {
    const validatedUser = loginUserSchema.safeParse(req.body);
    if (validatedUser.success) {
      const { username, password } = validatedUser.data;
      const savedUser = await User.findOne({ username });
      //no existing/registered user
      if (!savedUser)
        return res.status(404).json({ error: "user dosent exists!" });
      //compare passowrds with saved
      const authUser = await bcrypt.compare(password, savedUser.password);
      //password mismatch
      if (!authUser)
        return res.status(404).json({ error: "incorrect password !" });

      const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);
      //set token as cookie
      // res.cookie("token", token, { httpOnly: false });
      res.status(200).json({ message: "login Success !", token });
    } else {
      //validation error
      return res.status(411).json({ error: validatedUser.error });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, username } = await User.findOne({
      _id: userId,
    });
    res.status(200).json({
      user: {
        firstName,
        lastName,
        username,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const userId = req.userId;
    const validatedUser = editUserSchema.partial().safeParse(req.body);
    if (validatedUser.success) {
      const updatedData = validatedUser.data;
      if (updatedData.password) {
        updatedData.password = await bcrypt.hash(updatedData.password, 10);
      }
      await User.updateOne({ _id: userId }, { $set: { ...updatedData } });
      return res.status(200).json({ message: "user updated successfully !" });
    } else {
      res.status(411).json({ error: validatedUser.error });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getBulkUsers = async (req, res) => {
  try {
    const { filter } = req.query;
    //return filter matched users without passowrd field
    const matchedUsers = filter
      ? await User.find(
          {
            $or: [
              { firstName: { $regex: filter, $options: "i" } },
              { lastName: { $regex: filter, $options: "i" } },
            ],
          },
          { firstName: 1, lastName: 1, _id: 1 },
        )
      : await User.find({}, { firstName: 1, lastName: 1, _id: 1 });

    res.status(200).json({ users: matchedUsers });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
