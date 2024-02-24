import { useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { allUsersAtom, tokenAtom, userAtom } from "../state/atoms/user";
import { useEffect } from "react";
import axios from "axios";
import { UserWidget } from "../components/userWidget";
import { BalanceWidget } from "../components/balanceWidget";
import { UserPayment } from "../components/userPayment";

export const Dashboard = () => {
  const [filter, setFilter] = useState("");
  const [allUsers, setAllUsers] = useRecoilState(allUsersAtom);
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    const getAllUser = async () => {
      const { data } = await axios.get(`/user/bulk?filter=${filter}`);
      setAllUsers(data.users);
    };
    getAllUser();
  }, [filter, setAllUsers]);

  return (
    <div className="w-screen">
      {/* navbar */}
      <div className="sticky top-0 flex w-full items-center justify-between bg-white px-6 py-3 shadow-md">
        <h1 className="font-base font-base text-3xl">
          Bar<span className="font-bold italic text-green-500 ">tr</span>
        </h1>
        <UserWidget />
      </div>
      <div className="min-h-[100vh] w-full border  px-4 py-4 sm:mx-auto sm:w-3/4">
        {token && <BalanceWidget />}
        {/* search */}
        <h1 className=" ml-1 mt-3  text-xl font-semibold">Users</h1>
        <div className="my-2 w-full rounded-lg border p-1">
          <input
            className="w-4/5   px-2   text-gray-500 outline-none"
            type="text"
            placeholder="Search for a friend..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className=" w-1/5 rounded-lg bg-black py-2 text-center text-white transition-all hover:bg-gray-800">
            Search
          </button>
        </div>
        {/* user list */}
        <div className="mt-4 w-full">
          {allUsers?.map((user) => {
            return (
              <UserPayment
                key={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                _id={user._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
