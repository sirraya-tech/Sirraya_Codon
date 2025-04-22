# Sirraya Codon Documentation

## Overview

**Sirraya Codon** is a cutting-edge platform for automating processes using NLP (Natural Language Processing) to interact with systems and perform actions based on user input.

### Key Features
- **Intent Handling**: Codon allows users to define various intents and execute commands based on the input.
- **Modular Design**: The platform is built with a modular structure, allowing you to add new intents and features easily.
- **NLP-based Input Parsing**: Users can interact with the system using natural language, making it user-friendly and accessible.

## Core Concepts

### Codon
A **Codon** is a unit of work or a command that is parsed from natural language input and executed by the system.

### Intents
Intents are predefined actions or tasks that the system can handle. Examples include:
- Open a website
- Summarize text
- Perform calculations

### Handlers
Handlers are functions that define how an intent is executed. For example, an intent to open a website has a handler that opens the provided URL.

## How to Use Sirraya Codon CLI

1. **Start the CLI**
   - To start the CLI, simply run `node src/cli.js` from the root directory of the project.
   - The CLI will prompt you to enter a command.

2. **Available Commands**
   - **Run Intent**: Enter a plain text command to run an intent. For example:
     ```
     open a browser window to https://example.com
     ```
   - **Help**: Get detailed information about Sirraya Codon and its features.
     ```
     help
     ```

## Example Intents

### Open Browser
- Command: `open a browser to https://example.com`
- Action: Opens the provided URL in a new browser window.

### Summarize Text
- Command: `summarize the following text: [large text here]`
- Action: Provides a summarized version of the input text.

## About Me

**Amir Hameed Mir** is the creator and developer of the Sirraya Codon platform. With a background in software development, I have always been passionate about simplifying complex tasks through automation and natural language processing. I am committed to making technology more accessible and intuitive through innovative solutions like Codon. Feel free to reach out if you have any questions or suggestions!  
You can contact me at: **aamirmir001@gmail.com**

## Contributing
If you'd like to contribute to the project, please fork the repository and submit a pull request. We welcome new intents, handlers, and improvements!

## License
This project is licensed under the MIT License.
