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
