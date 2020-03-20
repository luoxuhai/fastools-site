export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
    },
  },
  plugins: process.env.NODE_ENV === 'production' ? null : [require('dva-logger')()],
};
