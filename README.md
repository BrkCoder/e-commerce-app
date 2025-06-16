# E-Commerce App - React + TypeScript + Vite

Since this API is a mock service, it does not support mutations — meaning you cannot create, update, or delete any data on the backend. As a result, the app has the following constraints:

1. Registration is limited – The registration process exists in the UI, but new user data cannot actually be saved to the backend. When a user "registers," the app simulates the process but ultimately logs in as a predefined, hardcoded user. These predefined users cannot be modified or removed.

2. Login is restricted – You can only log in using one of the following hardcoded users:
  > 
    "username": "johnd",
    "password": "m38rmF$", 

    "username": "mor_2314",
    "password": "83r5^_",

    "username": "kevinryan",
    "password": "kev02937@",

    "username": "donero",
    "password": "ewedon",

    "username": "derek",
    "password": "jklg*_56",

    "username": "david_r",
    "password": "3478*#54",

    "username": "snyder",
    "password": "f238&@*$",

    "username": "hopkins",
    "password": "William56$hj",

    "username": "kate_h",
    "password": "kfejk@*_",

    "username": "jimmie_k",
    "password": "klein*#%*" 

3. Add to Cart is scoped per user – The cart functionality is implemented using localStorage and not persisted via the fake backend, due to its read-only limitation. 

