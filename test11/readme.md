#Project specification
Made with JetBrains Rider IDE (based on "ASP.NET Core Web Application with ReactJS" template)

ASP.NET Core version: 6.0

Application works on port 44491

#First run preparations  
In order to run project for the first time You need to do some preparations:
1. Run "test11 - create database" configuration - creates Docker container "test11_db" with PostgreSQL database
2. Add following secrets:

| name                    | value          |
|-------------------------|----------------|
| test11:Database         | test11_db      |
| test11:DatabaseUser     | test11_db_user |
| test11:DatabasePassword | zaq1@WSX       |

#Running project
1. Make sure the "test11_db" container is running (if not, please start it)
2. Run "test11" run configuration

#Project warnings
Sometimes, when editing frontend, after compilation error "Uncaught ReferenceError: process is not defined" is thrown. I'm still trying to figure out what causes it.

Temporary fix method is to refresh page after every frontend compilation. 