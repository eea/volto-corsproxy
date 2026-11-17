# @eeacms/volto-corsproxy

[![Releases](https://img.shields.io/github/v/release/eea/volto-corsproxy)](https://github.com/eea/volto-corsproxy/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-corsproxy%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-corsproxy/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-corsproxy&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-corsproxy)

[Volto](https://github.com/plone/volto) add-on

## Features

###

This package enables fetching data from third-party servers through the Volto
HTTP server, this way bypassing any CORS security restrictions imposed by the
browser.

The way it does this is by providing a pass-through CORS proxy server on the
path (configurable) `/cors-proxy` path. For example, any requests made to the
URL `http://localhost:3000/cors-proxy/http://example.com/` will be piped to
the http://example.com website, through the Volto node server.

As you wouldn't want to provide an open proxy, all proxied destinations need to
be configured either via `settings.allowed_cors_destinations` (which takes
a list of hostnames) or an environment variable called
`RAZZLE_ALLOWED_CORS_DESTINATIONS` (where you need to provide a comma-separated
list of hostnames).

For example:

```
settings.allowed_cors_destinations = ['eea.europa.eu', 'plone.org']

```

or:

```
RAZZLE_ALLOWED_CORS_DESTINATIONS=eea.europa.eu,plone.org yarn start
```

As a convenience feature for dealing with third-party API endpoints, there's
a new action available, `getProxiedExternalContent`, somewhat similar to
Volto's `getContent`. Call it like: `getProxiedExternalContent(thirdpartyurl)`
and it will make that async content available in the Redux content reducer, at
`store.content.subrequests[thirdpartyurl]`.

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-corsproxy": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-corsproxy'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
