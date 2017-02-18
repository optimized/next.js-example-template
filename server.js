const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const pathMatch = require('path-match');
const route = pathMatch();
const staticmatch = route('/static/:file');

app.prepare()
.then(() => {
  createServer((req, res) => {

    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const staticfiles = staticmatch(pathname);

    // Match sitemap
    if( pathname.match(new RegExp(/^\/[^\/]+\.(xml|png|ico)$/)) ) {

      app.serveStatic(req, res, 'static/_index/' + pathname);

    } else if (staticfiles !== false) {

      app.serveStatic(req, res, 'static/_o/' + staticfiles.file);

    } else {

      handle(req, res)
      return

    }


  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
