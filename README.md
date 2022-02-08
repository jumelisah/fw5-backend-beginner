# About
This is repository of backend beginner task for Fazztrack Bootcamp

## Vehicles Endpoint
| Method | API | Remark |
| ------ | ------ | ------ |
| GET | /vehicles | Get data from vehicles table  |
| GET | /vehicles/:id | Get data from vehicles table with specific ID |
| GET | /vehicles/category/:category_id | Get data from vehicles table based on vehicle category |
| POST | /vehicles | Add a new data to vehicles table |
| PATCH | /vehicles/:id | Edit data with specific ID in vehicles table |
| DELETE | /vehicles/:id | Delete data with specific ID in vehicles table |

## Users Endpoint
| Method | API | Remark |
| ------ | ------ | ------ |
| GET | /users | Get data from users table  |
| GET | /users/:id | Get data from users table with specific ID |
| POST | /vehicles | Add a new user data to users table |
| PATCH | /vehicles/:id | Edit user data with specific ID in users table |
| DELETE | /vehicles/:id | Delete user with specific ID in users table |

## Vehicles Endpoint
| Method | API | Remark |
| ------ | ------ | ------ |
| GET | /histories | Get data from histories table  |
| GET | /histories/:id | Get data from histories table with specific ID |
| GET | /histories/vehicles/:vehicle_id | Get data from histories table based on vehicle ID |
| POST | /histories | Add a new data to vehicles table |
| PATCH | /histories/:id | Edit data with specific ID in histories table |
| DELETE | /histories/:id | Delete data with specific ID in histories table |

# Installation

```sh
git clone https://github.com/jumelisah/fw5-backend-beginner.git cd Backend-Beginner
```
```sh
npm i
```
```sh
node app
```

# Standard Response and Preview Request By Postman

```
{
    success: true,
    message: 'List of vehicles',
    result: [object Object]
}
```
![Screenshot (106)](https://user-images.githubusercontent.com/90091968/152905337-f9592b3e-3538-4512-9d16-e314ff6409e5.png)


#Author
[@jumelisah](https://github.com/jumelisah)
