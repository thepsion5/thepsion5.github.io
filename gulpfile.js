var elixir = require('laravel-elixir');

var publicDir = './js/';

elixir(function(mix)
{
    //Render react.js components
    mix.browserify(['./_js/app.js'], publicDir + 'bundle.js');
    
});
