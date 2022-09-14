$("#submitEmail").click(() => {
  const API_ENDPOINT = "/api/v1/mailer";
  const userFeedback = $("#contact-feedback");
  let username = $("#contact-name").val();
  let email = $("#contact-email").val();
  let subject = $("#contact-subject").val();
  let message = $("#contact-message").val();

  if (!username || !email || !subject || !message) {
    userFeedback.fadeIn("fast");
    userFeedback.css("color", "orange");
    userFeedback.html("Please fill in all fields.");
    userFeedback.fadeOut(10000);
  } else {
    axios
      .post(API_ENDPOINT, {
        name: username,
        email,
        subject,
        message,
      })
      .then((res) => {
        userFeedback.fadeIn("fast");
        userFeedback.css("color", "blue");
        userFeedback.html(res.data);
        userFeedback.fadeOut(10000);
        $(":input", "#contact-form")
          .not(":button, :submit, :reset, :hidden")
          .val("");
      })
      .catch((e) => {
        userFeedback.fadeIn("fast");
        userFeedback.css("color", "#FFC300");
        userFeedback.html(e.response.data);
        userFeedback.fadeOut(10000);
      });
  }
});
