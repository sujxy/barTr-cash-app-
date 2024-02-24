import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputBox } from "../components/inputBox";
import { ActionButton } from "../components/actionButton";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../state/atoms/user";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useSetRecoilState(tokenAtom);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data } = await axios.post("/user/signin", { username, password });
    if (data.message) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-1/5 rounded-lg  border p-4 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold">Sign In</h1>
        <h1 className="mb-6 text-center  text-sm font-light leading-5 text-gray-400">
          Enter your details to access your account
        </h1>

        <InputBox value={username} setValue={setUsername} label={"Username"} />
        <InputBox value={password} setValue={setPassword} label={"Password"} />

        <ActionButton onClick={handleLogin} text={"Sign In"} />

        <h3 className="mt-2 text-center text-sm ">
          Dont have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </h3>
      </div>
    </div>
  );
};
