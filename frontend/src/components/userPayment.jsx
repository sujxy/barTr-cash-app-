import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../state/atoms/user";

export const UserPayment = ({ firstName, lastName, _id }) => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenAtom);
  const handleSendMoney = () => {
    if (!token) {
      navigate("/signin");
    } else {
      navigate(`/send?id=${_id}&name=${firstName}`);
    }
  };
  return (
    <div className="flex items-center justify-between p-1">
      <div className="flex items-center justify-start gap-3">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 p-4">
          {firstName[0].toUpperCase()}
        </div>
        <h2 className="text-lg font-light">
          {" "}
          {firstName} {lastName}
        </h2>
      </div>
      <button
        onClick={handleSendMoney}
        className="rounded-md bg-black px-4 py-2 text-center text-sm font-light text-white transition-all hover:bg-gray-800"
      >
        Send Money
      </button>
    </div>
  );
};
