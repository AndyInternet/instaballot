import { server } from './app';

const port = process.env.PORT || 6000;
server.listen(port, () => {
  console.info(`⚡️[api service]: Server is running at http://localhost:${port}`);
});
