import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from '../../lib/apiRequest'
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const {currentUser,updateUser}= useContext(AuthContext)
  // console.log(currentUser)
  const navigate=useNavigate();
  const data = useLoaderData()
  console.log(data.postsResponse)
  const handleLogout=async()=>{
    try{
      await apiRequest.post('/auth/logout')
      //  console.log(res.data)
       updateUser(null)
       navigate('/')
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/newpic.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to='/add'>
            <button>Create New Post</button>
            </Link>
          </div>
             <Suspense fallback={<p>Loading....</p>}>
             <Await resolve={data.postsResponse} errorElement={<p>Error in loading posts</p>}>
               {(postsResponse)=><List posts={postsResponse.data.posts}></List>}
             </Await>
             </Suspense>

          <div className="title">
            <h1>Saved List</h1>

          </div>
          <Suspense fallback={<p>Loading....</p>}>
             <Await resolve={data.postsResponse} errorElement={<p>Error in loading posts</p>}>
               {(postsResponse)=><List posts={postsResponse.data.savedPosts}></List>}
             </Await>
             </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
