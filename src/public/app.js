$(document).ready(function () {
  // console.log('running');
  var table = $('table');
  $(table).on('click', '.delete', function () {
    if (confirm('Are You Sure Want To Delete the City?')) {
      var row = $(this).closest('tr');
      var id = $(row).find('button').data('id');
      // console.log(id);
      window.location.href = 'deletecity/' + id;
    } 
  });
  /* table.addEventListener('click', e => {
    // console.log(e.target.classList.contains('delete'));
    if (e.target.classList.contains('delete')) {
      if (confirm('Are You Sure Want To Delete The City?')) {
        // console.log(e.target.dataset.id);
        var id = e.target.dataset.id;
        window.location.href = '/deletecity/' + id;
      } 
    }
    e.stopPropagation();
  }); */
  $(table).on('click', '.deletedep', function () {
    if (confirm('Are You Sure Want To Delete Departament?')) {
      var row = $(this).closest('tr');
      var id = $(row).find('button').data('id');
      // console.log(id);
      window.location.href = 'deletedep/' + id;
    } 
  });
  var search = $('#search');
  // console.log(search);
  $(search).on('input', function (e) {
    var searchCity = e.target.value;
    // console.log(searchCity);
    if (searchCity.length == 0) {
      // console.log('empty');
      // window.location.href = '/';
      getSearch();
    }
    $.get("/searchcity/?q=" + searchCity,
      function (data, textStatus, jqXHR) {
        // console.log(data);
        var temp = '';
        data.forEach((item, i) => {
          // console.log(item);
          temp += `
            <tr>
              <th scope="col">${(i + 1)}</th>
              <td scope="row">${item.name_ci}</td>
              <td scope="row">${item.name_dep}</td>
              <td scope="row">
              <a href="/editcity/${item.id_ci}" class="btn btn-info"><i class="bi bi-pen-fill"></i></a>
              </td>
              <td>
                <button class="btn btn-danger delete" data-id="${item.id_ci}"><i class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          `;
        });
        $('#tbody').html(temp);
      }
      ); 
  });
  $('#searchDep').on('input', function (e) {
    var val = e.target.value;
    if (val.length == 0) {
      getSearchDep();
    }
    var temp = '';
    $.get("/searchdep/?s=" + val, function (data) {
      data.forEach((dep, i) => {
        temp += `
        <tr>
          <th scope="col">${(i + 1)}</th>
          <td scope="row">${dep.name_dep}</td>
          <td scope="row">
            <a href="/editdep/${dep.id_dep}" class="btn btn-info"><i class="bi bi-pen-fill"></i></a>
          </td>
          <td>
            <button class="btn btn-danger deletedep" data-id="${dep.id_dep}"><i class="bi bi-trash-fill"></i></button>
          </td>
        </tr>
        `;
      });
      $('#tbodyDep').html(temp);    
      }
    );
  });
  /**
   * muestra el content de la table
   */
  function getSearch() {
    var templ = '';
    $.get("/getcity", function (data) {
      data.forEach((city, i) => {
        templ += `
        <tr>
        <th scope="col">${(i + 1)}</th>
        <td scope="row">${city.name_ci}</td>
        <td scope="row">${city.name_dep}</td>
        <td scope="row">
        <a href="/editcity/${city.id_ci}" class="btn btn-info"><i class="bi bi-pen-fill"></i></a>
        </td>
        <td>
        <button class="btn btn-danger delete" data-id="${city.id_ci}"><i class="bi bi-trash-fill"></i></button>
        </td>
        </tr>
        `;
      });
      $('#tbody').html(templ);
      }
    );
  }
  /**
   * muestra el content de la table
   */
  function getSearchDep() {
    var temp = '';
    $.get("/getdep", function (data) {
       data.forEach((dep, i) => {
        temp += `
          <tr>
            <th scope="col">${(i + 1)}</th>
            <td scope="row">${dep.name_dep}</td>
            <td scope="row">
            <a href="/editdep/${dep.id_ci}" class="btn btn-info"><i class="bi bi-pen-fill"></i></a>
            </td>
            <td>
              <button class="btn btn-danger deletedep" data-id="${dep.id_ci}"><i class="bi bi-trash-fill"></i></button>
            </td>
          </tr>
        `;
       });
       $('#tbodyDep').html(temp);
      });
  }
  var change = $('#change');
  var change2 = $('#change2');
  $(change).click(function () {
    var pass_user = $('#pass_user');
    var i = $('#i');
    if ($(pass_user).is("input[type='password']")) {
      $(pass_user).attr('type', 'text');
      // console.log(i);
      // console.log($(i).hasClass('bi-eye-fill'));
      if ($(i).hasClass('bi-eye-fill')) {
        $(i).removeClass('bi-eye-fill');
        $(i).addClass('bi-eye-slash-fill');
      }
    } else {
      $(pass_user).attr('type', 'password');
      if ($(i).hasClass('bi-eye-slash-fill')) {
        $(i).removeClass('bi-eye-slash-fill');
        $(i).addClass('bi-eye-fill');
      }
    }
  });
  var change2 = $('#change2');
  $(change2).click(function () { 
    var new_pass_user = $('#new_pass_user');
    var conf_pass_user = $('#conf_pass_user');
    var i2 = $('#i2');
    if ($(new_pass_user).is("input[type='password']")) {
      $(new_pass_user).attr('type', 'text');
      // console.log(i);
      // console.log($(i).hasClass('bi-eye-fill'));
      if ($(i2).hasClass('bi-eye-fill')) {
        $(i2).removeClass('bi-eye-fill');
        $(i2).addClass('bi-eye-slash-fill');
      }
    } else {
      $(new_pass_user).attr('type', 'password');
      if ($(i2).hasClass('bi-eye-slash-fill')) {
        $(i2).removeClass('bi-eye-slash-fill');
        $(i2).addClass('bi-eye-fill');
      }
    }
    if ($(conf_pass_user).is("input[type='password']")) {
      $(conf_pass_user).attr('type', 'text');
      // console.log(i);
      // console.log($(i).hasClass('bi-eye-fill'));
      if ($(i2).hasClass('bi-eye-fill')) {
        $(i2).removeClass('bi-eye-fill');
        $(i2).addClass('bi-eye-slash-fill');
      }
    } else {
      $(conf_pass_user).attr('type', 'password');
      if ($(i2).hasClass('bi-eye-slash-fill')) {
        $(i2).removeClass('bi-eye-slash-fill');
        $(i2).addClass('bi-eye-fill');
      }
    }
  });
  var change3 = $('#change3');
  $(change3).click(function (e) {
    var add_pass_user = $('#add_pass_user');
    var i3 = $('#i3');
    if ($(add_pass_user).is("input[type='password']")) {
      $(add_pass_user).attr('type', 'text');
      if ($(i3).hasClass('bi-eye-fill')) {
        $(i3).removeClass('bi-eye-fill');
        $(i3).addClass('bi-eye-slash-fill');
      }
    } else {
      $(add_pass_user).attr('type', 'password');
      if ($(i3).hasClass('bi-eye-slash-fill')) {
        $(i3).removeClass('bi-eye-slash-fill');
        $(i3).addClass('bi-eye-fill');
      }
    }
  });
  var passReset = $('#pass_reset');
  $(passReset).click(function () { 
    var user = prompt('Please Add This Username If Exists?');
    if (user.length == 0) {
      window.location.href = '/login';
    } else {
      $.get("/passreset", {user},
        function (data, textStatus, jqXHR) {
          // console.log(typeof data === 'object');
          if (typeof data.id_user === 'undefined') {
            window.location.href = '/login';
            alert('This Name Not Exists');
          } else {
            window.location.href = '/passresetuni/' + data.id_user;
            // console.log(data.id_user);
          }
          // if (data.length > 0) {
          //   window.location.href = '/passreset';
          // } else {
          //   alert('This Name Not Exists!');
          // }
      });
    }
  });
  var formNewPass = $('#formNewPass');
  $(formNewPass).submit(function (e) { 
    e.preventDefault();
    var new_pass_user = $('#new_pass_user');
    var conf_pass_user = $('#conf_pass_user');
    var id_user = $('#id_user').val();
    // console.log($(id_user).val());
    var val1 = $(new_pass_user).val();
    var val2 = $(conf_pass_user).val();
    // console.log(val1 === val2);
    if (val1 === val2) {
      $.post("/passreset", {new_pass_user: val1, id_user: id_user},
        function (data, textStatus, jqXHR) {
         console.log(textStatus);
          if (data) {
            alert('Updated');
            window.location.href = '/login';
          } else {
            alert('This User Not Exists!');
            window.location.href = '/login';
          }
        }
      );
    } else {
      alert('¡Ohh, Has a Error!, This Values Not Equals!');
    }
    $(formNewPass).trigger('reset');
  });
  // var formRegister = $('#formRegister');
  // $(formRegister).submit(function (e) { 
  //   e.preventDefault();
  //   var add_name_user = $('input[name="add_name_user"]').val();
  //   var add_pass_user = $('input[name="add_pass_user"]').val();
  //   // console.log(add_name_user+ ' ' +add_pass_user);
  //   $.post("/register", {add_name_user, add_pass_user},
  //     function (data, textStatus, jqXHR) {
  //       console.log(data === 'Added');
  //     }
  //   );
  //   $(formRegister).trigger('reset');
  // });
});