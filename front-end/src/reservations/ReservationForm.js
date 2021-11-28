import React from "react"
import {useState} from "react"
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationErrors from "./ReservationError";

function ReservationForm() {
    const history = useHistory();
    const initialState = {
        "first_name": "",
        "last_name": "",
        "mobile_number": "",
        "reservation_date": "",
        "reservation_time": "",
        "people": ""
    }

    const [reservation, setReservation] = useState(initialState);

    
    function changeHandler({ target: { name, value } }) {
      setReservation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    function changeHandlerNum({ target: { name, value } }) {
      setReservation((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    }

    const [error, setError] = useState(null);


    function validate(reservation){

        const errors = []

        function isFutureDate({ reservation_date, reservation_time }) {
          const date = new Date(`${reservation_date}T${reservation_time}`);
          if (date < new Date()) {
              errors.push(new Error("Reservation must be in the future."));
          }
        }

        function isTuesday({ reservation_date }) {
          const day = new Date(reservation_date).getUTCDay();
          if (day === 2) {
            errors.push(new Error("No reservations available on Tuesday."));
          }
        }

        function isOpenHours({ reservation_time }) {
          const hour = parseInt(reservation_time.split(":")[0]);
          const mins = parseInt(reservation_time.split(":")[1]);

          if (hour <= 10 && mins <= 30) {
              errors.push(new Error("Reservations are only allowed between 10:30am and 9:30pm."));
          }

          if (hour >= 22) {
              errors.push(new Error("Reservations are only allowed between 10:30am and 9:30pm."));
          }
        }

        isFutureDate(reservation);
        isTuesday(reservation);
        isOpenHours(reservation);

        return errors;
    }


    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        const reservationErrors = validate(reservation);

        // console.log(reservationErrors);
        if (reservationErrors.length) {
          return setError(reservationErrors);
        }

        createReservation(reservation)
        .then((createdReservation) => {
          const res_date = createdReservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
          history.push(
          `/dashboard?date=`+res_date
          )
        })
      .catch(setError);
    }

    return (
        <form onSubmit={submitHandler}>
            <ReservationErrors errors={error} />
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">First name:</label>
                <div className="col-sm-10">
                    <input className="form-control" name="first_name" placeholder="First Name" value={reservation.first_name} required="required" onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Last name:</label>
                <div className="col-sm-10">
                    <input className="form-control" name="last_name" placeholder="Last Name" value={reservation.last_name} required="required" onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Mobile Number:</label>
                <div className="col-sm-10">
                    <input className="form-control" name="mobile_number" type="tel" placeholder="555-555-5555" value={reservation.mobile_number} required="required" onChange={changeHandler}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Reservation Date:</label>
                <div className="col-sm-10">
                    <input className="form-control" name="reservation_date" type="date" value={reservation.reservation_date} required="required" onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"> Reservation Time:</label>
                <div className="col-sm-10">
                    <input className="form-control" name="reservation_time" type="time" value={reservation.reservation_time} required="required" onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Number of people in the Party:</label>
                <div className="col-sm-10">
                    <input className="form-control" name="people" type="number" required="required" placeholder = "0" value={reservation.people} onChange={changeHandlerNum} />
                </div>
            </div>
            <button className="btn btn-success mr-2 mb-2" type="submit">Submit</button>
            <button className="btn btn-secondary mb-2" type="button" onClick={() => history.goBack()}>Cancel</button>
        </form>
    )
}

export default ReservationForm;