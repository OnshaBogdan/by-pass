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