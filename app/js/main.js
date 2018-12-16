$(document).ready(function() {
  setTimeout(function() {
    $(".loading").addClass("loaded");
    $(".background").removeClass("unload");
    $(".container").removeClass("unload");
  }, 2000);
});
