const fs = require('fs');
const marked = require('marked');

// Read the markdown file
fs.readFile('example.md', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Convert markdown to HTML
    const html = marked.parse(data);

    // Write the HTML to a file
    fs.writeFile('example.html', html, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Markdown converted to HTML');
    });
});
