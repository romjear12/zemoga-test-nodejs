# NodeJs + AWS Portfolio web app

Portfolio web app with a aimple arquitecture serverless using AWS resources.

### Requeriments

- [Node >= 14](https://nodejs.org/es/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Serverless Framework](https://www.serverless.com/framework/docs)

### Live Demo

[Portfolio web app](https://s3.aws.com)

### Quickstart

Clone this repository to your local machine

```bash
$ git clone https://github.com/romjear12/zemoga-test-nodejs
$ cd zemoga-test-nodejs
```

- #### Webapp

  Install dependencies to build and run project locally

  ```bash
  $ cd webapp
  $ npm install
  $ npm start
  ```

  Web app will be available on http://localhost:3000

  By default, API calls point to public endpoints (API Gateway URL). e.g. https://gttlv53w6g.execute-api.us-east-1.amazonaws.com/dev/users/1

- #### Serverless API

  There are two separates projects:

  - ##### Users (**users-api-rest**) https://gttlv53w6g.execute-api.us-east-1.amazonaws.com/dev
    - GET /users
    - GET /users/:id
    - PUT /users/:id
  - ##### Twitter API (**twitter-integration**) https://yczw2ucht6.execute-api.us-east-1.amazonaws.com/dev
    - GET /users/:username/tweets

  Install serverless framework on your local machine to build and deploy the API endpoints

  ```bash
  $ npm install -g serverless
  ```

  To run API locally:

  ```bash
  $ cd <folder>
  $ npm install
  $ npm run serverless:local
  ```

  **folder** might be _users-api-rest_ or _twitter-integration_. The API will be available on http://localhost:3000

  To deploy API to AWS cloud, you must first [configure your credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) on your machine.:

  ```bash
  $ npm install -g aws-cli
  $ aws configure
  $ cd <folder>
  $ npm run serverless:deploy
  ```
