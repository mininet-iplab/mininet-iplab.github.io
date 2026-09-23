import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://mininet-iplab.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Mininet-IPLab',
      description:
        'A network emulation framework for teaching IP routing and core network services on top of Mininet.',
      logo: {
        src: './src/assets/mininet-iplab-mark.svg',
        alt: 'Mininet-IPLab',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/mininet-iplab/mininet-iplab',
        },
      ],
      customCss: ['./src/styles/starlight.css'],
      disable404Route: true,
      sidebar: [
        {
          label: 'Understand',
          items: [{ label: 'Overview', slug: 'docs/understand' }],
        },
        {
          label: 'Get Started',
          items: [{ label: 'Overview', slug: 'docs/getting-started' }],
        },
        {
          label: 'Build Labs',
          items: [{ label: 'Overview', slug: 'docs/build-labs' }],
        },
        {
          label: 'Lab Examples',
          items: [{ label: 'Overview', slug: 'docs/lab-examples' }],
        },
        {
          label: 'Web UI',
          items: [{ label: 'Overview', slug: 'docs/web-ui' }],
        },
        {
          label: 'Reference',
          items: [{ label: 'Overview', slug: 'docs/reference' }],
        },
        {
          label: 'Contribute',
          items: [{ label: 'Overview', slug: 'docs/contribute' }],
        },
      ],
    }),
  ],
});
