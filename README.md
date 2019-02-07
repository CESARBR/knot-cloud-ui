# knot-cloud-ui

KNoT Cloud UI.

## Installation and usage

This service is part of the KNoT Cloud and requires a subset of its service to work. It is a React front-end and a small Express server that act as a proxy to the actual API service.

### Configuration

Configuration is made via environment variables. The configuration parameters are:

* `PORT` **Number** Server port number. (Default: 80|3000)
* `API_HOSTNAME` **String** API service hostname. (Default: **localhost**)
* `API_PORT` **Number** API service port. (Default: 3003)
* `WS_HOSTNAME` **String** WebSocket adapter hostname. (Default: **localhost**)
* `WS_PORT` **Number** WebSocket adapter port. (Default: 3004)

### Build and run (local)

First, install the dependencies:

```
yarn
```

Then:

```
yarn build
yarn start:server
```

### Build and run (local, development)

First, install the dependencies:

```
yarn
```

Then, start the server with auto-reload:

```
yarn start
```

### Build and run (Docker, development)

A development container is specified at `Dockerfile-dev`. To use it, execute the following steps:

1. Build the image:

    ```
    docker build . -f Dockerfile-dev -t knot-cloud-ui-dev
    ```

1. Create a file containing the configuration as environment variables.
1. Run the container:

    ```
    docker run --env-file ui.env -p 4000:80 -v `pwd`:/usr/src/app -ti knot-cloud-ui-dev
    ```

The first argument to `-v` must be the root of this repository, so if you are running from another folder, replace `` `pwd` `` with the corresponding path.

This will start the server with auto-reload.

### Run (Docker)

Containers built from the master branch and the published tags in this repository are available on [DockerHub](https://hub.docker.com/r/cesarbr/knot-cloud-ui/).

1. Create a file containing the configuration as environment variables.
1. Run the container:

```
docker run --env-file ui.env -p 4000:80 -ti cesarbr/knot-cloud-ui
```

### Verify

Point your browser to http://&lt;hostname&gt;:&lt;port&gt;.