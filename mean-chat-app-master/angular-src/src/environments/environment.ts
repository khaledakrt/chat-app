// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const BASE_URL = 'http://192.168.3.98:8000';

export const environment = {
  production: false,
  chatUrl: BASE_URL,
  backendUrl: `${BASE_URL}/api`,
  chatPath: '/mean-chat-app.io',
};
