import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import UploadWidget from "../../components/uploadWidget/UploadWidget";


function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  // console.log(currentUser)
  const [formdata, setformdata] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
  const [resError, setResError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e)
    // console.log(e.target.value)
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setResError("");
    setIsLoading(true);
    try {
        const res= await apiRequest.put(`/users/update/${currentUser.id}`,{...formdata,avatar:avatar[0]})
        console.log(res.data)
        updateUser(res.data)
        navigate('/profile')
    } catch (error) {
      // console.error('Error submitting data:', error);
      setResError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>
          {resError && <span>{resError}</span>} 
          <button disabled={isLoading}>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/newpic.jpg"}
          alt="profileImage"
          className="avatar"
        />
        <UploadWidget uwConfig={
         { 
          cloudName:"ayushcloud64",
          uploadPreset:"Estate",
          multiple:false,
          maxImageFileSize:2000000,
          folder:"avatar"
         }
        }
        setState={setAvatar}/>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
