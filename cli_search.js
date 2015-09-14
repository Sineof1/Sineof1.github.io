var click_Drawer = 0;
var pg_imgs = ['CCAII_Page_0001.jpg', 'CCAII_Page_0003.jpg', 'CCAII_Page_0010.jpg',
               'CCAII_Page_0001.jpg', 'CCAII_Page_0003.jpg', 'CCAII_Page_0010.jpg',
               'CCAII_Page_0001.jpg', 'CCAII_Page_0003.jpg', 'CCAII_Page_0010.jpg'];

$(document).ready(function() {
   setTimeout(function(){$('#book-menu').show(); $('#book-menu').animate({right: '+=40px'}, 800, 'easeInOutBack');}, 1000);
   $('#book-menu').height(window.innerHeight);
   $('#tab-pull').click(function() {
      click_Drawer += 1;
      if (click_Drawer % 2 === 0) $('#book-menu').animate({right: '-=150px'}, 800, 'easeInOutBack');
      else $('#book-menu').animate({right: '+=150px'}, 800, 'easeInOutBack');
   });
   $('#searchbox').focus(function() {$(this).attr('placeholder', '');});
   $('#searchbox').blur(function() {$(this).attr('placeholder', 'Search');});
   $('#searchbox').focus();
   $('#searchbox').bind('keypress', function(evt) {
      if (evt.keyCode === 13) slideResults();
   });
   $('.book-select').click(function() {
     var id = $(this).attr('id');
     $('#' + id).toggleClass('selected-book');});
 });

 function slideResults() {
    for (var a = 0; a < pg_imgs.length; a++) {
      var i = $('<img>');
      i.attr({'src': pg_imgs[a], 'width': '130px', 'height': '160px'});
      var x = $('<div></div>');
      x.appendTo('#page-display');
      x.addClass('display-page');
      i.appendTo(x);}
      $('#page-display').animate({right: '+=100%'}, 2000, 'easeInOutBack');
      $('#searchbox').unbind('keypress');

 }
