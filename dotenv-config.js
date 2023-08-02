import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(__dirname + '/.env'),
});

console.log(path.resolve(__dirname + '/.env'));
