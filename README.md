# TravelMate Frontend

TravelMate is a travel itinerary planner web application that helps users plan, manage, and share their travel itineraries. This is the frontend repository built using React, TypeScript, Redux, and Redux Thunk.

## Features
- User authentication (Login & Sign-up)
- Create, update, and delete itineraries
- Add destinations and activities
- Search and filter itineraries
- Share itineraries with others

## Tech Stack
- **Frontend**: React, TypeScript
- **State Management**: Redux, Redux Thunk
- **Backend API**: Node.js with Prisma and MySQL ([TravelMate Backend Repository](https://github.com/nethmiumaya/TavelMate-Backend.git))

## Setup & Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (>= 16.x)
- npm or yarn

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/nethmiumaya/TavelMate-Frontend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd TravelMate-Frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
4. Start the development server:
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```

## Configuration
### Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## API Endpoints
This frontend interacts with the following backend API endpoints:
- **Authentication**:
  - Sign-up: `POST /api/auth/signup`
  - Login: `POST /api/auth/login`
- **Itineraries**:
  - Create: `POST /api/itineraries`
  - Get all: `GET /api/itineraries`
  - Get single: `GET /api/itineraries/:id`
  - Update: `PUT /api/itineraries/:id`
  - Delete: `DELETE /api/itineraries/:id`

## Folder Structure
```
TravelMate-Frontend/
│── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── redux/          # Redux store and slices
│   ├── services/       # API service functions
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── App.tsx        # Main app entry point
│   ├── index.tsx      # React entry file
│── public/            # Static assets
│── .env               # Environment variables
│── package.json       # Project dependencies
│── README.md          # Project documentation
│── LICENSE            # License file
```
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or contributions, reach out to the repository owner.

