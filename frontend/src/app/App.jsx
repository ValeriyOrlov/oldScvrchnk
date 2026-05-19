import MainChatPage from "../pages/MainChatPage";
import { useLogoutMutation, useRefreshQuery } from "../store/api/authApi";
import { useNavigate } from "react-router-dom";

const App = () => {
  //const navigate = useNavigate();

  return <MainChatPage />
}


export default App;