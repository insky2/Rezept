const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fm = require('front-matter');

// Create a custom renderer
const renderer = new marked.Renderer();

// Modify the heading function to add the id attribute to h2 headings
renderer.heading = function (text, level) {
  if (level === 2) {
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level} id="${id}">${text}</h${level}>`;
  } else {
    return `<h${level}>${text}</h${level}>`;
  }
};

// Define the input and output paths
const inputDir = 'RezepteRaw';
const outputDir = 'Rezepte';

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read all markdown files in the input directory
fs.readdirSync(inputDir)
  .filter(file => path.extname(file) === '.md')
  .forEach(file => {
    // Read the file content
    const filePath = path.join(inputDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse the front matter and markdown content
    const { attributes } = fm(fileContent);
    let body = fm(fileContent).body;
    
    // Parse the markdown content to HTML
    const html = marked.Parser(body);

 
    // Write the recipe object to a JSON file
    const outputFilePath = path.join(outputDir, path.basename(file, '.md') + '.json');
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
    fs.writeFileSync(outputFilePath, JSON.stringify(recipe));
  });
