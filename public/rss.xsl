<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>

  <xsl:template match="/rss/channel">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="title"/> — RSS feed</title>
        <style>
          :root { color-scheme: light dark; font-family: Inter, system-ui, sans-serif; }
          * { box-sizing: border-box; }
          body { margin: 0; color: #242424; background: #fff; }
          main { width: min(720px, calc(100% - 32px)); margin: 0 auto; padding: 48px 0 80px; }
          .notice { padding: 18px 20px; border: 1px solid #f0d4c5; border-radius: 16px; background: #fff8f3; }
          .eyebrow { margin: 0 0 8px; color: #f26522; font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
          h1 { margin: 0; font-size: clamp(32px, 7vw, 52px); line-height: 1; letter-spacing: -.04em; }
          .description { margin: 16px 0; color: #666; font-size: 18px; line-height: 1.55; }
          code { display: block; overflow-wrap: anywhere; padding: 10px 12px; border-radius: 8px; background: #f2f2f2; font-size: 13px; }
          .site-link { display: inline-block; margin-top: 18px; color: #003388; font-weight: 600; }
          h2 { margin: 48px 0 8px; font-size: 14px; letter-spacing: .12em; text-transform: uppercase; }
          article { padding: 24px 0; border-top: 1px solid #e8e8e8; }
          article h3 { margin: 0 0 8px; font-size: 22px; line-height: 1.2; letter-spacing: -.02em; }
          article a { color: inherit; text-decoration: none; }
          article a:hover { color: #003388; text-decoration: underline; }
          time { color: #777; font-size: 13px; }
          article p { margin: 10px 0 0; color: #666; line-height: 1.55; }
          @media (prefers-color-scheme: dark) {
            body { color: #eee; background: #111; }
            .notice { border-color: #543526; background: #211812; }
            .description, article p, time { color: #aaa; }
            code { background: #242424; }
            .site-link, article a:hover { color: #9ab5ff; }
            article { border-color: #333; }
          }
        </style>
      </head>
      <body>
        <main>
          <section class="notice">
            <p class="eyebrow">RSS feed</p>
            <h1><xsl:value-of select="title"/></h1>
            <p class="description"><xsl:value-of select="description"/></p>
            <p>Copy this URL into any RSS reader:</p>
            <code>https://blog2.esciencecenter.nl/rss.xml</code>
            <a class="site-link" href="{link}">Visit blog &#8594;</a>
          </section>

          <h2>Latest posts</h2>
          <xsl:for-each select="item">
            <article>
              <h3><a href="{link}"><xsl:value-of select="title"/></a></h3>
              <time><xsl:value-of select="pubDate"/></time>
              <p><xsl:value-of select="substring(description, 1, 240)"/>…</p>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
