const commonConfig = {
  // App level config - for instance config see instance folder (eg: data, testZone, mystery)
  //eventPrefix: 'chronicle_',
  //charStart: 'begining',
  autoload: [
    //'app/testZone/config.js',

    'app/tools/elementBuilder.js',
    'app/tools/loadGameSave.js',
    'app/tools/tools.js',

    //'app/constructors/container.js',
    'app/constructors/plans.js',
    'app/stage/theater.js',
    //'app/stage/headless.js',
    //'app/stage/royal.js',

    'app/game/cabinet.js',
    'app/game/actions.js',
    'app/game/customActions.js',
    'app/game/marshalls.js',
  ],

}
