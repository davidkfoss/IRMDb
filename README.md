[------------------------nav------------------------](navigation.md)

# International Review Movie Database (IRMDb)

## Table of contents

- [Description](#description)
- [Visuals](#visuals)
- [Local installation and usage](#local-installation-and-usage)
- [Roadmap](#roadmap)
- [Accessibility and Sustainability](#accessibility-and-sustainability)
- [Linting and formatting](#linting-and-formatting)
- [Authors and acknowledgment](#authors-and-acknowledgment)
- [Project status](#project-status)

## Description

IRMDb is a user-friendly application that helps you discover, review, and rate your favorite movies. With a comprehensive database of movies (**9000+ movies**) from various genres, you can easily search, filter, and sort through a vast collection.

### Main features

- Search for movies by title
- Filter movies by genres
- Sort movies by title, rating, and year
- Pagination, retrieving 12 movies at a time
- View movie details
- Add reviews to movies
- See reviews from other users on movies
- Landing page with popular and recent reviews
- Upvote reviews

## Visuals

<img src="./client/public/screenshots/Screenshot1.png" width="800"/>

The movies page shows results for the filters you have selected

<img src="./client/public/screenshots/Screenshot2.png" width="800"/>

When clicking on a movie, you can see more details about it and add a review

<img src="./client/public/screenshots/Screenshot3.png" width="800"/>

The landing page shows popular and recent reviews

## Local installation and usage

The following instructions will guide you through the process of installing and running the application locally, however you can also access the application at [http://it2810-44.idi.ntnu.no/project2/](http://it2810-44.idi.ntnu.no/project2/) if connected to the NTNU network, either at site or through a VPN.

Clone the repository with

`git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-44/prosjekt-2.git`

<br>

Navigate to [server](./server/) folder and run

`npm install`

to install dependencies, and

`npm start`

to start the server

<br>

Navigate to [client](./client/) folder and run

`npm install`

to install dependencies, and

`npm run dev`

to start the client.

<br>

Open your web browser and navigate to [localhost:5173](http://localhost:5173) to access the application

## Roadmap

- Version 2.2 (**current**)
  - Backend (graphql, express, mongoDB)
  - New features
    - Add reviews to movies
    - See reviews from other users on movies
    - Landing page with popular and recent reviews
    - Upvote reviews
  - User experience
    - Increased responsiveness for all devices
    - Web accessibility
- Version 2.3 (Future Release)
  - Testing

We welcome any suggestions or feature requests from the community.

## Accessibility and Sustainability

### Accessibility (WCAG 2.2 compliance)

Accessibility is discussed in detail in [this](./client/README.md#accessibility-wcag-22-compliance) section of the client README.

### Sustainability

Sustainability is discussed in detail in [this](./server/README.md#sustainability) section of the server README.

In addition, we have a dark design theme that reduces the amount of light emitted by the screen, which is beneficial for the environment.

#### Improvements on Sustainability:

Because of the high load of images on the website, we could have used lazy loading to reduce the amount of data transferred between the client and server. This could have improved sustainability. The browser most often does cache images, but lazy loading would have been more efficient. A dedicated CDN could also have been used to further improve sustainability, however this is not applicable to a project of this size.

Since we do not host the images ourselves, we have no control over the image sizes. We could have used the aforementioned CDN to resize the images to the size we need, which would have reduced the amount of data transferred between the client and server, improving sustainability. An alternative is to use a dedicated image hosting service that provides images in the size and format we need, with a better compression algorithm. These alternatives are not really relevant to a project of this size, however it is worth noting.

## Linting and formatting

To lint the code, run the following command in the respective client and server folders:

`npm run lint`

To check the formatting of the code, run the following command:

`npm run check-format`

To format the code with prettier, run the following command:

`npm run format`

## Authors and acknowledgment

Thor Sjursen

Christian Veiby

David Foss

#

## Project status

Under development
