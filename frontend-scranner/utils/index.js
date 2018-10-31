import vision from '@google-cloud/vision';
process.env.GOOGLE_APPLICATION_CREDENTIALS = "/Users/patrick/Documents/Northcoders/project/Scranner-Project/frontend-scranner/config/googleVision.JSON"
// import fs from "fs";

export const analyseRecipe = fileName => {
  const client = new vision.ImageAnnotatorClient();

  const request = {
    image: {
      content: fileName,
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

