# backend

# root api directory
- https://how-to-2.herokuapp.com/

# endpoints
## /api
- POST /api/register
- - Requires username: string, email: string, password: string, role: string(either 'user' or 'creator') defaults to 'user';
- - RETURNS data { id, username, email, hashed password, role }
- POST /api/login
- - Requires username, password
- - On successful login, returns token as "token", success message as "Welcome to our API".
- - If unable to validate username/password combo, returns status 401.
- GET /api
- - Returns array of all users

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
- DELETE /howtos/:id
- - REQUIRES TOKEN
- Will delete post only if logged in user is owner of the post
- GET /howtos/creator
- - REQUIRES TOKEN
- - Returns array of all howtos that logged in user has created
- - Returns objects as { id: integer, creator: string, name: string, body: string,
                         img: string, cat: string }
# data schema
- all fields marked with * are required
- users:
- - { id: integer, *username: string, *email: string, *password: string }
- howtos:
- - { id: integer, *name: string, creator_id: integer, img: string, cat: string,
      upvotes: integer, downvotes: integer }
