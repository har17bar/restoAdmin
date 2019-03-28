$(document).ready(function() {
  $("#add").click(function() {
    var lastField = $("#buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 2;
    var fieldWrapper = $("<div class=\"fieldwrapper\" style='display: flex;flex-direction: row' id=\"field" +'-'+ intId + "\"/>");
    fieldWrapper.data("idx", intId);
    var fName = $("<input type=\"file\" name=\'item\'/><input name=\"name\" type=\"text\"/><input name=\"price\" type=\"text\"/><input name=\"desc\" type=\"text\"/>");
    var removeButton = $("<input type=\"button\" class=\"remove\" value=\"-\" />");
    removeButton.click(function() {
      $(this).parent().remove();
    });
    fieldWrapper.append(fName);
    fieldWrapper.append(removeButton);
    $(".form-group").append(fieldWrapper);
  });
  $("#preview").click(function() {
    $("#yourform").remove();
    var fieldSet = $("<fieldset id=\"yourform\"><legend>Your Form</legend></fieldset>");
    $("#buildyourform div").each(function() {
      var id = "input" + $(this).attr("id").replace("field","");
      var label = $("<label for=\"" + id + "\">" + $(this).find("input.fieldname").first().val() + "</label>");
      var input;
      fieldSet.append(label);
    });
    $("body").append(fieldSet);
  });
});
