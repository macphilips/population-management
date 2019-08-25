import registerApiDoc from './api-docs';
import registerLocation from './location/location.routes';
import { registerErrorHandler } from './errors';

const basePath = '/api/v1';
const routes = (app) => {
  registerApiDoc(app, basePath);
  registerLocation(app, basePath);
  // must be the last thing to register
  registerErrorHandler(app);
  return app;
};


export default routes;
