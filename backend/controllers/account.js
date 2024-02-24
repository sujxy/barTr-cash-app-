import User from "../models/user.js";
import Account from "../models/account.js";
import zod from "zod";
import mongoose from "mongoose";

const transferDataSchema = zod.object({
  to: zod.string(),
  balance: zod.number(),
});

export const getAccountBalance = async (req, res) => {
  try {
    const userId = req.userId;
    const accountBalance = await Account.findOne(
      { userId: userId },
      { balance: 1, _id: 0 },
    );
    res.status(200).json(accountBalance);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const handleAccountTransfer = async (req, res) => {
  try {
    //start a secure session : needs replica set
    // const session = mongoose.startSession();
    // session.startTransaction();

    const userId = req.userId;
    const { to, amount } = req.body;

    //find user account
    const userAccount = await Account.findOne({ userId: userId }); //.session(session );
    //check if balance is sufficeint
    if (userAccount.balance < amount) {
      return res.status(411).json({
        error: "insufficeint balance ! couldn't complete transfer",
      });
    }

    //check if target accout is valid
    const targetAccount = await Account.findOne({ userId: to }); //.session(session);
    if (!targetAccount)
      return res.status(401).json({ error: "invalid account !" });

    //decrement user account
    await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }); //.session(session);
    //increment target account
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }); //.session(session);

    //commit session
    //session.commitTransaction();
    //response confirmation
    res.status(200).json({ message: "transaction successfull !" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
