# Infinite Movies

<p align="left"> 
<img src="https://img.shields.io/circleci/build/github/DibyajyotiMishra/InfiniteMovies/master" alt="build-status" />
<img src="https://img.shields.io/badge/branch-master-blue" alt="current-branch" />
</p>
- Tools used:

1. React, Redux
2. AWS, S3 Bucket, CloudFront
3. Terraform
4. Docker
5. Sentry
6. CircleCI
7. Heroku (For deploying the develop branch)

### A movie recommendation web app powerd by React and MovieDB API. Features include:

* Search For Your Movie
* Infinite Scrolling implemented using Vanilla Javascript (Observer API)
* Handling Network Requests.
* Automatic Deployments using Circle CI and Terraform on AWS S3 served using AWS Cloudfront.

Demo Link: [https://dpsx0xfuer8d.cloudfront.net](https://dpsx0xfuer8d.cloudfront.net)


Steps to run locally:
* Clone the repo.
* Make sure that you have the updated version of Node JS.
* Install yarn using the command: `npm i -g yarn`.
* Run `yarn install`.
* Install Terraform by downloading from [here](https://www.terraform.io/downloads).
* Create an Account at Circle CI.
