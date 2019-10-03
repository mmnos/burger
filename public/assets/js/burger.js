$(document).ready(function() {

  $("#submit").on("click", (event) => {

    event.preventDefault();

    let burgerName = $("#userInput").val().trim();

    if (burgerName) {

      $.post("/api/burgers", { burger_name : burgerName }, (data) => {

        location.reload();

      });

    }

    console.log(burgerName);

  });

  $(".getDevoured").on("click", (event) => {

    // $(event.currentTarget).attr("data-id");

    // Send the PUT request.
    $.ajax(`/api/burgers/${$(event.currentTarget).attr("data-id")}`, {
      type: "PUT",
      data: { devoured : true }
    }).then(
      function() {
        location.reload();
      }
    );

  });

});