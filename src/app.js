import videoSection from "./videoSection";
import gallerySection from "./gallerySection";
import spaceSection from "./spaceSection";
import finalDataTable from "./finalDataTable";
import submitModal from "./submitModal";

const DATA_TABLE = new finalDataTable();

const vid = new videoSection();
const gallery = new gallerySection();
const space = new spaceSection(DATA_TABLE);
// const submitM = new submitModal(DATA_TABLE);
console.log("aloo");
