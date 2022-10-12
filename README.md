# Challenge backend.
##

Stack

- Nestjs
- TypeORM, MySQL, Redis
- JWT

## Features

- the microservice has three endpoints
- the documentation of the endpoints is in Swagger
- Swagger --> http://localhost:3000/api/doc
- Creates a user given (username,password,name,anddres,cityId)  --> http://localhost:3000/api/auth/register
- Returns a valid JWT token given (username,password) --> http://localhost:3000/api/auth/login
- Return a relevant user profile given a valid JWT token in a Authorization header http://localhost:3000/api/user/info

## Table Country and City
The only tables that insert data with a docker entrypoint are Country and City, the other tables are created empty but with their respective relationships and indexes.
In the cityId field of the first registration endpoint, one of the following ids is valid, in case of putting one id that is not in the City table, the microservice will respond with an exception

City
| id | name |
| ------ | ------ |
| 1 | "La Plata"
| 2 | "Seattle" 
| 3 | "Tokyo" 
| 4 | "Perth"
| 5 | "New York" |
| 6 | "Bruselas" |
| 7 | "Bruselas"|
| 8 | "Sidney" |
| 9 | "Montevideo"|
| 10 | "Rio de Janeiro"|
| 11 | "Sao Pablo" |
| 12 | "Rosario" |

## ERD
![ERD](https://user-images.githubusercontent.com/45670616/194600353-a90ee512-db6d-4e31-b846-4acbfec3ae53.png)

## Docker
To run the project

```sh
docker-compose up -d    
```



