import morgan from 'morgan';
import chalk from 'chalk';

morgan.token('color-status', (req, res) => {
  const status = res.statusCode;
  const color = status >= 500 ? 'red'
              : status >= 400 ? 'yellow'
              : status >= 300 ? 'cyan'
              : 'green';
  return chalk[color](status);
});

const logger = morgan((tokens, req, res) => {
  return [
    chalk.blue(tokens.method(req, res)),
    chalk.green(tokens.url(req, res)),
    tokens['color-status'](req, res),
    chalk.magenta(tokens['response-time'](req, res) + ' ms')
  ].join(' ');
});

export default logger;
