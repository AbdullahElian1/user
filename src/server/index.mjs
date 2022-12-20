import '../dataAccess/index.mjs';
import { app } from './express.mjs';

try {
  app.listen(AppConfigs.port, err => {
    console.log('app::initExpress', `tend-apis service running on port ${AppConfigs.port}`);
    if (err) throw err;
  });
} catch (ex) {
  console.log('app::initExpress', ex.message, undefined, ex);
  process.exit(-1);
}
