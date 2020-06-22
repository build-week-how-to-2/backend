# backend

# root api directory
- not yet deployed

# endpoints
## /api
- POST /api/register
- - Requires username: string, password: string
- - RETURNS data { email, username, hashed password }
- POST /api/login
- - Requires username, password
- - On successful login, returns token as "token", success message as "Welcome to our API".
- - If unable to validate username/password combo, returns status 401.

# data schema
- users:
- - { id: integer, username: string, password: string }
