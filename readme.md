
https://github.com/KanishkNoir/Fibr-Quiz--API/assets/121493358/ab92d7ca-97b2-423a-bd2b-63488794dcc0



https://github.com/KanishkNoir/Fibr-Quiz--API/assets/121493358/03c98239-730f-4ce8-9d66-832502be9d4a

***************************************************************************************************
Features: 
-> Admin(user) and participant(others) dashboard
-> Admin can create(POST) questions and add them to quiz(POST)
-> The dashboard will display list of all questions in database(GET) and list of all quizzes(GET)

-> Participant can take the quiz by using the quiz id shared by the admin(GET)
-> Questions can be one or more than one correct type

****************************************************************************************************
Requirements:
-> Nodejs
-> MongoDB

****************************************************************************************************

To locally run this repository:

Clone repository: https://github.com/KanishkNoir/Fibr-Quiz--API.git

Install npm dependencies: npm install

Install nodemon module gloablly: npm install -g nodemon

Change the '.env' file having mongodb uri to your mongodb uri and add a port number to run on localhost

Start web server: npm run dev
