function gbifService() {
  const API_BASE = "https://api.gbif.org/v1/";
  const SEARCH_SPECIES = API_BASE + "species/match?verbose=true&name=";

  const SPECIES = "species/";
  const MEDIA = "/media";
  //   https://api.gbif.org/v1/species/search?q=Abuta%20grandifolia&rank=GENUS

  //api.gbif.org/v1/occurrence/search?scientificName=Abuta%20grandifolia&mediaType=stillImage
  async function request(speciesName) {
    let media = [];
    try {
      const response = await fetch(
        `https://api.gbif.org/v1/occurrence/search?scientificName=${speciesName}&mediaType=stillImage`,
        {
          mode: "cors",
        }
      );
      const result = await response.json();
      return result.results.map((e) => {
        console.log(e);
        return { src: e.media[0].identifier, reference: e.media[0].references };
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  return { request };
}

export default gbifService;
