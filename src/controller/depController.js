const controller = {
  listdep: (req, res) => {
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "SELECT * FROM `departament` ORDER BY `name_dep` ASC";
      conn.query(sql, (err, rows) => {
        if (err) {
          res.json(err);
        }
        if (typeof req.session.loggedin !== 'undefined') {
          if (req.session.loggedin != true) {
            res.redirect('/login');
          }
        } else {
          res.redirect('/login');
        }
        var sess = req.session;
        res.render('indexDep', {data: rows, user: sess.name_user, title: 'Dep'});
      });
    });
  },
  addep: (req, res) => {
    if (typeof req.session.loggedin !== 'undefined') {
      if (req.session.loggedin != true) {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
    var sess = req.session;
    res.render('addEp', {user: sess.name_user, title: 'Add Dep'});
  },
  savedep: (req, res) => {
    const { name_dep } = req.body;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "INSERT INTO `departament` SET ?";
      conn.query(sql, [{name_dep}], (err, rows) => {
        if (err) throw err;
        res.redirect('/indexdep');
      });
    });    
  },
  editdep: (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "SELECT * FROM `departament` WHERE `id_dep` = ?";
      conn.query(sql, [id], (err, rows) => {
        if (err) throw err;
        if (typeof req.session.loggedin !== 'undefined') {
          if (req.session.loggedin != true) {
            res.redirect('/login');
          }
        } else {
          res.redirect('/login');
        }
        var sess = req.session;
        res.render('editDep', {dep: rows[0], user: sess.name_user, title: 'Edit Dep'}); 
      });
    });
  },
  updatedep: (req, res) => {
    const { id } = req.params;
    const { name_dep } = req.body;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "UPDATE `departament` SET ? WHERE `id_dep` = ?";
      conn.query(sql, [{name_dep}, id], (err, rows) => {
        if (err) throw err;
        res.redirect('/indexdep');
      });
    });
  },
  deletedep: (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "DELETE FROM `departament` WHERE `id_dep` = ?";
      conn.query(sql, [id], (err, rows) => {
        if (err) throw err;
        res.redirect('/indexdep');
      });
    });
  },
  searchd: (req, res) => {
    const { s } = req.query;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = `SELECT * FROM departament WHERE id_dep LIKE '%${s}%' OR name_dep LIKE '%${s}%' ORDER BY name_dep ASC`;
      conn.query(sql, [], (err, rows) => {
        if (err) throw err;
        res.send(rows);
      });
    });
  },
  searchdep: (req, res) => {
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "SELECT * FROM `departament` ORDER BY `name_dep` ASC";
      conn.query(sql, [], (err, rows) => {
        if (err) throw err;
        res.send(rows);
      });
    });
  },
}
module.exports = controller;