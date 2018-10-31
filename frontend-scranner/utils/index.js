process.env.GOOGLE_APPLICATION_CREDENTIALS = "/home/emma/Northcoders/Project/frontend/Scranner-Project/frontend-scranner/config/googleVision.json"
const vision = require('@google-cloud/vision');
const fs = require ("fs")

const analyseRecipe = (fileName) => {
const client = new vision.ImageAnnotatorClient();

//filename needs to come from the frontend image upload
// const fileName = `/home/emma/Northcoders/Project/frontend/Scranner-Project/frontend-scranner/testimages/1.jpg`;

const request = {
  image: {
    content: fs.readFileSync(fileName),
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

module.exports = analyseRecipe;