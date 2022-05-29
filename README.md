# LONGIN USER BY TOKEN 
Authentication is an everyday necessity in our applications,
and tokens are widely used nowadays. In this project offer login to users in two ways; the first was by email and password, and the second way by token; I hope that this project could be helpful for someone that will start with the topic of JWT tokens.

## DEPLOY

## Requirements to deploy 
1. You have to be installed the applications <a href="https://docs.docker.com/get-docker/"> Docker</a> and <a href="https://docs.docker.com/compose/install/"> Docker-compose </a>.
2. The backend was developed in java with the Ide <a href="https://www.jetbrains.com/idea/download/#section=windows"> IntelliJ IDEA</a> (optional).
3. The frontend was developed in Angular 12 with Visual Studio Code editor(optional).
4. Any web browser..

## Get started
Use the command docker-compose up. then both projects run at the same time; the backend is a java app, and the second one is an Angular app after a few minutes you could test all applications.

## TEST

### Backend: 
Use the <a href="https://github.com/lectrapb/tokenServer/tree/main/Postman" target="_blank">Postman</a>
collection attached in the project.
### Front-end 
1. First, go into the web browser and put this URL http://localhost:4200; you will see the login session.

2. Select the option register, and you have to create an account.

3. Select the close option session, and you again try to log in with your credentials but this time you have to select the option "remember me"; after a successful login, you could close the web browser.

4. Open again the web browser, and you will be gone to the same URL you will be logged in without any password!. After 2 minutes http://localhost:4200, the Token will expire, and if you want to try to reaccess it, you will have to put in your credentials again.

## Documentation
Please check this post:
<a href="https://thinksprograms.blogspot.com/" target="_blank">Token server</a>
