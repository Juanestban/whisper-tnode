const isDevelopment = process.env.NODE_ENV === 'development';

const env = {
  mode: process.env.NODE_ENV,
  isDevelopment,
};

export default env;
