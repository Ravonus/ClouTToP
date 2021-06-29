/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 2:16:42 pm
 * @copyright TechnomancyIT
 */

module.exports = {
  externals: ['sqlite3', 'iohook'],
  hooks: 'require:./electronBuild/hooksController.ts',
  packagerConfig: {
    // asar: {
    //   unpackDir: '{node_modules/iohook,.webpack/plugins}',
    // },
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'nodepaper',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/index.tsx',
              name: 'main_window',
            },
            {
              html: './src/wallpaper.html',
              js: './src/wp.tsx',
              name: 'wallpaper',
            },
            {
              html: './src/transparent.html',
              js: './src/child.tsx',
              name: 'child',
            },
          ],
        },
      },
    ],
  ],
};
