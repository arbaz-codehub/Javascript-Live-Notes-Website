# Live Notes Website

## Overview
Live Notes is a web application designed to help users manage and access their notes effectively. Built using HTML, CSS, JavaScript, and Firebase, the platform offers a seamless experience for users to register, log in, and view notes across various subjects.

## Features
- **User Authentication**: 
  - Users must log in or register using a unique access code.
  - Login information is retained, allowing users to stay logged in even after closing the website or browser until they explicitly log out.
  
- **Subject Navigation**: 
  - After logging in, users can access a list of subjects.
  - Each subject has its own dedicated page with well-structured navigation.

- **Dynamic Content**: 
  - The first subject's content is loaded via JSON, providing a smooth and dynamic experience.
  
- **PDF Viewer**: 
  - Other subjects utilize PDF.js for displaying notes.
  - Features include zoom-in and zoom-out capabilities for better accessibility.

- **Responsive Design**: 
  - The website is fully responsive and optimized for mobile devices, ensuring a great user experience across various screen sizes.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (for user authentication and data storage)
- **PDF Viewer**: PDF.js

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/live-notes-website.git
2. Navigate to the project directory:
   ```bash
   cd live-notes-website
   ```
3. Open index.html in your preferred web browser.

## Usage
1. Create an account using the unique access code provided to you.
2. Log in to access the subjects.
3. Click on any subject to view the notes in the PDF viewer.

## Contributing
- Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License
- This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- Firebase for user authentication and database services.
- PDF.js for the PDF viewer functionality.

## Contact
- For any inquiries, please reach out to arbaz130803@example.com.
