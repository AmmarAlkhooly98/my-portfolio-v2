$("#submitEmail").click((e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const API_ENDPOINT = "/api/v1/mailer";
  const userFeedback = $("#contact-feedback");
  const username = $("#contact-name").val();
  const email = $("#contact-email").val();
  const subject = $("#contact-subject").val();
  const message = $("#contact-message").val();

  if (!username || !email || !subject || !message) {
    userFeedback.css("color", "orange");
    userFeedback
      .html("Please fill in all fields.")
      .show()
      .delay(4000)
      .fadeOut("slow");
  } else {
    axios
      .post(API_ENDPOINT, {
        name: username,
        email,
        subject,
        message,
      })
      .then((res) => {
        userFeedback.css("color", "blue");
        userFeedback.html(res.data.message).show().delay(5000).fadeOut("slow");
        $(":input", "#contact-form")
          .not(":button, :submit, :reset, :hidden")
          .val("");
      })
      .catch((e) => {
        userFeedback.css("color", "#FFC300");
        userFeedback
          .html(e.response.data.message)
          .show()
          .delay(5000)
          .fadeOut("slow");
      });
  }
});
