import app from './app';

const PORT: number | string = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}...`);
});
