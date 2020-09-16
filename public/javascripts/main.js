$(document).ready(function() {
  $(".update").on("click", event => { // listenning for updating btn
    console.log("clicked");
    const title = $("input.form-control").val();
    const content = $("textarea").val();
    const id = $("input.hidden").val();
    console.log(title, content, id);
    // Update Request
    axios({
        method: "patch",
        url: "/article/edit/" + id,
        data: {
          title,
          content
        }
      })
      .then(res => {
        console.log(res.data);
        window.location.href = "/article/" + id;
      })
      .catch(err => {
        console.log(err);
      })
  });
  $("button.delete").click(event => { // listenning for deleting btn
    console.log("delete button clicked")
    const id = event.target.value;
    console.log(id);
    const url = `/article/delete/${id}`;
    // Delete Request
    axios({
        method: "delete",
        url: url
      })
      .then(res => {
        console.log(res)
        window.location.href = "/article";
      })
      .catch(err => console.log(err));
  })
  $("button.user").click(event => {
    const userData = document.querySelector("input.user");
    console.log("btn user clicked");
    if (userData) {
      userData.click()
    }
    // event.preventDefault();
  })
});
