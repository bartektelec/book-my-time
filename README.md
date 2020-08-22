# BookMyTime

An app for asynchronous appointment scheduling using Google OAuth

[![Contributors][contributors-shield]][contributors-url] [![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url] [![MIT License][license-shield]][license-url]

-- THIS IS NOT WORKING YET --

## Table of Contents

- About the Project
  - Built with
- Getting started
  - Prerequisites
  - Installation
- Usage
- License
- Contact

## About the project

This is an app that let's you create a new Google calendar that can be viewed by others who have your personal link. People viewing the page are able to schedule an appointment in your calendar.

You will get notified with all the needed data about the meeting when an appointment is scheduled.

You will be able to cancel appointments simply by clicking a link provided in the e-mail and/or in the calendar event.

### Built with

- TypeScript
- MongoDB
- Passport.js

## Getting started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before installing the project you will need to install the following:

- npm

`npm install npm@latest -g`

- node.js and nodemon

`npm install -g node nodemon`

- docker

### Installation

1. Clone this repo
2. Install all needed dependencies

   `npm install`

3. Mount a docker container using the bash script provided in the project

   `bash ./run.sh`

## Usage

Create a user by registering using Google OAuth.

Send a link provided in the confirmation e-mail to your friend.

When he visits the link he will be able to see all your appointments and add one self.
_For more examples, please read the docs_

## License

Distributed under the MIT License. See `LICENSE` for more information.

## **Contact**

[@pierniki](https://github.com/pierniki)

[@bartektelec](https://github.com/bartektelec)

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/bartektelec/book-my-time.svg?style=flat
[contributors-url]: https://github.com/bartektelec/book-my-time/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bartektelec/book-my-time.svg?style=flat
[forks-url]: https://github.com/bartektelec/book-my-time/network/members
[stars-shield]: https://img.shields.io/github/stars/bartektelec/book-my-time.svg?style=flat
[stars-url]: https://github.com/bartektelec/book-my-time/stargazers
[issues-shield]: https://img.shields.io/github/issues/bartektelec/book-my-time.svg?style=flat
[issues-url]: https://github.com/bartektelec/book-my-time/issues
[license-shield]: https://img.shields.io/github/license/bartektelec/book-my-time.svg?style=flat
[license-url]: https://github.com/bartektelec/book-my-time/blob/master/LICENSE.txt
