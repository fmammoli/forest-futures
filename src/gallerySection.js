import galleryElement from "./galleryElement";
import saatchi from "../resources/AGLB_Legend.jpg";
import amazonMask from "../resources/amazon-mask.png";

function gallerySection() {
  let GALLERY_IMAGES = [
    {
      id: 1,
      link: "../resources/AGLB_Legend.jpg",
      desc: "1balbalblalblalbal",
    },
    {
      id: 2,
      link: "../resources/AGLB_Legend.jpg",
      desc: "Pan Amazon Pixel Mask",
    },
    {
      id: 3,
      link: "../resources/AGLB_Legend.jpg",
      desc: "3balbalblalblalbal",
    },
    {
      id: 4,
      link: "../resources/AGLB_Legend.jpg",
      desc: "4balbalblalblalbal",
    },
  ];

  const gallery = document.querySelector(".grid-container");

  const galleryElementTemplate = document.querySelector(
    "#grid-element-template"
  );

  // let fragment = document.createDocumentFragment();
  // GALLERY_IMAGES.forEach((e) => {
  //   const item = new galleryElement(e, galleryElementTemplate);
  //   fragment.appendChild(item);
  // });
  // console.log("alo");
  // gallery.appendChild(fragment);
  return gallery;
}

export default gallerySection;
