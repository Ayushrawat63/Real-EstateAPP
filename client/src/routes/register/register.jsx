import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [resError,setResError]=useState("")
  const [isLoading,setIsLoading]=useState(false)

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
        await apiRequest.post("/auth/register",formdata) ;
      //  console.log(res)
      //  console.log(res.data)
       navigate('/login')
    }
    catch(error){
      // console.error('Error submitting data:', error);
      setResError(error.response.data.message)
    }
    finally{
      setIsLoading(false)
    }

  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={submitHandler} autoComplete="off" >
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            value={formdata.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            name="email"
            type="text"
            value={formdata.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button disabled={isLoading}>Register</button>
          {resError && <span>{resError}</span>} 
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
