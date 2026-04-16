# Practical 7 Backend

This workspace now includes a Node.js backend for JWT authentication, protected routes, image upload, validation, and a mock payment endpoint.

## Backend Structure

- `server.js` - Express server, MongoDB connection, static uploads, payment route
- `models/` - `User` and `Product` schemas
- `routes/` - auth and product APIs
- `middleware/` - JWT auth and validation helpers
- `uploads/` - stored product images

## Install

The required backend packages are already installed in this workspace. If you need to reinstall them, run:

```bash
npm install express mongoose dotenv jsonwebtoken bcryptjs multer cors express-validator
```

## Environment

Create a `.env` file with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_practical
JWT_SECRET=mysecretkey
```

## Run

Start MongoDB locally, then run:

```bash
npm run server
```

Open `http://localhost:5000` and you should see `API Running`.

## API Flow in Postman

1. `POST /api/auth/register` with `{ "email": "test@gmail.com", "password": "123456" }`
2. `POST /api/auth/login` with the same credentials and copy the returned token
3. `POST /api/products` with `Authorization: Bearer <token>` and form-data fields `name`, `price`, and `image`
4. `GET /api/products` to list all products
5. `POST /api/payment` with `{ "amount": 500 }` to trigger the mock payment success response

## Notes

- Uploaded images are served from `/uploads/<filename>`
- The protected product create route requires a valid JWT token
- Validation errors are returned in a structured JSON format
