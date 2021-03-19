import zoomModal from "./zoomImgModal";
function galleryElement(data, template) {
  let itemClone = template.content.querySelector("li").cloneNode(true);
  itemClone.querySelector("img").src = data.link;
  itemClone.querySelector("h3").innerHTML = data.id;
  itemClone.querySelector("p").innerHTML = data.desc;

  const imgModal = new zoomModal();

  const galleryItems = document.querySelectorAll(
    "#gallery > .grid-container > .grid-element"
  );
  console.log(galleryItems);
  for (let index = 0; index < galleryItems.length; index++) {
    console.log("a");
    galleryItems[index].addEventListener(
      "click",
      openImg(galleryItems[index].children[0].children[0].src)
    );
  }

  function openImg(imgSrc) {
    console.log("alollll");
    imgModal.open(imgSrc);
  }

  return itemClone;
}
export default galleryElement;
