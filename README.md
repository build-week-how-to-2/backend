# backend

# root api directory
- not yet deployed

# endpoints
## /api
- POST /api/register
- - Requires username: string, password: string, role: string(either 'user' or 'creator') defaults to 'user';
- - RETURNS data { email, username, hashed password }
- POST /api/login
- - Requires username, password
- - On successful login, returns token as "token", success message as "Welcome to our API".
- - If unable to validate username/password combo, returns status 401.

## /howtos
- GET /howtos
- - Returns array of all howtos
- GET /howtos/:id/steps
- - Returns array of all steps assigned to a howto
- GET /howtos/creator
- - REQUIRES TOKEN
- - Returns array of all howtos that logged in user has created
# data schema
- users:
- - { id: integer, username: string, password: string }
