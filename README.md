# E-Commerce App - React + TypeScript + Vite

This app is an e-Commerce app with a fake backend(https://fakestoreapi.com/)
Because this api is fake, we can't do any mutation to entities on the backend like create,update or delete. as a result of this technical decision, the app have some constraints:
1. Registration is limited, the process of register is exist but we can add a new record to backend, the app register the new user but logging with other specific user which exist in the system and can't be modify or removed.
2. Login is limited, you login only with the following users:
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

3. Add to card is scoped to user only and is implemented using local-storage and not fake backend because this backend is immutable. 

