process.env.GOOGLE_APPLICATION_CREDENTIALS = "../config/googleVision.JSON"
const vision = require('@google-cloud/vision');
const fs = require("fs")

const analyseRecipe = () => {
  const client = new vision.ImageAnnotatorClient();

  //filename needs to come from the frontend image upload
  // const fileName = ;

  const request = {
    image: {
      content: fs.readFileSync("../images/testimage.jpg"),
    },
  };
  return client
    .documentTextDetection(request)
    .then(results => {
      const fullTextAnnotation = results[0].fullTextAnnotation;
      console.log(fullTextAnnotation.text)
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

}
analyseRecipe();
module.exports = analyseRecipe;