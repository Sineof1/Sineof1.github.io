
function updateCourseDisplay() {
   var chosen_course = $('.choose_course').find(":selected").text();
   if (chosen_course === 'Course 1') {
   $('.c1, .c2, .c3').show();
   $('.c2, .c3').hide();
   }
   else if (chosen_course === 'Course 2') {
   $('.c1, .c2, .c3').show();
   $('.c1, .c3').hide();
   }
   else if (chosen_course === 'Course 3') {
   $('.c1, .c2, .c3').show();
   $('.c1, .c2').hide();
   }
   else if (chosen_course === 'All') {
   $('.c1, .c2, .c3').show();
   }
}
