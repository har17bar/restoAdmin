$(document).ready(function() {
  $("#add").click(function(e,poxos) {
    var lastField = $("#buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 2;
    var fieldWrapper = $("<div class=\"fieldwrapper\" style='display: flex;flex-direction: row' id=\"field" +'-'+ intId + "\"/>");
    fieldWrapper.data("idx", intId);
    var fName = $("<input type=\"file\"  name=\'item\'/><input name=\"name\" class=\"form-control\" type=\"text\"/><input name=\"price\"  class=\"form-control\" type=\"text\"/><input class=\"form-control\" name=\"desc\" type=\"text\"/>");
    var removeButton = $("<button type=\"button\" class=\"button hollow circle\" data-quantity=\"minus\" data-field=\"quantity\">\n" +
      "      <i class=\"fa fa-minus\" aria-hidden=\"true\"></i>\n" +
      "    </button>");
    removeButton.click(function() {
      $(this).parent().remove();
    });
    fieldWrapper.append(fName);
    fieldWrapper.append(removeButton);
    $(".For-append").append(fieldWrapper);
  }).trigger('click',{a:"[pxsfa"});

  $("#preview").click(function() {
    $("#yourform").remove();
    var fieldSet = $("<fieldset id=\"yourform\"><legend>Your Form</legend></fieldset>");
    $("#buildyourform div").each(function() {
      var id = "input" + $(this).attr("id").replace("field","");
      var label = $("<label for=\"" + id + "\">" + $(this).find("input.fieldname").first().val() + "</label>");

      fieldSet.append(label);
    });
    $("body").append(fieldSet);
  });
});

