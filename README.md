# volto-corsproxy

A replacement for the Volto server providing a builtin CORS proxy.

To use it, replace your index.js with:

```
import start from 'volto-corsproxy/start-server';

const reloadServer = start();

if (module.hot) {
  reloadServer();
}
```

Configure the allowed_cors_destinations in config.settings or provide a system
environment variable named ALLOWED_CORS_DESTINATIONS, which is a list of comma
separated hostnames.
