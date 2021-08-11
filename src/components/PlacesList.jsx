import React, { useEffect, useRef, useState } from "react";
import PlacesItem from "./PlacesItem";
import { of } from "await-of";
import { db } from "../firebase/firebase";

import { useList } from "react-firebase-hooks/database";
const placesDummy = [
  { title: "Place1", description: "Birth place" },
  { title: "Place2", description: "home" },
];

const newPlace = {
  title: "",
  description: "",
  key: "new",
};
export default function PlacesList() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [places, setPlaces] = useState(placesDummy);
  const [error, setError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(newPlace);
  const [dbPlaces, placesLoading, placesLoadingError] = useList(
    db.places.getAll()
  );
  useEffect(() => {
    titleRef.current.value = selectedPlace.title;
    descriptionRef.current.value = selectedPlace.description;
  }, [selectedPlace]);
  useEffect(() => {
    const places = [];
    dbPlaces.map((v) => places.push({ key: v.key, ...v.val() }));
    setPlaces(places);
  }, [dbPlaces]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("ok");
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    if (!(title.length && description.length))
      return setError("title or description can not be empty");
    const data = { title, description };
    console.log(selectedPlace, "selectedPlace");
    if (selectedPlace.key !== "new") {
      const [, updateResultError] = await of(
        db.places.update(selectedPlace.key, data)
      );
      if (updateResultError) return setError(updateResultError.message);
    } else {
      const [, saveResultError] = await of(db.places.create(data));
      if (saveResultError) return setError(saveResultError.message);
    }

    setError("data saved to database");
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    // console.log(saveResult);
  };
  const handlePlaceItemSelect = (place) => {
    // console.log(place);
    setSelectedPlace({ ...place });
  };
  const handleDelete = (key) => {
    db.places.remove(key);
  };
  const handleNew = (e) => {
    e.preventDefault();
    setSelectedPlace({ ...newPlace });
  };
  return (
    <div className="container mt-3">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {placesLoadingError && (
        <div className="alert alert-danger" role="alert">
          {placesLoadingError}
        </div>
      )}
      <div className="row">
        <div className="col-6">
          {places.map((place, index) => (
            <PlacesItem
              {...place}
              key={index}
              handlePlaceItemSelect={() => handlePlaceItemSelect(place)}
              handleDelete={() => handleDelete(place.key)}
            />
          ))}
        </div>
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="place-name" className="form-label">
                Place Title
              </label>
              <input
                type="text"
                className="form-control"
                id="place-name"
                ref={titleRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="place-description" className="form-label">
                Place Description
              </label>
              <input
                type="text"
                className="form-control"
                id="place-description"
                ref={descriptionRef}
              />
            </div>

            <button type="submit" className="btn btn-primary m-3">
              Submit
            </button>
            <button className="btn btn-info m-3" onClick={(e) => handleNew(e)}>
              New
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
