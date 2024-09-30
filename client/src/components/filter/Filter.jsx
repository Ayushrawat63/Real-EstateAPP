import { useState } from "react";
import "./filter.scss";
import {useSearchParams} from 'react-router-dom'

function Filter() {
  const [queryParams,setQueryParams]=useSearchParams()
  // console.log(queryParams.get('city'))
  const [filter,setFilter]=useState({
    city:queryParams.get('city') || "",
    type:queryParams.get('type') || "",
    property:queryParams.get('property') || "",
    minPrice:queryParams.get('minPrice') || 0,
    maxPrice:queryParams.get('maxPrice') || 1000000,
    bedroom:queryParams.get('bedroom') || 1,
  })
  const handleChange=(e)=>{
    setFilter((prev)=>{return{...prev,[e.target.name]:e.target.value}})
  }
  const submitHandler=()=>{
    setQueryParams(filter)
  }
  return (
    <div className="filter">
      <h1>
        Search results for <b>{queryParams.get('city') || "Delhi"}</b>
      </h1>
      <form>
      <div className="top">
        <div className="item">

          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={filter.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type"      onChange={handleChange}
            defaultValue={filter.type}>
            <option value="">any</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property"      onChange={handleChange}
            defaultValue={filter.property}>
            <option value="">any</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={filter.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={filter.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={filter.bedroom}
          />
        </div>
        <button onSubmit={submitHandler}>
          <img src="/search.png" alt="" />
        </button>
      </div>
      </form>
    </div>
  );
}

export default Filter;
