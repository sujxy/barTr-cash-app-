import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { Dashboard } from "./pages/dashboard";
import { SendMoney } from "./pages/sendmoney";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "./state/atoms/user";

function App() {
  const token = useRecoilValue(tokenAtom);

  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route index element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
