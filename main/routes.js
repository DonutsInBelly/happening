const init = function RoutesHandler(app) {
  app.get('/', (req, res)=>{
    res.render('pages/main.ejs');
  });

  app.get('/login', (req, res)=>{
    res.render('pages/login.ejs');
  });
}

module.exports = init;
