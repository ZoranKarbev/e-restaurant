# MVC structured eRestaurant application - part 01

1.  Create a dish resource and implement all the crud operations for it

- The price should be validated when updating or adding a dish, no prices above 1000 or below 1

```
   Dish {
   id: string,
   name: string,
   price: number,
   }

```

2.  Create an order resource and implemented all crud operations for it

- Add a special patch endpoint that will only PATCH the status of an order (ex:PATCH orders/:id/status)

```
    Order: {
    id: string,
    dishName: string,
    status: string (new, cancelled, done)
    }

```

- OPTIONAL BONUS
  When creating a new order check if the dishName exists in the dishes resource (think importing one model in another)

3.  Create auth model/controller that will allow users to log in (use express-session for auth)

```
User: {
    id: string,
    username: string,
    password: string,
    role: string (user, admin)
}
```

4.  Endpoints that should be available to users:

- GET All dishes
- GET Dish by id
- POST Order (validate that one only one order is recieved in the body with a middleware)

5.  Endpoints available to admins:

- All Dish Endpoints
- All Order Endpoints

Guidelines:

- Everything above should be implemented using the MVC pattern (choose your own style of syntax).
- Finish one step before moving on to the next.
- Test every endpoint in postman before moving on to the next, do not type them out in a batch.
- There is no need to create a frontend to consume these endpoints, focus on building the api.
- You shouldn't have extremely precise error handling but it should be implemented in a basic way for all endpoints.
- Feel free to experiment and add functionality

# PART 2!

### 1. Implement full authentication

      - Following the MVC pattern, create /register and /login routes.
      - For the register route, when registering new user, validate the data using JOI and encrypt user's password.

### 2. Implement JWT authentication mechanism for authenticating the user.

      - If you previously implemented the authorisation mechanism using session, remove the session and implement the JWT flow.
      - If there is no authorisation mechanism implemented yet (no session), continue with JWT.

### 3. Protect all routes, so only authenticated user can access them

### 4. Add user and admin roles with JWT ( Optional )

      - Refactor routes validations, instead of using the session to check if user is admin or user, use JWT.
      **REMINDER
      - Endpoints that should be available to users:
      - GET All dishes
      - GET Dish by id
      - POST Order (validate that one only one order is recieved in the body with a middleware)

      - Endpoints available to admins:
      - All Dish Endpoints
      - All Order Endpoints

### 5. Implement UI

### 6. Extra Bonus #1

- Add Joi validation for dishes and orders

### 7. Extra Bonus #2

- Export your postman collections and send them along with the workshop

