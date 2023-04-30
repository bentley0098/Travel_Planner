import React, { useState } from "react";
import { addDoc } from "@firebase/firestore";
import { locationCollectionRef } from "../lib/firestore.collections";

export default function AddLocation(location) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title === "") {
      return;
    }

    var position = [location.location.lat, location.location.lng];

    addDoc(locationCollectionRef, { title, position })
      .then((response) => {
        console.log(response.id);
      })
      .catch((err) => {
        console.log(err.message);
      });
      
    setTitle('');
    // To style button and show toast after it is clicked
    var addLocToast = document.querySelector(".addLoc__toast");
    var addLocContainer = document.querySelector(".addLoc__container");

    addLocToast.classList.remove("show");
    addLocContainer.classList.remove("show");
  }
  return (
    <div className="addLoc__container">
      <h4 className="addLoc__header">Add Location</h4>
      <form className="addLoc__form" onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          value={title}
          className="addLoc__title"
          placeholder="Location Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="addLoc__submit">Add</button>
      </form>
    </div>
  );
}
