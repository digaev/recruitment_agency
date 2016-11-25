# What

This is the demo project. A simple SPA with using RoR 5 (PostgreSQL) & React.js.

* Add employees
* Add vacancies
* Tag with skills each vacancy/employee
* Search best vacancies/employees for individual employee/vacancy

## Installation

```
git clone https://github.com/digaev/recruitment_agency.git
```

## API
```
cd ./recruitment_agency/api

# prepare database
rake db:create && db:migrate && rake db:test:prepare

# run tests
bundle exec rspec

# add some seed data
rake db:seed

# start server
rails s
```

## UI

```
cd ./recruitment_agency/ui

# install node packages
npm install

# install bower components
bower install

# start server
npm start
```
