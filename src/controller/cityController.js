const controller = {
  list: (req, res) => {
    req.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
      var sql = "SELECT `ci`.`id_ci`, `ci`.`name_ci`, `dep`.`name_dep` FROM `city` AS `ci` INNER JOIN `departament` AS `dep` ON `ci`.`id_dep`=`dep`.`id_dep` ORDER BY `ci`.`name_ci` ASC";
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
        // console.log(sess.name_user);
        res.render('index', {data: rows, user: sess.name_user, title: 'City'});
      });
    });
  },
  add: (req, res) => {
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "SELECT * FROM `departament` ORDER BY `name_dep` ASC";
      conn.query(sql, (err, rows) => {
        if (err) throw err;
        if (typeof req.session.loggedin !== 'undefined') {
          if (req.session.loggedin != true) {
            res.redirect('/login');
          }
        } else {
          res.redirect('/login');
        }
        var sess = req.session;
        res.render('addCity', {data: rows, user: sess.name_user, title: 'Add City'});
      });
    });
  },
  save: (req, res) => {
    const { name_ci } = req.body;
    const { id_dep } = req.body;
    const addCity = {name_ci, id_dep}
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "INSERT INTO `city` SET ?";
      conn.query(sql, [addCity], (err, rows) => {
        res.redirect('/');
      });
    });
  },
  edit: (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    req.getConnection((err, conn) => {
      if (err) throw err;
      // var sql = "SELECT `ci`.`id_ci`, `ci`.`name_ci`, `dep`.`name_dep` FROM `city` AS `ci` INNER JOIN `departament` AS `dep` ON `ci`.`id_dep`=`dep`.`id_dep` WHERE `id_ci` = ? ORDER BY `ci`.`name_ci` ASC";
      var sql = "SELECT * FROM `city` WHERE `id_ci` = ? ORDER BY `name_ci` ASC";
      conn.query(sql, [id], (err, citys) => {
        if (err) throw err;
        // console.log(citys[0]);
        // sql = `SELECT * FROM departament AS dep WHERE id_dep = (SELECT DISTINCT ci.id_dep FROM city AS ci WHERE ci.id_dep = ${citys[0].id_dep})`;
        sql = "SELECT * FROM `departament` ORDER BY `name_dep` ASC";
        conn.query(sql, (err, deps) => {
          if (err) throw err;
          // console.log(deps);
          // var udep = deps.id_dep === citys.id_dep;
          // console.log(udep + ' ' + deps.name_dep);
          if (typeof req.session.loggedin !== 'undefined') {
            if (req.session.loggedin != true) {
              res.redirect('/login');
            }
          } else {
            res.redirect('/login');
          }
          var sess = req.session;
          res.render('editCity', {ci: citys[0], depu: deps, user: sess.name_user, title: 'Edit City'});
        });
      });
    });
  },
  update: (req, res) => {
    // console.log(req.params);
    // console.log(req.body);
    const { id } = req.params;
    const { name_ci } = req.body;
    const { id_dep } = req.body;
    const editCity = {name_ci, id_dep}
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "UPDATE `city` SET ? WHERE `id_ci` = ?";
      conn.query(sql, [editCity, id], (err, rows) => {
        if (err) throw err;
        res.redirect('/');
      });
    });
  },
  delete: (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = "DELETE FROM `city` WHERE `id_ci`= ?";
      conn.query(sql, [id], (err, rows) => {
        if (err) {
          throw err;
        }
        res.redirect('/');
      });
    });
  },
  search: (req, res) => {
    // console.log(req.query);
    const { q } = req.query;
    req.getConnection((err, conn) => {
      if (err) throw err;
      var sql = `SELECT ci.id_ci, ci.name_ci, dep.name_dep FROM city AS ci INNER JOIN departament AS dep ON ci.id_dep=dep.id_dep WHERE ci.id_ci LIKE '%${q}%' OR ci.name_ci LIKE '%${q}%' OR dep.name_dep LIKE '%${q}%' ORDER BY ci.name_ci ASC`;
      conn.query(sql, (err, rows) => {
        if (err) throw err;
        res.send(rows);
      });
    });
  },
  searchcity: (req, res) => {
    req.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
      var sql = "SELECT `ci`.`id_ci`, `ci`.`name_ci`, `dep`.`name_dep` FROM `city` AS `ci` INNER JOIN `departament` AS `dep` ON `ci`.`id_dep`=`dep`.`id_dep` ORDER BY `ci`.`name_ci` ASC";
      conn.query(sql, [], (err, rows) => {
        if (err) throw err;
        res.send(rows);
      });
    });
  }
}
module.exports = controller;