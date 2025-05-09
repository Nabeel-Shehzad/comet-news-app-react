import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">About Comet News</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground mb-4">
          At Comet News, our mission is to deliver accurate, unbiased, and timely news coverage from around the globe.
          Founded in 2025, we strive to keep our readers informed with the most relevant stories across politics, business,
          technology, health, entertainment, and more. We believe that access to reliable information is essential for
          making informed decisions in today's fast-paced world.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-muted-foreground mb-4">
          Comet News is powered by a diverse team of experienced journalists, editors, and technology experts who are
          passionate about delivering high-quality news content. Our global network of correspondents provides on-the-ground
          reporting from key locations worldwide, ensuring our coverage remains both comprehensive and nuanced.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-medium text-center">Joseph Semple</h3>
            <p className="text-center text-muted-foreground">Editor-in-Chief</p>
            <p className="text-center text-muted-foreground mt-2">
              With over 15 years of experience in journalism, Joseph leads our editorial team with a commitment to factual reporting and journalistic integrity.
            </p>
            <div className="flex justify-center mt-3">
              <a href="https://instagram.com/sephsworld" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>@sephsworld</span>
              </a>
            </div>
          </div>

          <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-medium text-center">Nabeel Shehzad</h3>
            <p className="text-center text-muted-foreground">Technology Director</p>
            <p className="text-center text-muted-foreground mt-2">
              Nabeel oversees all technical aspects of Comet News, ensuring our platform delivers a seamless experience across all devices while implementing cutting-edge technologies.
            </p>
            <div className="flex justify-center mt-3">
              <a href="https://www.instagram.com/nabeel_shahzad786/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>@nabeel_shahzad786</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><strong>Accuracy:</strong> We verify all information before publishing and promptly correct any errors.</li>
          <li><strong>Independence:</strong> We maintain editorial independence from political and commercial influences.</li>
          <li><strong>Transparency:</strong> We clearly distinguish between news, opinion, analysis, and sponsored content.</li>
          <li><strong>Fairness:</strong> We present multiple perspectives on complex issues to provide a balanced view.</li>
          <li><strong>Transparency:</strong> We clearly distinguish between news, opinion, analysis, and sponsored content.</li>
          <li><strong>Fairness:</strong> We present multiple perspectives on complex issues to provide a balanced view.</li>
          <li><strong>Innovation:</strong> We embrace new technologies to improve how we gather and deliver news.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our History</h2>
        <p className="text-muted-foreground mb-4">
          Comet News was founded in 2025 by a team of journalists who recognized the need for a news platform
          that combines traditional journalistic principles with modern technology. What started as a small
          digital publication has grown into a comprehensive news source trusted by millions of readers worldwide.
        </p>
        <p className="text-muted-foreground mb-4">
          Our name, "Comet," reflects our mission to illuminate important stories that might otherwise go unnoticed,
          bringing light to significant events across the globe with speed and brilliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Awards and Recognition</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>2024 Digital Publishing Excellence Award</li>
          <li>2024 Best News App Design</li>
          <li>2023 Emerging Media Platform of the Year</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;