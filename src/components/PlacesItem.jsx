import React from "react";

export default function PlacesItem({
  title,
  description,
  handlePlaceItemSelect,
  handleDelete,
}) {
  return (
    <div className="card my-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="btn-close text-left"
          aria-label="Close"
          onClick={handleDelete}
        ></button>
        <button
          type="button"
          className="btn btn-default btn-lg"
          onClick={handlePlaceItemSelect}
        >
          <span
            className="glyphicon glyphicon-pencil"
            aria-hidden="true"
          ></span>
          Edit
        </button>
      </div>
    </div>
  );
}
