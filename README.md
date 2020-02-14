# deprecated by volto-base!


## volto-corsproxy

A replacement for the Volto server providing a builtin CORS proxy.

To use it, replace your index.js with:

```
import start from 'volto-corsproxy/start-server';

const reloadServer = start();

if (module.hot) {
  reloadServer();
}
```

In the ``config.js`` file, add a new key to the ``settings`` variable, named
``allowed_cors_destinations``. This is an array of strings, each string being
a hostname that will be allowed as proxy destination. For example, to allow
embedding files from the eea.europa.eu domain, set the settings like:

```
settings.allowed_cors_destinations = ['eea.europa.eu']

```

Another option is to provide a system environment variable named
ALLOWED_CORS_DESTINATIONS, which is a list of comma separated hostnames.
