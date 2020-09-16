# volto-corsproxy
[![Releases](https://img.shields.io/github/v/release/eea/volto-corsproxy)](https://github.com/eea/volto-corsproxy/releases)

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

## Getting started

1. Create new volto project if you don't already have one:
    ```
    $ npm install -g @plone/create-volto-app
    $ create-volto-app my-volto-project
    $ cd my-volto-project
    ```

1. Update `package.json`:
    ``` JSON
    "addons": [
        "@eeacms/volto-corsproxy"
    ],

    "dependencies": {
        "@eeacms/volto-corsproxy": "github:eea/volto-corsproxy#0.1.0"
    }
    ```

1. Install new add-ons and restart Volto:
    ```
    $ yarn
    $ yarn start
    ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
