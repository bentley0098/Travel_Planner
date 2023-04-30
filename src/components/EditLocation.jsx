import React, { useState } from "react";
import { db } from "../lib/init-firebase";
import { doc, updateDoc } from "@firebase/firestore";

export default function EditLocation() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title === "" || id === "") {
      return;
    }

    const docRef = doc(db, "locations", id);
    // updateDoc is not destructive, it will keep any other fields and simply update the field given to it
    updateDoc(docRef, { title })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.message));
    
    //setDoc is destructive, it will update all fields to what is given to it, removing any left out
    /*
      setDoc(docRef, { title: title })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.message));
    */

    setTitle('');
    setId('');
  }
  return (
    <div>
      <h4>Edit Location</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Location Id</label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <label htmlFor="name">Location Name</label>
        <input
          id="name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Update Location</button>
      </form>
    </div>
  );
}
