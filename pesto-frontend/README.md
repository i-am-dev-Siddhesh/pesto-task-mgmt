# Pesto Frontend

This is the frontend project for the Pesto application, built using Next.js.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   https://github.com/i-am-dev-Siddhesh/pesto-task-mgmt
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

To lint the project, use the following command:

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