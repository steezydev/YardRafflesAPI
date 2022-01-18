<img src="./public/cover.png">

![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFBe)
![mysql](https://img.shields.io/badge/MySQL-000022?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

![swag](https://forthebadge.com/images/badges/built-with-swag.svg)

> YardBot is a telegram bot and part of **YardRaffles** project. It was created to give users easy and native experience using YardRaffles system.

# About
Often rare items of clothing (most often sneakers) are sold in a limited number and it can be quite difficult to buy them.  Therefore, big brands and their retailers organize raffles for the "right to buy" a rare item of fashion in order to gain an audience for their social media accounts.

This project is aimed at raffles. The main goal is to enable people who don't resell things to make profit with their luck.

## Structure
Our project consists of 3 parts:
 - **<ins>API</ins>** - the heart of the system (working with the database, data processing)
 - **Dashboard** - for content management and statistics monitoring
 - **Telegram bot** - set of tools and announcements for users

**API** is an interface capable of communicating with the database and with our applications (dashboard and bot).  It performs all the “under the hood” work in data processing, entering and retrieving data from the database and communicating with the dashboard with the bot. The API accepts data in the http request format and returns it as json

# Getting started

## Installation
```sh
npm install
```
 configure `/src/config/db.config.js` file with current DB

## Usage

```sh
npm run start
```