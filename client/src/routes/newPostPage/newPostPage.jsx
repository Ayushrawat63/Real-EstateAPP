import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
function NewPostPage() {
  const [resError, setResError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  // console.log(image)
  const navigate=useNavigate()
  const [desc, setDesc] = useState("");
  const handleChange = (value) => {
    console.log(value);
    setDesc(value);
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formdata = new FormData(e.target);
    const inputs = Object.fromEntries(formdata);

    // console.log(inputs)
    try {
      const res = await apiRequest.post("/posts/add", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          images: image,
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          type: inputs.type,
          property: inputs.property,
        },
        postDetails: {
          desc: desc,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: parseInt(inputs.income),
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      console.log(res.data);
      navigate('/'+res.data.id)
    } catch (err) {
      console.log(err.message);
      setResError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={SubmitHandler}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill
                value={desc}
                onChange={handleChange}
                placeholder="Write your description here..."
              />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="Rent" defaultChecked>
                  Rent
                </option>
                <option value="Buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button disabled={isLoading} className="sendButton">
              Add
            </button>
            {resError && <span>{resError}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {image.map((elem, index) => {
          // console.log(elem)
          return (
            <>
              <img src={elem} key={index} alt="new image" />
            </>
          );
        })}
        <UploadWidget
          uwConfig={{
            mutiple: true,
            cloudName: "ayushcloud64",
            uploadPreset: "Estate",
            folder: "posts",
          }}
          setState={setImage}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
