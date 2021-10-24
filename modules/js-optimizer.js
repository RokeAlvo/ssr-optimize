import consola from 'consola';

const logger = consola.withScope('js-optimization:module');

const bodyRegex = /<body[^>]*>(.*)<\/body>/s;
// list of all JS includes
const scriptRegex = /<script[\w"= ]*src="(.*?)".*?><\/script>/g;
// essenitials are all with "pages" or ending with "app.js"
const validScriptRegex = /\/(legacy-)?.*?-(pages.*?|.*app).js/;

module.exports = async function JSOptimizer(moduleOptions) {
  if (!moduleOptions.setOutputFilenames) {
    logger.error(
      'JS optimization works only when you explicitly opt in for overwriting output filenames in nuxt!'
    );
    return;
  }

  if (!this.options.build) this.options.build = {};
  this.options.build.filenames = {
    ...this.options.build.filenames,
    app: ({ isModern, isDev }) =>
      `${!isModern ? 'legacy-' : 'modern-'}${!isDev ? '[contenthash]' : '[name]'}-app.js`,
    chunk: ({ isModern, isDev }) =>
      `${!isModern ? 'legacy-' : 'modern-'}${!isDev ? '[contenthash]-' : ''}[name].js`
  };

  this.nuxt.hook('render:route', async (url, page, { req, res }) => {
    if (!page.html || (res.statusCode && res.statusCode !== 200) || page.redirected || page.error) {
      if (moduleOptions.debug) {
        logger.info(
          'skipping optimize JS render:route',
          JSON.stringify({
            url,
            isAmp: req.isAMP,
            matchedRoute: req.matchedRoute,
            page: page.html.length,
            statusCode: res.statusCode,
            error: page.error,
            redirected: page.redirected
          })
        );
      }
      return;
    }

    if (moduleOptions.debug) {
      logger.info(
        'optimize JS render:route',
        JSON.stringify({ url, isAmp: req.isAMP, matchedRoute: req.matchedRoute })
      );
    }

    if (!req.isAMP) {
      // remove all non-essential JS files

      let { html } = page;

      const bodyString = bodyRegex.exec(html);

      if (!bodyString || !bodyString[0]) {
        logger.warn('no body tag found', html);
        return;
      }
      const body = bodyString[0];

      const links = body.matchAll(scriptRegex);

      for (const match of links) {
        if (!validScriptRegex.test(match[1])) {
          // remove non essential JS
          html = html
            .replace(match[0], '') // script tag
            .replace(`<link rel="modulepreload" href="${match[1]}" as="script">`, '') // module preload
            .replace(`<link rel="preload" href="${match[1]}" as="script">`, ''); // preload

          if (moduleOptions.debug) {
            logger.info('removed js tags for', match[1]);
          }
        }
      }

      page.html = html; // set new response
    }
  });

  logger.success('JS optimization module initialised');
};
