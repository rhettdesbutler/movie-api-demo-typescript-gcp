# API Demo

A demonstration of a fictional service, where movies can be queried, added or removed from a database.

## Pre-requisites

- To test this solution, a local or GCP cloudsql database needs to be available to connect to.
- Tables `magic_movie_catalogue` and `magic_movie_users` need to be created, with the help of the script located in `./docker/db/10-init.sql`.
- Data from `https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies` needs to be loaded onto the table: `magic_movie_catalogue`.
- Users need to be loaded onto the `magic_movie_users` table also from the same above script.

## To run locally

The follow steps can be used to run the API locally:

- Add a .env file and replicate the data from `./cloud-config` for the desired ENV.
- Add in the .env file a `LOCAL='true'` flag.
- Run the script `sh runners/app-up.sh` to allow the local postgres db to spin up (no required if existing db is in place).
- Run `npm run start`to locally start the API, on port `8080`.

### Notes

Reminder to update the respective functions to allow for password retrieval, and the CICD file will require modification(s) to deploy to a different GCP environment/configuration.
