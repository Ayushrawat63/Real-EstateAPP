import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"


const singlePageLoader=async ({request,params})=>{
    const res= await apiRequest(`/posts/${params.id}`);
    return res.data
}

const listPageLoader=async({request,params})=>{
    const query= request.url.split("?")[1]
    const postsPromise=  apiRequest("/posts?"+ query);
    return defer({
       postsResponse:postsPromise
    })
    
}
const profilePageLoader=async()=>{
    const postsPromise=  apiRequest("/users/profilePosts");
    return defer({
       postsResponse:postsPromise
    })
    
}

export {singlePageLoader ,listPageLoader ,profilePageLoader}