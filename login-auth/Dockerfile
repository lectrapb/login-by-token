#########################
### STAGE 1: Build app
#########################
FROM node:12 as build

WORKDIR /app

RUN npm install -g @angular/cli@12.2.17

COPY ./package.json .
# Install all the dependencies
RUN npm install
COPY . .
#Environment 
ARG PROFILE
ENV PROFILE $PROFILE

#Definig profile to build
RUN echo "Environment: ${PROFILE}"
# Generate the build of the application
RUN ng build --${PROFILE}
###############
### STAGE 2: Serve app with nginx ###
###############
FROM nginx as runtime
COPY --from=build /app/dist/login-auth /usr/share/nginx/html