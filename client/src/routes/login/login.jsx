import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
  });
  const [resError,setResError]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  const {updateUser}=useContext(AuthContext)

  const navigate=useNavigate();

  const handleChange = (e) => {
    // console.log(e)
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const submitHandler =  async(e) => {
    e.preventDefault();
    setResError("")
    setIsLoading(true)
    try{
       const res= await apiRequest.post("/auth/login",formdata) ;
      //  console.log(res)
      //  console.log(res.data)
       updateUser(res.data)
       navigate('/')
    }
    catch(error){
      console.error('Error submitting data:', error);
      setResError(error.response.data.message)
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h1>Welcome back</h1>
          <input name="username" type="text" value={formdata.username} onChange={handleChange} placeholder="Username" required />
          <input name="password" type="password" value={formdata.password} onChange={handleChange} placeholder="Password" required />
          <button disabled={isLoading} >Login</button>
          {resError && <span>{resError}</span>} 
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
