Final Capstone: Restaurant Reservation System:Periodic Table

Link to the deployed app: https://final-capstone-resturant.herokuapp.com/dashboard

This is a fullstack application built using the following:

- HTML
- CSS
- JavaScript
- React
- Knex
- PostgreSQL 
- CORS
- Node.js

Available ApI EndPoints 

| API Endpoint                  | Description                                           |
| ------------------------------| ------------------------------------------------------|
| `/reservations`               | POST: Creates a new reservation                       |
| `/reservations/:reservationId`| GET:	Reads a reservation by reservation_id           |
| `/reservations/:reservationId`| PUT:	Updates a reservation by reservation_id         |
| `/tables`	                    | POST:	Creates a New Table                             |
| `/tables`	                    | GET:	reads all the tables                            |
| `/tables/:table_id/seat`	    | PUT: Updates a seat reservation for a table           |
| `/tables/:table_id/seat`	    | Delete: finishes an occupied table after being done   |


App Functionality 
-----------------------------------------------------------------------------------------
This App will let an user book a reservation using their first name, last name, mobile number, number of people, date and time for the reservation if available. An user can also create a table for new reservations. When a reservation table is not occupied, it can be deleted. Reservations can also be searched using client's mobile number. Reservation can also be edited and canceled using this application. When the reservation is cancelled it will no longer show on the dashboard.

DashBoard :
(front-end/.screenshots/us-01-submit-after.png?raw=true)

New Reservation:

(front-end/.screenshots/us-02-reservation-almost-closing-before.png?raw=true)

Edit Reservation:

(front-end/.screenshots/us-08-edit-reservation-cancel-before.png?raw=true)

New Table:
(front-end/.screenshots/us-04-create-table-cancel-before.png?raw=true)

Seat Reservation:

(front-end/.screenshots/us-04-seat-reservation-start.png?raw=true)


Installation
-----------------------------------------------------------------------------------------
Fork and clone this repository.

Run cp ./back-end/.env.sample ./back-end/.env.

Update the ./back-end/.env file with the connection URL's to your ElephantSQL database instance.

Run cp ./front-end/.env.sample ./front-end/.env.

You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5000.

Run npm install to install project dependencies.

Run npm run start:dev to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.