
function runInitial() {
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $(document).ready(function () {
    $('#side-menu-btn').on('click', function () {
      toggleSidebar();
      $(this).blur();
      console.log('tooltips setup')
    });

  });

  $(document).ready(function () {
    $('#side-close').on('click', function () {
      toggleSidebar();
      console.log("tooltip for sidebar clicklistener setup")
    });

  });

  function toggleSidebar() {
    $('.sidebar').toggleClass('sidebar--not_active');
    $('.content').toggleClass('content--active_sidebar');
  }

}

export { runInitial };