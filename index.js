import app from './server';

const port = process.env.PORT !== undefined ? process.env.PORT : 8000;

app.listen(port, function () {
  console.log('listening at', port);
});
