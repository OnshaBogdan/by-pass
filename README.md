# by-pass

# Team:
- Oleksii Serdtsov
- Mykyta Hotvianskyi
- Vladyslav Shulha
- Pavlo Kaznachei
- Bogdan Onsha

## Preparation:

- Install Python 3.7.4 - https://www.python.org/downloads/
- Install Git - https://www.git-scm.com/downloads
- Install PostgreSQL 12 - http://www.postgresqltutorial.com/install-postgresql/
- Create db 'bypass' with admin user 'bypass_user' - https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04#create-a-database-and-database-user

## Installation
- `git clone https://github.com/OnshaBogdan/by-pass.git`
- `cd by-pass`
- `virtualenv -p python .venv`
- `source .venv/bin/activate`
- `pip install -r requirement.txt`
- `cd bypass/`
- `python manage.py runserver`
- open `http://127.0.0.1:8000/`

## Web app instalation
- `install yarn`
- `cd web`
- `yarn`
- `yarn start`
- visit `http://127.0.0.1:3000/`

## API
### API root - '/api'


#### 1. Sign Up

URL = `/users/`

METHOD = `POST`

Input:
```
{
    "username": "test_username",
    "first_name": "test_fname",
    "last_name": "test_lname",
    "email": "tst@gmail.com",
    "password": "test_pwd_123"
}
```
Output:
```
{
    "url": "{domain}/api/users/7/",
    "username": "test_username",
    "first_name": "test_fname",
    "last_name": "test_lname",
    "email": "tst@gmail.com"
}
```
####2. Sign In

URL = `/login/`

METHOD = `POST`

Input: 
```
{
    "username":"test_username",
    "password":"test_pwd_123"
}
```
Output:
```
{
    "token": "e73934e5d6ce255f8d7d907767f16bcfd2705bf8",
    "user_id": 7,
    "username": "test_username"
}
```
####3. Logout

URL = '/logout/'

Method: Post

Input (headers):
```
{
    "Authorization": "Token e73934e5d6ce255f8d7d907767f16bcfd2705bf8"
}
```

Output:
```
{
    "success": "Successfully logged out."
}
```

#### 4. Product list

URL = '/products/'

##### GET:
```
[
    {
        "id": 1,
        "title": "ELECTRO-HARMONIX Ravish Sitar",
        "price": 9350,
        "image": "/media/5947365739284.jpg",
        "product_type": "Foot controller",
        "brand": "Muz",
        "working_principle": "Digital",
        "weight": 0.75
    },
    {
        "id": 2,
        "title": "Гитарная педаль TC Electronic",
        "price": 3850,
        "image": "/media/85846532608706.jpeg",
        "product_type": "Guitar pedal",
        "brand": "TC Electronic",
        "working_principle": "Analog",
        "weight": 0.75
    }
]
```
##### POST:
(form-data)
```
"image": `{{file}}`
"title": "ELECTRO-HARMONIX Ravish Sitar"
"price': 9350, 
"product_type": "Foot controller"
"brand": "MusicJaba'
"working_principle": "Digital"
"weight": 0.67
```

Response:

```
{
    "id": 3,
    "title": "ELECTRO-HARMONIX Ravish Sitar",
    "price": 9350,
    "image": "/media/GhQQ5Y6.jpg",
    "product_type": 2,
    "brand": "MusicJaba",
    "working_principle": Digital,
    "weight": 0.67
}
```

#### 5. User list

URL = '/users/{{pk}}/'
Methods = ['GET', 'POST']


##### GET:

Response:

    ```
    [
    {
        "url": "http://localhost:8000/api/users/2/",
        "username": "test_1",
        "first_name": "Test_fname",
        "last_name": "Test_lname",
        "email": "asdasd@gmail.com"
    },
    {
        "url": "http://localhost:8000/api/users/3/",
        "username": "afea",
        "first_name": "test_fname3",
        "last_name": "testsdgd_lname3",
        "email": "test3@gmail.com"
    },
    ...]
    ```
##### POST:

Body:
```
{
    "username": "test322",
    "first_name": "test_fname3",
    "last_name": "testsdgd_lname3",
    "email": "test3@gmail.com",
    "password": "psfafaecsd"
}
```

Response:
```
{
    "url": "http://localhost:8000/api/users/5/",
    "username": "test322",
    "first_name": "test_fname3",
    "last_name": "testsdgd_lname3",
    "email": "test3@gmail.com"
}
```
#### 5. User Detail
URL = '/users/<pk>/'
Methods = ['GET', 'PUT', 'DELETE']


##### GET:
Response:
```
{
    "url": "http://localhost:8000/api/users/2/",
    "username": "test_1",
    "first_name": "Test_fname",
    "last_name": "Test_lname",
    "email": "onsha.bogdan2000@gmail.com"
}
```
##### POST:
Body:
```
{
    "username": "test2",
    "first_name": "test_fname3",
    "last_name": "testsdgd_lname3",
    "email": "test3@gmail.com",
    "password": "test"
}

```
Response:
```
{
    "url": "http://localhost:8000/api/users/5/",
    "username": "test2",
    "first_name": "test_fname3",
    "last_name": "testsdgd_lname3",
    "email": "test3@gmail.com"
}
```

