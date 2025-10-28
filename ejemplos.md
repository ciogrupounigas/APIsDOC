# Ejemplos de uso

### Ejemplo de llamada con `fetch` en JavaScript

```js
fetch("https://api.tuservidor.com/catalog/dataset")
  .then(res => res.json())
  .then(data => console.log(data));
