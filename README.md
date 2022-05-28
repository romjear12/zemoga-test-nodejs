# NodeJs + AWS Portfolio web app

Portfolio web app with a simple arquitecture serverless using AWS resources (S3 + API Gateway + Lambda + DynamoDB).

## Requeriments

- [Node >= 14](https://nodejs.org/es/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [Serverless Framework](https://www.serverless.com/framework/docs)

## Live Demo

[Portfolio web app](http://zemoga-test-webapp.s3-website-us-east-1.amazonaws.com/)

## Quickstart

Clone this repository to your local machine

```bash
$ git clone https://github.com/romjear12/zemoga-test-nodejs
$ cd zemoga-test-nodejs
```

- #### Serverless API

  Api REST developed using Serverless Framework. Endpoints exposed:

  - GET /users/:id
  - PUT /users/:id
  - GET /users-twitter/:username/tweets

  Install serverless framework on your local machine to build and deploy the API endpoints to AWS cloud

  ```bash
  $ npm install -g serverless
  ```

  To run API locally:

  ```bash
  $ cd users-api-rest
  $ npm install
  $ npm run serverless:local
  ```

  The API will be available on http://localhost:3001/dev

- #### Webapp
  Web app developed with React.js using [create-react-app](https://create-react-app.dev/). Install dependencies to build and run project locally
  ```bash
  $ cd webapp
  $ npm install
  $ npm start
  ```
  Web app will be available on http://localhost:3000
  By default, API calls point to public endpoints (API Gateway URL). e.g. https://gttlv53w6g.execute-api.us-east-1.amazonaws.com/dev/users/1
- #### Dynamo DB
  Table structure:
  Name: **users**
  ```js
  {
      "id": number,
      "description": string,
      "email": string,
      "first_name": string,
      "last_name": string,
      "profile_image_url": string,
      "twitter_username": string
  }
  ```
  `NOTE`: When you built your own DynamoDB and deploy the API to the AWS Cloud with your own credentials, you have to update the API URLs on [webapp](https://github.com/romjear12/zemoga-test-nodejs/blob/main/webapp/src/App.js) and DynamoDB resource on [serverless.yml](https://github.com/romjear12/zemoga-test-nodejs/blob/main/users-api-rest/serverless.yml) file.

## How it works

API Endpoints - GET **/dev/users/:id** Fetch user info from DynamoDB table **users**

Sample request to get user info

```bash
curl --location --request GET 'https://gttlv53w6g.execute-api.us-east-1.amazonaws.com/dev/users/1'
```

Example reponse:

```json
{
    "data": {
        "id": 1
        "twitter_username": "romjc",
        "first_name": "Romer",
        "last_name": "Maldonado",
        "profile_image_url": "http://pbs.twimg.com/profile_images/1445765299974795279/ExVMkDHG_normal.jpg",
        "description": "Fullstack developer with the capabilities to build tech solutions, always keeping in mind good practices to write clean code and usable features to end-users.",
        "email": "romerjeancarlos@gmail.com",
    },
    "meta": null,
    "errors": null
}
```

- GET **/dev/users-twitter/:username/tweets**: Fetch user tweets from Twitter's API

Sample request to update user info

```bash
curl --location --request PUT 'https://gttlv53w6g.execute-api.us-east-1.amazonaws.com/dev/users/1' --header 'Content-Type: application/json' \
--data-raw '{
    "description": "6+ years of professional developer, working mostly as front-end developer with JavaScript, HTML5, CSS, React/Redux, React Native, also with back-end background in Node.js, Express, SQL and NoSQL databases. Really passionate about the Javascript ecosystem in general.My approach is always towards being the best coworker in any team I’m part of, improving both sides of my professional and personal self: problem solving and teamwork in order to be the best developer in the field.",
    "first_name": "Romer",
    "last_name": "Maldonado",
    "profile_image_url": "http://pbs.twimg.com/profile_images/1445765299974795279/ExVMkDHG_normal.jpg"
}'
```

Example reponse:

```json
{
  "data": {
    "title": "User info updated successfully",
    "data": {
      "twitter_username": "romjc",
      "last_name": "Maldonado",
      "profile_image_url": "http://pbs.twimg.com/profile_images/1445765299974795279/ExVMkDHG_normal.jpg",
      "first_name": "Romer",
      "description": "6+ years of professional developer, working mostly as front-end developer with JavaScript, HTML5, CSS, React/Redux, React Native, also with back-end background in Node.js, Express, SQL and NoSQL databases. Really passionate about the Javascript ecosystem in general.My approach is always towards being the best coworker in any team I’m part of, improving both sides of my professional and personal self: problem solving and teamwork in order to be the best developer in the field.",
      "email": "romerjeancarlos@gmail.com",
      "id": 1
    }
  },
  "meta": null,
  "errors": null
}
```

## Testing

There are some unit / integration test on the API using [Jest](https://jestjs.io/)

```bash
$ cd users-api-rest
$ npm run test
```

## Deploy

Currently, both webapp and API rest are deployed on AWS cloud:

Web app (S3 bucket): http://zemoga-test-webapp.s3-website-us-east-1.amazonaws.com
API Rest: https://gttlv53w6g.execute-api.us-east-1.amazonaws.com/dev/

**Note**: To deploy code to AWS cloud, you must first [configure your credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) on your machine:

Deploy Web app:

```bash
$ cd webapp
$ npm run deploy
```

Deploy API Rest:

```bash
$ cd users-api-rest
$ npm run serverless:deploy
```

![Arquitecture diagram](https://zemoga-test-webapp.s3.amazonaws.com/webapp.drawio.png)

## PD

Total time to complete the test: 20 hours

#### Have a good day!
