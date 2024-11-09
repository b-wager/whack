# ProjectPals

**Project Pals** is a web application designed to streamline the formation of student groups for projects by matching them based on skills, interests, and working styles. Inspired by initiatives like the Marriage Pact but focused on group projects, our platform not only matches students but also provides tools to facilitate the entire group project process, enhancing collaboration and productivity.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Introduction

In educational settings, forming effective project groups can be challenging. Instructors often struggle to create balanced teams, and students may end up in groups that do not align with their skills or working preferences. This can lead to suboptimal collaboration and learning outcomes.

**Group Project Pact** addresses these challenges by introducing an automated, data-driven approach to group formation. By considering individual strengths, preferred roles, and working habits, the application aims to create cohesive teams that can collaborate effectively.

---

## Features

- **User Registration and Profile Management**
  - Secure account creation and login.
  - Profile customization with relevant information.

- **Survey System**
  - Comprehensive survey capturing skills, preferences, and working habits.
  - User-friendly interface for survey questions.

- **Automated Group Matching**
  - Intelligent algorithm to form balanced groups.
  - Factors in skills diversity, working styles, and project goals.

- **Group Dashboard**
  - Overview of group members and project details.
  - Access to collaboration tools.

- **Task Management**
  - Create, assign, and track tasks within groups.
  - Visual progress tracking.

- **Notifications**
  - Inform users of group assignments.
  - Reminders for upcoming tasks and deadlines.

---

## Technology Stack

- **Backend**: Django (Python)
- **Frontend**: HTML, CSS, JavaScript (Bootstrap for responsive design)
- **Database**: SQLite (for development and testing)
- **Version Control**: Git
- **Deployment**: Localhost or cloud service (e.g., Heroku) for demonstration

---

## Architecture

The application follows the Model-View-Controller (MVC) architectural pattern provided by Django. Below is a high-level overview:

### High-Level Architecture

```
+--------------------------------------------------------+
|                      Presentation Layer                |
|  - HTML Templates                                      |
|  - CSS Styling (Bootstrap)                             |
|  - JavaScript (Optional for interactivity)             |
+--------------------------------------------------------+
                                    |
                                    V
+--------------------------------------------------------+
|                      Application Layer                 |
|  - Django Views (Controllers)                          |
|    - Handle HTTP requests                              |
|    - Manage sessions and authentication                |
|    - Render templates with context data                |
+--------------------------------------------------------+
                                    |
                                    V
+--------------------------------------------------------+
|                      Business Logic Layer              |
|  - Matching Algorithm                                  |
|  - Survey Processing                                   |
|  - Task Management Logic                               |
+--------------------------------------------------------+
                                    |
                                    V
+--------------------------------------------------------+
|                      Data Access Layer                 |
|  - Django Models                                       |
|    - ORM mappings                                      |
|    - Database queries                                  |
+--------------------------------------------------------+
                                    |
                                    V
+--------------------------------------------------------+
|                      Database Layer                    |
|  - SQLite Database                                     |
|    - User Data                                         |
|    - Survey Responses                                  |
|    - Group Assignments                                 |
|    - Tasks and Progress                                |
+--------------------------------------------------------+
```

### Core Components

1. **User Authentication and Profiles**
2. **Survey System**
3. **Matching Algorithm**
4. **Group Dashboard**
5. **Task Management**

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Python 3.x
- Git
- Virtual Environment tool (`venv` or `virtualenv`)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/group-project-pact.git
   cd group-project-pact
   ```

2. **Create a Virtual Environment**

   ```bash
   python3 -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a Superuser (for admin access, optional)**

   ```bash
   python manage.py createsuperuser
   ```

6. **Run the Development Server**

   ```bash
   python manage.py runserver
   ```

7. **Access the Application**

   Open your web browser and navigate to `http://localhost:8000/`

---

## Usage

### 1. User Registration and Profile Setup

- **Sign Up**: Click on the "Sign Up" button and fill in the registration form.
- **Profile**: After registering, complete your profile by providing information such as major, year, skills, and project goals.

### 2. Complete the Survey

- **Survey Access**: Navigate to the survey page.
- **Fill Survey**: Answer questions about your skills, preferred roles, and working habits.
- **Submit**: Submit the survey to be eligible for group matching.

### 3. Group Matching

- **Notification**: Once the matching process runs, you'll receive a notification about your group assignment.
- **View Group**: Access your group dashboard to see your group members.

### 4. Group Dashboard and Collaboration

- **Overview**: View group members and project information.
- **Task Management**: Create and assign tasks, set deadlines, and track progress.
- **Communication**: Use provided links or tools to communicate with group members.

---

## Project Structure

```
group-project-pact/
├── manage.py
├── requirements.txt
├── README.md
├── db.sqlite3
├── templates/
│   ├── base.html
│   ├── registration/
│   │   ├── login.html
│   │   └── signup.html
│   ├── survey/
│   │   └── survey_form.html
│   ├── dashboard/
│       ├── group_dashboard.html
│       └── task_form.html
├── static/
│   ├── css/
│   ├── js/
│   └── images/
└── group_project_pact/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── wsgi.py
    └── apps/
        ├── users/
        │   ├── models.py
        │   ├── views.py
        │   ├── forms.py
        │   └── urls.py
        ├── survey/
        │   ├── models.py
        │   ├── views.py
        │   ├── forms.py
        │   └── urls.py
        ├── groups/
            ├── models.py
            ├── views.py
            ├── forms.py
            └── urls.py
```

---

## Contributing

We welcome contributions to enhance the platform! Here's how you can contribute:

1. **Fork the Repository**

   Click on the "Fork" button at the top right corner of this page to create a copy of the repository in your account.

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**

   Implement your feature or bug fix.

4. **Commit and Push**

   ```bash
   git add .
   git commit -m "Add your commit message"
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**

   Go to the original repository and open a pull request from your forked repo.

6. **Code Review**

   Participate in the code review process and make any necessary changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- **Team Members**: Thanks to all team members for their contributions.
- **Open Source Libraries**: Django, Bootstrap, and other open-source projects that made this application possible.
- **Inspiration**: Inspired by the concept of the Marriage Pact and a desire to improve group project experiences.

---

**Contact**

For any inquiries or suggestions, please open an issue on this repository.

---

*Note: This project was developed during a hackathon. Some features may be incomplete or in development.*