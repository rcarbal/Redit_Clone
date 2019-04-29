$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function () {

  $('#side-menu-btn').on('click', function () {
    toggleSidebar();
    $(this).blur();
  });

});

$(document).ready(function () {

  $('#side-close').on('click', function () {
    toggleSidebar();
  });

});

function toggleSidebar() {
  $('.sidebar').toggleClass('sidebar--not_active');
  $('.content').toggleClass('content--active_sidebar');
}