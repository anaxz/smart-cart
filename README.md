# Smart Cart

A website comparing grocery store items.

### Demo

[![Watch the video](https://img.youtube.com/vi/-5I1EPvvPA0/hqdefault.jpg)](https://youtu.be/-5I1EPvvPA0)

## Installation
- git clone this repo and cd inside it

### React 
- Go into client folder
- Then ```npm i``` to install dependencies

### Flask
- Goto api folder
- Then run ```pip install -r requirements.txt``` to install dependencies

## Usage
- cd into client folder then run ```npm run dev``` to run react
- At root folder, run ```python api/main.py``` to run flask

- Goto http://127.0.0.1:5173/ for client side
- Goto http://127.0.0.1:5000 for server side

### React test
- ```npm run test script-name```
- OR ```npm run test``` to run all
- ```npm run coverage``` to run coverage

### Flask pytest
- For mac: ```pytest script_name.py```
- Else: Goto api/server/test folder
- Then run ```pytest script_name.py```
- Inside anywhere in api folder ```pytest --cov``` to display coverage
- Inside api folder run ```pytest --cov-report term-missing --cov=.``` to display missing lines

## Changelog

## Wins

## Challenges

## Bugs
