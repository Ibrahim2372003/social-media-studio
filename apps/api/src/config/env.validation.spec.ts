import { validateEnv } from './env.validation.js';

describe('validateEnv', () => {
  it('applies defaults when variables are missing', () => {
    const env = validateEnv({});
    expect(env.NODE_ENV).toBe('development');
    expect(env.API_PORT).toBe(3000);
  });

  it('converts a numeric string port', () => {
    expect(validateEnv({ API_PORT: '4100' }).API_PORT).toBe(4100);
  });

  it('rejects an invalid port', () => {
    expect(() => validateEnv({ API_PORT: '70000' })).toThrow(/API_PORT/);
  });

  it('rejects an unknown NODE_ENV', () => {
    expect(() => validateEnv({ NODE_ENV: 'staging' })).toThrow(/NODE_ENV/);
  });
});
