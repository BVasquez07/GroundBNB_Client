const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const envFile = `export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiUrl: '${process.env.API_URL}',
  googleOAuthUrl: '${process.env.GOOGLE_OAUTH_URL}'
};
`;

const targetPath = path.join(__dirname, './src/environments/environment.ts');

if (!fs.existsSync(path.dirname(targetPath))) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
}

fs.writeFileSync(targetPath, envFile);
