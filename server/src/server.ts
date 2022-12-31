import app from './app';

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.info(`⚡️[api service]: Server is running at http://localhost:${port}`);
});
