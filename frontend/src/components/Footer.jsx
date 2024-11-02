import React from 'react';
import { Calendar, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Mail className="w-5 h-5" />, href: "#", label: "Email" },
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" }
  ];

  const footerLinks = [
    { title: "About", href: "#" },
    { title: "Features", href: "#" },
    { title: "Privacy", href: "#" },
    { title: "Terms", href: "#" }
  ];

  return (
    <footer className="relative mt-8 bg-blue-950">
      {/* Main footer content */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Top section with logo and links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo and description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-blue-300" />
                <span className="text-xl font-bold text-blue-300">
                  Calendar App
                </span>
              </div>
              <p className="text-blue-200/80 text-sm">
                Streamline your schedule and boost productivity with our intuitive calendar solution.
              </p>
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-blue-200/80 hover:text-blue-300 transition-colors duration-300 text-sm"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Contact</h3>
              <div className="space-y-2 text-sm text-blue-200/80">
                <p>support@calendarapp.com</p>
                <p>+91 1234567809</p>
                <p>Fictitious Street</p>
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Stay Updated</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-blue-900/50 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow text-sm placeholder-blue-200/50"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8"></div>

          {/* Bottom section with copyright and social links */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-blue-200/80 text-sm">
              &copy; {currentYear} Calendar App. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-blue-900/50 rounded-lg hover:bg-blue-800/50 transition-colors duration-300 text-blue-300 hover:text-blue-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
