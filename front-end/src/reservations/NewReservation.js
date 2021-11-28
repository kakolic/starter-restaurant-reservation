import React from "react"
import ReservationForm from "./ReservationForm";

function NewReservation() {
  return (
    <main className="font mt-2">
      <h1 className="text-center"> Create a New Reservation </h1>
      <ReservationForm />
    </main>
  );
}


export default NewReservation;