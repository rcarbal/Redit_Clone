$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
  });

  $(document).ready(function () {

    $('#side-menu-btn').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).blur();
    });

});

$(document).ready(function () {

  $('#side-close').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

});