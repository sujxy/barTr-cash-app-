import { useRecoilState, useRecoilValue } from "recoil";

import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { tokenAtom, userAtom } from "../state/atoms/user";

export const UserWidget = () => {
  const user = useRecoilValue(userAtom);
  const [token, setToken] = useRecoilState(tokenAtom);
  if (!token)
    return (
      <Link
        className="rounded-lg border border-emerald-600 px-3 py-1 text-center text-emerald-600 hover:bg-emerald-600 hover:text-white"
        to="/signin"
      >
        Sign In
      </Link>
    );
  return (
    <div className="flex items-center justify-evenly gap-3">
      <h2 className="text-lg font-light">
        {user ? `Hello, ${user?.firstName}` : "Loading..."}
      </h2>
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 p-4">
        {user ? user?.firstName[0] : "Loading..."}
      </div>
      <button
        onClick={() => {
          setToken("");
          localStorage.clear("token");
        }}
      >
        <LogOut className="hover:text-red-600" />
      </button>
    </div>
  );
};
