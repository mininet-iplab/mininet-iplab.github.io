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
          items: [
            { label: 'Overview', slug: 'docs/understand' },
            {
              label: 'Routing and Link Conditions',
              items: [
                { label: 'Learning path', slug: 'docs/understand/routing-and-link-conditions' },
                {
                  label: 'Static routing',
                  slug: 'docs/understand/routing-and-link-conditions/static-routing',
                },
                { label: 'OSPF', slug: 'docs/understand/routing-and-link-conditions/ospf' },
                { label: 'BGP', slug: 'docs/understand/routing-and-link-conditions/bgp' },
                {
                  label: 'IPv4 and IPv6',
                  slug: 'docs/understand/routing-and-link-conditions/ip-addressing',
                },
                {
                  label: 'Link Conditions',
                  slug: 'docs/understand/routing-and-link-conditions/link-conditions',
                },
              ],
            },
          ],
        },
        {
          label: 'Get Started',
          items: [
            { label: 'Overview', slug: 'docs/getting-started' },
            { label: 'First Lab quickstart', slug: 'docs/getting-started/quickstart' },
          ],
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
