import React from 'react';
import { Mail, PhoneCall, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have a question, feedback, or news tip? We'd love to hear from you.
            Our team is ready to assist with any inquiries or information you need.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">contact@cometnews.com</p>
                <p className="text-muted-foreground">tips@cometnews.com (for news tips)</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <PhoneCall className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">347 - 918 - 4292</p>
                <p className="text-muted-foreground">Mon-Fri: 9:00 AM - 5:00 PM EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">Comet News</p>
                <p className="text-muted-foreground">224 W 35th St Ste 500</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>
            <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </a>
            <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-3.54-4.13a.7.7 0 0 1-.97 0 .68.68 0 0 1 0-.97l2.65-2.65-2.65-2.65a.68.68 0 0 1 0-.97.7.7 0 0 1 .97 0L12 12.2l3.54-3.54a.7.7 0 0 1 .97 0 .68.68 0 0 1 0 .97l-2.65 2.65 2.65 2.65a.68.68 0 0 1 0 .97.7.7 0 0 1-.97 0L12 12.2l-3.54 3.54z" />
              </svg>
            </a>
            <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full rounded-md border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className="w-full rounded-md border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Subject of your message"
                className="w-full rounded-md border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your message"
                className="w-full rounded-md border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </form>
        </section>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-6">For Press Inquiries</h2>
        <p className="text-muted-foreground mb-4">
          If you're a member of the press and would like to speak with one of our editors or request
          an interview, please contact our media relations team at press@cometnews.com or call our
          press office at 347 - 918 - 4292.
        </p>
      </section>
    </div>
  );
};

export default ContactPage;