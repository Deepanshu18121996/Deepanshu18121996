/*---------------------
 Faq page Accrodian
--------------------- */
$('.collapse').on('shown.bs.collapse', function(){
  $(this).parent().find(".fa-plus-square").removeClass("fa-plus-square").addClass("fa-minus-square");
  }).on('hidden.bs.collapse', function(){
  $(this).parent().find(".fa-minus-square").removeClass("fa-minus-square").addClass("fa-plus-square");
  });	