const init = function RoutesHandler(app) {
  app.get('/', (req, res)=>{
    res.render('pages/main.ejs');
  });

  app.get('/login', (req, res)=>{
    res.render('pages/login.ejs');
  });

  app.get('/feed', (req, res)=>{
    res.render('pages/feed.ejs');
  });

  app.post('/signup', (req, res)=>{
    //
  });
}

module.exports = init;
