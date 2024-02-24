import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const BalanceWidget = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      const { data } = await axios.get("/account/balance");
      if (data) {
        setBalance(data.balance);
      }
    };

    getBalance();
  }, []);

  return (
    <div className="my-4 flex w-full flex-wrap items-center justify-evenly rounded-md bg-emerald-500 px-2 py-6 text-lg text-white sm:w-1/4 ">
      <h1 className="font-normal">Your Balance </h1>
      <h1 className="font-bold">₹ {!balance ? "Loading..." : balance} </h1>
    </div>
  );
};
