# Chat Application Project

This repository contains a chat application built using Node.js, Express, and MongoDB. The application allows users to register, log in, send messages, manage contacts, and participate in group chats. The project follows a modular structure, adheres to design patterns, and implements various features for a comprehensive chat experience.

## Project Structure

The project is structured as follows:

- The `src` directory contains the main application code, structured into modules like `adapters`, `entities`, `interfaces`, `useCases`, and `utils`.
- The `__tests__` directory contains unit and integration tests for the application.
- The `server.ts` file is the entry point for the application.

## Design Patterns

The project leverages various design patterns to ensure maintainability, scalability, and readability. These patterns include:

- **Repository Pattern**: Separates data access logic from the rest of the application using repository interfaces and implementations.
- **MVC Architecture**: Organizes code into models, views, and controllers for clear separation of concerns.
- **Dependency Injection**: Promotes loose coupling by injecting dependencies into classes and components.
- **DTO (Data Transfer Object)**: Defines structured data objects for communication between layers.

## Features

- User Registration and Authentication: Users can register with their details and log in securely using JWT.
- Contacts Management: Users can add and manage contacts for easier communication.
- Group Chats: Users can participate in group chats with multiple participants.
- Message Sending: Users can send and receive text and multimedia messages.
- Message Editing and Deletion: Users can edit and delete their sent messages.
- Message Reactions: Users can react to messages with emojis.
- Chat Pinning: Users can pin important chats for quick access.

## Validation and Error Handling

- Request Validation: Incoming data is validated and sanitized to prevent security vulnerabilities.
- Error Handling Middleware: Centralized error handling and consistent error responses.

## Data Storage

- MongoDB: The application uses MongoDB as the database to store user information, messages, and chats.

## Optimizations

- Indexing: Proper indexing is implemented on database fields for efficient query performance.
- Pagination: Messages and chats are paginated to improve load times and user experience.

## How to Run

1. Clone this repository.
2. Install dependencies using `yarn install`.
3. Create a `.env` file with necessary environment variables.
4. Start the server using `yarn start`.

## Unit Testing

The application is thoroughly unit tested using Jest and Supertest. Tests cover various scenarios including user authentication, message sending, contact management, and more.

To run tests, use the command: `yarn test`


## Conclusion

This project demonstrates the implementation of a feature-rich chat application using Node.js, Express, and MongoDB. By following design patterns, maintaining a modular structure, and prioritizing user experience, the application provides a reliable and engaging communication platform.

Feel free to explore the codebase, try out different features, and contribute to further enhancements!


