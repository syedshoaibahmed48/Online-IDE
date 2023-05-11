# Online IDE - Collaborative Code Editor and Execution Platform

- The Online IDE is a powerful web-based platform designed to provide developers with a collaborative code editing and execution environment for multiple programming languages from a web browser.

- Integrated real-time collaboration feature allowing multiple users to work on the same project simultaneously.

- Implemented CRUD operations for user projects, allowing users to create, view, update, and delete their projects with the Node.js server efficiently managing project storage and retrieval from the MongoDB database.
	
- Utilized Redis as an in-memory database to implement a robust and scalable queue system using the Bull library, allowing for efficient management of multiple code execution tasks.

- The Online IDE effectively utilizes a socket server for real-time collaboration and a REST API for code execution, user authentication, and project management, combining the strengths of both technologies to provide a seamless and efficient coding experience.


## Key Features
- Real-time Collaboration: Collaborate with team members or colleagues in real-time, allowing multiple users to work on the same code simultaneously.

- Code Execution: Execute your code, supporting multiple programming languages and providing instant feedback on the output.
Syntax Highlighting: Enjoy syntax highlighting to make your code more readable and visually appealing.

- Project Management: Organize and manage your projects with ease, creating, updating, and deleting projects as needed.

- User Authentication: Ensure secure access to the platform through user authentication, protecting user accounts and project data.

- Error Handling: Receive detailed error messages and diagnostics to identify and resolve coding issues quickly.

## Technologies Used
### Front-end:
- React.js: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for quickly styling the application.
- Axios: for making API requests to the server.
- Socket.IO: to implement real-time collaboration between users.   
      
### Back-end:     

- Node.js: A JavaScript runtime environment used for server-side development.
- Express.js: A web application framework for creating RESTful APIs.
- MongoDB: to store user and project data.
- Mongoose: for modeling and mapping MongoDB data to JavaScript objects.
- JWT (JSON Web Tokens): to authenticate users and protect routes.
- Redis: An in-memory data store used for queuing and processing code execution requests.