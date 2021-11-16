const knex = require("../db/connection");
const tableName = "reservations"

// list reservations by date, sorted by time
function list(date, mobile_number) {
    if (date) {
      return knex(tableName)
        .select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_time", "asc");
    }
  
    if (mobile_number) {
      return knex(tableName)
        .select("*")
        .where("mobile_number", "like", `${mobile_number}%`);
    }
  
    return knex(tableName).select("*");
  }
  

// post a new reservation
function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

// reads a reservation by reservation_id
function read(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .then((returnedRecords) => returnedRecords[0]);
}

// updates a reservation status
function update(updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*")
        .then((updatedReservations) => updatedReservations[0]);

}

// finds a reservation by phone number
// function find(mobile_number) {
//     return knex("reservations")
//       .whereRaw(
//         "translate(mobile_number, '() -', '') like ?",
//         `%${mobile_number.replace(/\D/g, "")}%`
//       )
//       .orderBy("reservation_date");
//   }
function edit(reservation_id, reservation) {
    return knex(tableName)
      .where({ reservation_id: reservation_id })
      .update({ ...reservation })
      .returning("*");
  }

module.exports = {
    list,
    create,
    read,
    update,
    edit,
}