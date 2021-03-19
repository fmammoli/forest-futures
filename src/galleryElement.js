function galleryElement(data, template) {
  let itemClone = template.content.querySelector("li").cloneNode(true);
  itemClone.querySelector("img").src = data.link;
  itemClone.querySelector("h3").innerHTML = data.id;
  itemClone.querySelector("p").innerHTML = data.desc;
  return itemClone;
}
export default galleryElement;
