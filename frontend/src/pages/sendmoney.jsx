import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("id");
  const firstName = searchParams.get("name");

  const handleTransfer = async () => {
    const { data } = await axios.post(
      "/account/transfer",
      { to: userId, amount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (data.message) {
      navigate("/");
    }
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-1/4 rounded-lg  border px-6 py-4 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold ">Send Money</h1>
        <div className="mb-3 mt-6 flex items-center justify-start gap-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 p-4">
            {"Sujay".split("")[0].toUpperCase()}
          </div>
          <h2 className="text-lg font-light"> {firstName}</h2>
        </div>
        <h3 className="my-1 text-xs font-semibold">Amount(₹)</h3>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="text"
          name="amount"
          className="mb-2 w-full rounded-md border px-2 py-2 text-sm text-gray-500 outline-none"
        />

        <button
          onClick={handleTransfer}
          className="my-1 w-full rounded-md  bg-emerald-500 py-2 text-center text-white transition-all hover:underline"
        >
          Transfer Amount
        </button>
      </div>
    </div>
  );
};
