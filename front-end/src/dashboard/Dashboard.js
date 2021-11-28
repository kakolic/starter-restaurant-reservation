import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable, cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "./Reservations";
import Tables from "./Tables";
import { useHistory } from "react-router";
import { previous, next, today, formatDateWithDay } from "../utils/date-time";

function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new window.AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables().then(setTables)
    return () => abortController.abort();
  }

  function HandleCancel(reservation_id) {
    cancelReservation(reservation_id)
      .then(loadDashboard)
      .catch(setReservationsError);
  }

  function handleFinish(table_id, reservation_id) {
    finishTable(table_id, reservation_id)
      .then(loadDashboard)
  }

  return (
    <main className="text-center mt-3 font">
      <h1>Dashboard</h1>
      <div className="mb-3" role="group" aria-label="Date Buttons">
        <button className="btn btn-dark mr-2" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
        <button className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
        <button className="btn btn-dark ml-2" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      </div>
      <div className="d-md-flex mb-3 justify-content-center pt-2">
        <h4 className="mb-0">Reservations for {formatDateWithDay(date)}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations} onCancel={HandleCancel} />
      <div className="d-md-flex mb-3 justify-content-center pt-4">
        <h4 className="mb-0">Tables</h4>
      </div>
      <Tables onFinish={handleFinish} tables={tables} />
    </main>
  );
}

export default Dashboard;