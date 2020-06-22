# backend

# root api directory
- not yet deployed

# endpoints
## /api
- POST /api/register
- - Requires username: string, email: string, password: string, role: string(either 'user' or 'creator') defaults to 'user';
- - RETURNS data { id, username, email, hashed password, role }
- POST /api/login
- - Requires username, password
- - On successful login, returns token as "token", success message as "Welcome to our API".
- - If unable to validate username/password combo, returns status 401.

## /howtos
- GET /howtos
- - Returns array of all howtos
- POST /howtos
- - REQUIRES TOKEN
- Requires name
- Posts new howto as long as logged in user's role is creator
- PUT /howtos/:id
- - REQUIRES TOKEN
- Requires name
- Edits howto where :id is howto id
- GET /howtos/:id/steps
- - Returns array of all steps assigned to a howto
- GET /howtos/creator
- - REQUIRES TOKEN
- - Returns array of all howtos that logged in user has created
# data schema
- all fields marked with * are required
- users:
- - { id: integer, *username: string, *password: string }
- howtos:
- - { id: integer, *name: string, creator_id: integer }
- steps:
- - { id: integer, *name: string, *step_number: integer, *howto_id: integer }
