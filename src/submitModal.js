function submitModal(DATA_TABLE) {
  const submitModal = document.querySelector("#modal-submit");
  const closeModalBtn = document.querySelector(".close-submit");
  const modalBg = document.querySelector(".modal-bg2");

  const modalSubmitBtn = document.querySelector("#submit-btn");
  //modalBg.addEventListener("click", toggleModal);
  closeModalBtn.addEventListener("click", function (e) {
    toggleModal(e);
  });

  modalSubmitBtn.addEventListener("click", function (e) {
    //submit DATA_TABLE.submit()
    toggleModal(e);
    console.log("sending");
    console.log(DATA_TABLE);
    emailjs
      .send("service_cma2qch", "template_a1nyz3t", {
        message: JSON.stringify(DATA_TABLE),
      })
      .then(
        function (response) {
          console.log("Send Sucess!", response.status, response.text);
        },
        function (err) {
          console.log("Send error..", error);
        }
      );
    document.querySelector("#gallery").scrollIntoView();
  });

  function toggleModal(e) {
    modalBg.classList.toggle("bg-active");

    submitModal.classList.toggle("modal-active");
  }

  function open() {
    toggleModal();
  }

  return { submitModal, open, close };
}
export default submitModal;
