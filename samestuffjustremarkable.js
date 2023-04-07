const fs = require('fs');
const { Remarkable } = require('remarkable');

// Create a new Remarkable instance with options
const md = new Remarkable({
  html: true, // Render HTML tags in output
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Auto-convert URL-like text to links
});

// Modify the renderer to add id attribute to h2 headings
md.renderer.rules.heading_open = function (tokens, idx) {
  if (tokens[idx].hLevel === 2) {
    const text = tokens[idx + 1].content;
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${tokens[idx].hLevel} id="${id}">`;
  } else {
    return `<h${tokens[idx].hLevel}>`;
  }
};

// Read the markdown file
fs.readFile('example.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Convert markdown to HTML using Remarkable
  const html = md.render(data);

  // Write the HTML to a file
  fs.writeFile('example.html', html, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Markdown converted to HTML');
  });
});
