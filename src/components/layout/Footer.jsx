import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M8 12l4-4 4 4-4 4z" />
                </svg>
              </div>
              <span className="text-xl font-bold">Comet</span>
            </div>
            <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
              Delivering the latest and most relevant news from around the globe, 24/7.
            </p>
          </div>

          <div className="mt-8 sm:mt-0">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-1">
              <li>
                <Link to="/?category=breaking" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">Breaking News</Link>
              </li>
              <li>
                <Link to="/?category=business" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">Business</Link>
              </li>
              <li>
                <Link to="/?category=technology" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">Technology</Link>
              </li>
              <li>
                <Link to="/?category=health" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">Health</Link>
              </li>
              <li>
                <Link to="/?category=entertainment" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">Entertainment</Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-1">
              <li>
                <Link to="/about" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-lg font-semibold">Connect with us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-colors hover:bg-[hsl(var(--secondary))]">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-colors hover:bg-[hsl(var(--secondary))]">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-colors hover:bg-[hsl(var(--secondary))]">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-colors hover:bg-[hsl(var(--secondary))]">
                <Linkedin size={20} />
              </a>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium">Subscribe to our newsletter</h4>
              <div className="mt-2 flex max-w-sm">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-l-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                />
                <button className="rounded-r-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[hsl(var(--border))] pt-8 text-center">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            © {new Date().getFullYear()} Comet News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;