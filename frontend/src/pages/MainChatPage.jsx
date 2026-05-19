import { useLogoutMutation, useLoginMutation } from "../store/api/authApi";
import { useNavigate } from "react-router-dom";
import { useInitialStateQuery } from "../store/api/initialStateApi";

const MainChatPage = () => {
  const navigate = useNavigate();
  const { data, isSuccess } = useLoginMutation()
  const [logout] = useLogoutMutation();
  const logoutHandler = async() => {
    try {
      await logout();
      return navigate('/login');
    } catch(e) {
      alert(e);
    }
  }
  
  const secretInfoHandler = async() => {
    try {
      console.log(data);
    } catch(e) {
      alert(e);
    }
  }

  return (
    <>
      <h1> has authorized</h1>
      <button type="button" onClick={logoutHandler}>logout</button>
      <button type="button" onClick={secretInfoHandler}>get secret info</button>
    </>
  )
}

export default MainChatPage;