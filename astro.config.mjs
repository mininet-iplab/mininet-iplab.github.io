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
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
      },
      routeMiddleware: './src/routeData.ts',
      sidebar: [
        {
          label: 'Get Started',
          items: [
            { label: 'Overview', slug: 'docs/getting-started' },
            { label: 'Prerequisites', slug: 'docs/getting-started/prerequisites' },
            { label: 'Quick Start', slug: 'docs/getting-started/quickstart' },
            { label: 'Classroom deployment', slug: 'docs/getting-started/classroom' },
          ],
        },
        {
          label: 'Lab Examples',
          items: [{ label: 'Lab Example catalog', slug: 'docs/lab-examples' }],
        },
        {
          label: 'Create a Lab',
          items: [
            { label: 'How to create a Lab', slug: 'docs/build-labs' },
            { label: 'Persistent Config', slug: 'docs/build-labs/persistent-config' },
          ],
        },
        {
          label: 'Features',
          items: [
            { label: 'Overview', slug: 'docs/features' },
            {
              label: 'Routing',
              items: [
                { label: 'Static routing', slug: 'docs/features/static-routing' },
                { label: 'OSPF', slug: 'docs/features/ospf' },
                { label: 'BGP', slug: 'docs/features/bgp' },
                { label: 'RIP and other FRR protocols', slug: 'docs/features/other-protocols' },
                { label: 'ExaBGP (Experimental)', slug: 'docs/features/exabgp' },
              ],
            },
            {
              label: 'Addressing and switching',
              items: [
                { label: 'IPv4 and IPv6', slug: 'docs/features/ipv6' },
                { label: 'VLANs and switches', slug: 'docs/features/vlans' },
                { label: 'NAT and the NAT Table', slug: 'docs/features/nat' },
              ],
            },
            {
              label: 'Network Services',
              items: [
                { label: 'DHCP', slug: 'docs/features/dhcp' },
                { label: 'DHCPv6', slug: 'docs/features/dhcpv6' },
                { label: 'DHCP Relay', slug: 'docs/features/dhcp-relay' },
                { label: 'Authoritative DNS', slug: 'docs/features/dns' },
                { label: 'Secondary nameserver', slug: 'docs/features/dns-secondary' },
                { label: 'Recursive Resolver', slug: 'docs/features/dns-resolver' },
                { label: 'DNSSEC', slug: 'docs/features/dnssec' },
              ],
            },
            {
              label: 'Nodes',
              items: [{ label: 'Container Hosts', slug: 'docs/features/container-hosts' }],
            },
            {
              label: 'Web UI and observation',
              items: [
                { label: 'Web UI Mode', slug: 'docs/features/web-ui' },
                { label: 'Link Conditions', slug: 'docs/features/link-conditions' },
                { label: 'Packet Capture', slug: 'docs/features/packet-capture' },
                { label: 'Lab Prompt', slug: 'docs/features/lab-prompt' },
              ],
            },
            {
              label: 'Classroom',
              items: [{ label: 'Multi-Lab Mode', slug: 'docs/features/multi-lab' }],
            },
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
