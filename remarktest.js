const fs = require('fs');

// Use dynamic imports to load the remark and remark-html modules
import('remark').then((remark) => {
  import('remark-html').then((html) => {
    // Create a new remark processor with options
    const processor = remark.default().use(html.default, {
      // Render HTML tags in output
      sanitize: false,
      // Add class "heading" to h2 headings
      handlers: {
        heading(h, node) {
          if (h.depth === 2) {
            node.properties = { class: 'heading' };
          }
        }
      }
    });

    // Read the markdown file
    fs.readFile('example.md', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      // Convert markdown to HTML using remark
      processor.process(data, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        // Write the HTML to a file
        fs.writeFile('example.html', String(result), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Markdown converted to HTML');
        });
      });
    });
  });
});
