import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputBox } from "../components/inputBox";
import { ActionButton } from "../components/actionButton";
import axios from "axios";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { data } = await axios.post("/user/signup", {
      firstName,
      lastName,
      username,
      password,
    });
    if (data.message) {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-1/5 rounded-lg  border p-4 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold">Sign Up</h1>
        <h1 className="mb-6 text-center  text-sm font-light leading-5 text-gray-400">
          Enter your details to create an account
        </h1>
        <InputBox
          value={firstName}
          setValue={setFirstName}
          label={"First Name"}
        />
        <InputBox
          value={lastName}
          setValue={setLastName}
          label={"First Name"}
        />
        <InputBox value={username} setValue={setUsername} label={"Username"} />
        <InputBox value={password} setValue={setPassword} label={"Password"} />
        <ActionButton onClick={handleSignUp} text={"Sign Up"} />

        <h3 className="mt-2 text-center text-sm ">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
};
