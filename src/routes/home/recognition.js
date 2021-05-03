import { createWorker } from 'tesseract.js';
const pattern  = /([0-9]{1,2})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([N|S]) ([0-9]{1,3})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([E|W])/g;

const worker = createWorker({
  logger: m => console.log(m)
});

const coordinatesParser = (paragraphs) => {
  let coords;
  let CoordArray=[];
  paragraphs.forEach(element => {
    coords = element.text.match(pattern);
    CoordArray= CoordArray.concat(coords);
  });
  return CoordArray;
}

export  async function recognizer(image) {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { paragraphs } } = await worker.recognize(image);
  console.log(paragraphs);
  if(paragraphs)
  return coordinatesParser(paragraphs);
  await worker.terminate();
}

 
