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
          label: 'Get Started',
          items: [
            { label: 'Prerequisites', slug: 'docs/getting-started/prerequisites' },
            { label: 'Quick Start', slug: 'docs/getting-started/quickstart' },
            { label: 'Classroom deployment', slug: 'docs/getting-started/classroom' },
          ],
        },
        {
          label: 'Create a Lab',
          items: [{ label: 'How to create a Lab', slug: 'docs/build-labs' }],
        },
        {
          label: 'Features',
          items: [
            { label: 'Overview', slug: 'docs/features' },
            { label: 'Static routing', slug: 'docs/features/static-routing' },
            { label: 'OSPF', slug: 'docs/features/ospf' },
            { label: 'BGP', slug: 'docs/features/bgp' },
            { label: 'IPv4 and IPv6', slug: 'docs/features/ipv6' },
            { label: 'VLANs and switches', slug: 'docs/features/vlans' },
            { label: 'NAT', slug: 'docs/features/nat' },
            { label: 'DHCP', slug: 'docs/features/dhcp' },
            { label: 'DNS', slug: 'docs/features/dns' },
            { label: 'DNSSEC', slug: 'docs/features/dnssec' },
            { label: 'Container Hosts', slug: 'docs/features/container-hosts' },
            { label: 'ExaBGP (Experimental)', slug: 'docs/features/exabgp' },
            { label: 'Packet Capture', slug: 'docs/features/packet-capture' },
            { label: 'Multi-Lab Mode', slug: 'docs/features/multi-lab' },
          ],
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
