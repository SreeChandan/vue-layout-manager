//import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    //typescript({ tsconfig: 'tsconfig.json', typescript: require('typescript') })
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
