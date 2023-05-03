import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/helpers/validateEnv.helper';
import App from './app';

validateEnv();
const app = new App(Number(process.env.PORT));

app.listen();
