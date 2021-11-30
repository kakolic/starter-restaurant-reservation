Final Capstone: Restaurant Reservation System:Periodic Table

Link to the deployed app: https://front-end-kakolic.vercel.app/dashboard

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
![Dashboard](https://user-images.githubusercontent.com/71792509/143775634-1f4ef196-417a-48af-9a81-916734b07fd3.png)


New Reservation:

![New Reservation](https://user-images.githubusercontent.com/71792509/143775659-e39008da-32fb-4733-ad49-2f1c4d5e0fa6.png)

Edit Reservation:

![Edit Reservation](https://user-images.githubusercontent.com/71792509/143775861-debae6c9-29b1-410e-9668-0849ada2f473.png)

New Table:

![New Table](https://user-images.githubusercontent.com/71792509/143775674-f9ea1a0a-ebf9-4719-b8ee-7a1b62b08896.png)

Search Reservation:
![Search](https://user-images.githubusercontent.com/71792509/143775692-30b9e9db-2891-421e-a070-8da6a8fab39e.png)


Seat Reservation:

![Seat Reservation](https://user-images.githubusercontent.com/71792509/143775789-0faf0d0b-d1fb-40e8-b3da-1e98752608bc.png)


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
