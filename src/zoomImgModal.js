function zoomImgModal() {
  const imgModal = document.querySelector("#img-modal");
  const img = document.querySelector("#img-modal > picture > img");
  const closeBtn = document.querySelector(".close-img");

  const modalBg = document.querySelector(".modal-bg3");

  function open(src) {
    toggleModal();
    img.src = src;
  }

  //modalBg.addEventListener("click", toggleModal);
  closeBtn.addEventListener("click", closeModal);

  function closeModal(e) {
    modalBg.classList.remove("bg-active");
    imgModal.classList.remove("modal-active");
  }

  function toggleModal(e) {
    console.log("toggle");
    modalBg.classList.toggle("bg-active");
    imgModal.classList.toggle("modal-active");
  }

  return { imgModal, open };
}

export default zoomImgModal;
