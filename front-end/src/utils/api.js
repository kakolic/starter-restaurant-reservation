/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
 import formatReservationDate from "./format-reservation-date";
 import formatReservationTime from "./format-reservation-date";
 
 const API_BASE_URL =
   process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
 
 /**
  * Defines the default headers for these functions to work with `json-server`
  */
 const headers = new Headers();
 headers.append("Content-Type", "application/json");
 
 /**
  * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
  *
  * This function is NOT exported because it is not needed outside of this file.
  *
  * @param url
  *  the url for the requst.
  * @param options
  *  any options for fetch
  * @param onCancel
  *  value to return if fetch call is aborted. Default value is undefined.
  * @returns {Promise<Error|any>}
  *  a promise that resolves to the `json` data or an error.
  *  If the response is not in the 200 - 399 range the promise is rejected.
  */
 async function fetchJson(url, options, onCancel) {
   try {
     const response = await fetch(url, options);
 
     if (response.status === 204) {
       return null;
     }
 
     const payload = await response.json();
 
     if (payload.error) {
       return Promise.reject({ message: payload.error });
     }
     return payload.data;
   } catch (error) {
     if (error.name !== "AbortError") {
       console.error(error.stack);
       throw error;
     }
     return Promise.resolve(onCancel);
   }
 }
 
 /**
  * Retrieves all existing reservations.
  * @returns {Promise<[reservation]>}
  *  a promise that resolves to a possibly empty array of reservations saved in the database.
  */
 export async function listReservations(params, signal) {
   const url = new URL(`${API_BASE_URL}/reservations`);
   Object.entries(params).forEach(([key, value]) =>
     url.searchParams.append(key, value.toString())
   );
   return await fetchJson(url, { headers, signal }, [])
     .then(formatReservationDate)
     .then(formatReservationTime);
 }
 
 /**
  * Retrieves all existing tables.
  * @returns {Promise<[table]>}
  *  a promise that resolves to a possibly empty array of tables saved in the database.
  */
 export async function listTables(signal) {
   const url = `${API_BASE_URL}/tables`;
   return await fetchJson(url, { headers, signal }, []);
 }
 
 /**
  * Creates a new reservation.
  */
 export async function createReservation(reservation, signal) {
   const url = `${API_BASE_URL}/reservations`;
   const options = {
     method: "POST",
     headers,
     body: JSON.stringify({ data: reservation }),
     signal,
   };
   return await fetchJson(url, options, reservation);
 }
 
 /**
  * Creates a new table.
  */
 export async function createTable(table, signal) {
   const url = `${API_BASE_URL}/tables`;
   const options = {
     method: "POST",
     headers,
     body: JSON.stringify({ data: table }),
     signal,
   };
   return await fetchJson(url, options, table);
 }
 
  /**
  * Seats a reservation at the given table. Updates table with reservation_id
  */
 export async function seatReservation(reservation_id, table_id) {
   const url = `${API_BASE_URL}/tables/${table_id}/seat`;
   const options = {
     method: "PUT",
     body: JSON.stringify({ data: { reservation_id } }),
     headers,
   };
   return await fetchJson(url, options, {});
 }
 
  /**
  * Retrieves an individual reservation given a reservation_id.
  */
 export async function readReservation(reservation_id, signal) {
   const url = `${API_BASE_URL}/reservations/${reservation_id}`;
   return await fetchJson(url, { headers, signal }, {})
     .then(formatReservationDate)
     .then(formatReservationTime)
 }
 
  /**
  * Removes the reservation from the given table and makes the table available to seat new guests.
  */
 export async function finishTable(table_id, reservation_id) {
   const url = `${API_BASE_URL}/tables/${table_id}/seat`;
   const options = {
     method: "DELETE",
     headers,
   };
   return await fetchJson(url, options, {});
 }
 
  /**
  * Updates the reservation with the given resrevation_id status to 'cancelled'.
  */
 export async function cancelReservation(reservationId, signal) {
   const url = `${API_BASE_URL}/reservations/${reservationId}/status`;
   const options = {
     method: "PUT",
     headers,
     body: JSON.stringify({
       data: {
         status: "cancelled",
       },
     }),
     signal,
   };
   return await fetchJson(url, options, {});
 }
 
  /**
  * Updates the reservation with the given reservation_id.
  */
 export async function updateReservation(reservation, signal) {
   const { reservation_date, reservation_time, reservation_id } = reservation;
   const url = `${API_BASE_URL}/reservations/${reservation_id}`;
 
   const data = {
     ...reservation,
     reservation_date: Array.isArray(reservation_date)
       ? reservation_date[0]
       : reservation_date,
     reservation_time: Array.isArray(reservation_time)
       ? reservation_time[0]
       : reservation_time,
   };
 
   const options = {
     method: "PUT",
     headers,
     body: JSON.stringify({ data }),
     signal,
   };
   const response = await fetchJson(url, options, reservation);
 
   return Array.isArray(response) ? response[0] : response;
 }
 
