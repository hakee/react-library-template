import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonJS from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import styles from 'rollup-plugin-styles'

const packageJson = require('./package.json')

export default [
  {
    input: 'src/index.ts',
    cache: false,
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    treeshake: false,
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonJS(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      styles(),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    // input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default(), styles()],
  },
]
