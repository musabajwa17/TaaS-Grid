import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: ['Modules', 'Solutions', 'Pricing', 'Enterprise', 'Startup']
    },
    {
      title: 'Services',
      links: ['Case studies', 'Guides', 'Webinars', 'Reports', 'Company']
    },
    {
      title: 'About us',
      links: ['Careers', 'Contact', 'Blog', 'Privacy', 'Terms']
    },
    {
      title: 'Security',
      links: ['Compliance', 'Support', 'Help center', 'Community', 'Status']
    },
    {
      title: 'Updates',
      links: ['Integrations', 'Partner program', 'Developer docs', 'API reference', 'Changelog']
    },
    {
      title: 'Roadmap',
      links: ['Community forum', 'Events', 'Conferences', 'Workshops', 'Webinars']
    }
  ];

  return (
    <footer className="bg-black text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Build your talent ecosystem with TaaS Grid
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl">
            Comprehensive platform connecting students, employers, and trainers through innovative digital solutions
          </p>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            {/* <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">T</span>
            </div> */}
            <p className="text-gray-400 text-sm">
              © 2024 TaaS Grid. All rights reserved.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
              aria-label="X (Twitter)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;