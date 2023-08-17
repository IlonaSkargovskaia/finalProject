
# TicketPRO - Event Ticket Booking Web Application

![Project Preview](https://github.com/IlonaSkargovskaia/finalProject/blob/master/1.png)

Web application for booking event tickets. Users can view event details, purchase tickets, and select seats in an interactive hall. The application uses React for the frontend, integrates with a backend API Node.js, PostgreSQL, JWT for authentication and utilizes the `react-leaflet` library for displaying event locations on maps. Also I used AWS S3 to store images what users upload to the web application.

## Features

- View detailed information about events, including title, description, date, location, and available seats.
- Purchase event tickets and select specific seats in an interactive hall layout.
- Authorization system to ensure only authorized users can purchase tickets, and separate "organizers" who can create new event, update, delete them.
- Display event locations on maps using the `react-leaflet` library with OpenStreetMap tiles.
- Users can view the total price of selected tickets and available tickets in real-time
- After successfull purchase every user get on his email personal QR code for each seat

## Technologies Used

- React: Building the dynamic user interface.
- React Router: Managing different pages and navigation.
- Axios: Handling HTTP requests to the backend API.
- qrcode: generate QR codes
- uuid: create unique id to every seat
- AWS-SDK: upload images to Amazon cloud
- `react-leaflet`: Displaying event locations on maps.
- Bootstrap: Styling and layout components.
- JWT and decode: authentication using token
- LocalStorage: store tokens during expire time
- BCrypt: user's passwords
- Nodemailer: send emails with details and QR codes
- Context API: Managing global state and user authentication.
- Toastify: Displaying user notifications.

## Installation and Setup

1. Clone this repository: `git clone [https://github.com/your-username/event-ticket-app.git](https://github.com/IlonaSkargovskaia/finalProject)`
2. Install dependencies: `npm install`
3. Start the development server Node.js and in folder "client": `npm start`

## Credits

This project was created by [Ilona Skargovskaia](https://github.com/IlonaSkargovskaia). Feel free to contribute, report issues, or suggest improvements. Contact me at [ilona.skars@gmail.com](mailto:ilona.skars@gmail.com).


