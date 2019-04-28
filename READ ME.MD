# E-Com demo

* DEMO WEBSITE IS ONLINE HOSTED HERE: [http://134.209.145.105:3000](http://134.209.145.105:3000)
* Passwords for hosted website are as follow
* Admin panel (Username: admin, password: admin)
* User Panel (Username: guest, password: guest)

This is very simple demo of a ecommerse website, 
It has two panels

1. Admin Panel

Admin pannel, which allows admin to add
new products into the eCom website and also it allows
user to see all the orders done so far and see all the
available users. Admin can download pdf for user's invoice

2.User Panel

It allows a simple user to login to the website and request for
his order. User can also download invoice for his order
and also he can see the all the order that he has made
so far

####Requirements

NodeJs 8.9.0, Docker, Docker-compose

####How to install
Simply clone this repo and make sure you have all
the above requrements preinstalled in your computer
and then you can follow following step

* docker-compose up -d

above command will start mongod deamon in your computer

* node app.js

above command will start the application server

* And then finally you can run localhost:3000