Certainly! Below is a consolidated and polished version of the README for your Express.js server and Next.js frontend projects:

---

# Pesto Service

## Description

Pesto Service is a robust Express.js server starter template, featuring Prisma, authentication, AWS S3 integration, and more.

## Getting Started

### Prerequisites

Ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/i-am-dev-Siddhesh/pesto-task-mgmt
   ```

2. Install dependencies:

   ```bash
   cd pesto-service
   npm install
   ```

3. Set up your environment variables:

   Create a `.env` file in the root of your project with the necessary environment variables:

   ```env
   SERVER_ENV=development
   PORT=3000
   API_KEY=your_api_key
   DOMAIN=your_domain
   CLIENT_URL=http://localhost:3000
   DATABASE_URL=your_database_url
   JWT_TOKEN_SECRET=your_jwt_token_secret
   JWT_REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
   JWT_ADMIN_TOKEN_SECRET=your_jwt_admin_token_secret
   AWS_S3_BUCKET_NAME=your_s3_bucket_name
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=your_aws_region
   ```

### Usage

- Build the project:

  ```bash
  npm run build
  ```

- Start the server:

  ```bash
  npm start
  ```

- For development with automatic restarts:

  ```bash
  npm run dev
  ```

## Dependencies

- [@prisma/client](https://www.prisma.io/)
- [argon2](https://www.npmjs.com/package/argon2)
- [aws-sdk](https://www.npmjs.com/package/aws-sdk)
- [axios](https://www.npmjs.com/package/axios)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [form-data](https://www.npmjs.com/package/form-data)
- [joi](https://www.npmjs.com/package/joi)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [morgan](https://www.npmjs.com/package/morgan)
- [multer](https://www.npmjs.com/package/multer)
- [nanoid](https://www.npmjs.com/package/nanoid)
- [prisma](https://www.prisma.io/)

## Development Dependencies

- [@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser)
- [@types/cors](https://www.npmjs.com/package/@types/cors)
- [@types/express](https://www.npmjs.com/package/@types/express)
- [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken)
- [@types/morgan](https://www.npmjs.com/package/@types/morgan)
- [@types/multer](https://www.npmjs.com/package/@types/multer)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [typescript](https://www.npmjs.com/package/typescript)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

# Pesto Frontend

This is the frontend project for the Pesto application, built using Next.js.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/i-am-dev-Siddhesh/pesto-task-mgmt
   ```

2. Change into the project directory:

   ```bash
   cd pesto-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root of the project with the following content:

```env
NEXT_PUBLIC_SERVER_API_URL=base_server_url
NEXT_PUBLIC_SERVER_API_KEY=server_api_key
```

Replace the `NEXT_PUBLIC_SERVER_API_KEY` with the actual API key for your server.

### Development

To run the development server, use the following command:

```bash
npm run dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### Build

To build the project for production, use the following command:

```bash
npm run build
```

### Start

To start the production server after building, use the following command:

```bash
npm start
```

### Linting

To lint the project, use the following

 command:

```bash
npm run lint
```

## Technologies Used

- Next.js
- React
- Redux Toolkit
- React Redux
- Axios
- React Hook Form
- Yup (for form validation)
- Tailwind CSS
- TypeScript

## Contributing

Feel free to contribute to the project by opening issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize the README further based on additional information you want to provide.