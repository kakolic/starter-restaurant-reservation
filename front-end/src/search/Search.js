import React, { useState } from "react";
import {listReservations } from "../utils/api";
import Reservations from "../dashboard/Reservations";

function Search() {
  const [reservations, setReservations] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showResults, setShowResults] = useState(false);

  function handleChange({ target: { value } }) {
    setMobileNumber(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    search();
  }

  function search() {
    setShowResults(false);
    listReservations({ mobile_number: mobileNumber })
      .then(setReservations)
      .then(() => setShowResults(true))
  }

  return (
    <main className="text-center font mt-2">
      <h1>Search Reservations</h1>
      <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="form-group col-md-4 col-sm-12">
              <label htmlFor="mobile_number">Search with Mobile Number</label>
              <div className="input-group">
                <input type="text" id="mobile_number" name="mobile_number" className="form-control" placeholder = "555-5555-5555" value={mobileNumber} onChange={handleChange}/>
                <div className="input-group-append">
                  <button type="submit" className="btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>
      </form>
      {showResults && (
        <Reservations reservations={reservations} />
      )}
    </main>
  );
}

export default Search;