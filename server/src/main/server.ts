import { env } from '../infrastructure/config/env';
import app from './app';

app.listen(env.Port, () => {
  console.log('server is listening');
});
