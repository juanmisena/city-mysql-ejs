const controller = {
  login: (req, res, next) => {
    res.render('login', {title: 'Login'});
  },
  saveuser: (req, res, next) => {
    const { name_user } = req.body;
    const { pass_user } = req.body;
    if (name_user && pass_user) { 
      req.getConnection((err, conn) => {
        if (err) throw err;
        var sql = "SELECT `id_user`,`name_user` FROM `user` WHERE `name_user` = ? AND `pass_user` = ?";
        conn.query(sql, [name_user, pass_user], (err, rows) => {
          if (err) throw err;
          if (rows.length > 0) {
            rows.forEach(function(user) {
              req.session.id_user = user.id_user;
              req.session.name_user = user.name_user;
              req.session.loggedin = true;
              res.redirect('/');
            });
          } else {
            res.redirect('/login');
          }
        });
      });
    }
  },
  register: (req, res) => {
    res.render('register', {title: 'Register User'});
  },
  registersave: (req, res) => {
    const { add_name_user } = req.body;
    const { add_pass_user } = req.body;
    if (add_name_user && add_pass_user) {
      req.getConnection((err, conn) => {
        if (err) throw err;
        const addUser = {name_user: add_name_user, pass_user: add_pass_user}
        var sql = "INSERT INTO `user` SET ?";
        conn.query(sql, [addUser], (err, rows1) => {
          if (err) throw err;
          sql = "SELECT DISTINCT * FROM `user` WHERE `name_user` = ?";
          conn.query(sql, [addUser.name_user], (err, rows2) => {
            if (err) throw err; 
            if (rows2.length > 0) {
              rows2.forEach((user) => {
                req.session.id_user = user.id_user;
                req.session.name_user = user.name_user;
                req.session.loggedin = true;
                res.redirect('/');
              });
            } else {
              res.redirect('/login');
            }
          });
        });
      });
    } 
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect('/login');
    });
  },
  passreset: (req, res) => {
    const { user } = req.query;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "SELECT * FROM `user` WHERE `name_user` = ?";
      conn.query(sql, [user], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
          rows.forEach((user, i) => {
          });
          res.send(rows[0]);
        } else {
          res.redirect('/login');
        }
      });
    });
  },
  passresetuni: (req, res) => {
    const { id_user } = req.params;
    res.render('passReset', {title: 'Pass Reset', id_user: id_user});
  },
  passresetsave: (req, res) => {
    const { new_pass_user } = req.body;
    const { id_user } = req.body;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "UPDATE `user` SET `pass_user` = ? WHERE `id_user` = ?";
      conn.query(sql, [new_pass_user, id_user], (err, rows) => {
        if (err) throw err;
        res.send(rows.affectedRows == 1);
      });
    });
  },
  edituser: (req, res) => {
    
  }
}
module.exports = controller;