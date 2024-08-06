import { Hono } from 'hono';
import { Meta } from './types';

const randomRoute = new Hono();

randomRoute.get('/random', (c) => {
  // mdxページを収集する
  const posts = import.meta.glob<{ frontmatter: Meta }>('./posts/*.mdx', {
    eager: true,
  })
  const postsLinks = Object.entries(posts).map(([id, _module]) => {
    return  `/posts/${id}`;
  });
  // 固定ページ
  const pageLinks = [
    '/about',
    '/contact',
    '/timeline',
    '/sitemap',
  ];

  const links = [...postsLinks, ...pageLinks];

  // ランダムに選択する
  const randomIndex = Math.floor(Math.random() * links.length);
  return c.redirect(links[randomIndex]);
});

export default randomRoute;
