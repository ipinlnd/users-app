# users-app
Another installment in the journey of learning react, Here's an app that signs up, logs in, 
  sees other users' mottos, edit's own motto and logs out. 

Using graphql to communicate with front-end, the back-end uses a postgresSQL database which is modeled using sequelize-typescript,
  and also authenticates using passportjs.


## USAGE

Starting the server
```
$ cd server
$ npm install
$ npm start
```

Starting the client (Which needs expo-cli)
```
$ cd client
$ yarn
$ expo start
```

## Prerequisites

Start a postgresSql databse named users, and create a table named 'Account' with these fields:
```
  Column  |         Type          | Collation | Nullable |                Default                | Storage  | Stats target | Description 
----------+-----------------------+-----------+----------+---------------------------------------+----------+--------------+-------------
 id       | integer               |           | not null | nextval('"Account_id_seq"'::regclass) | plain    |              | 
 name     | character varying(50) |           | not null |                                       | extended |              | 
 password | character varying(50) |           | not null |                                       | extended |              | 
 motto    | character varying(50) |           |          |                                       | extended |              | 
Indexes:
    "Account_pkey" PRIMARY KEY, btree (id)
    "Account_name_key" UNIQUE CONSTRAINT, btree (name)

```
