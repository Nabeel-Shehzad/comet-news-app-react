import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">About Comet News</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground mb-4">
          At Comet News, our mission is to deliver accurate, unbiased, and timely news coverage from around the globe.
          Founded in 2023, we strive to keep our readers informed with the most relevant stories across politics, business,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="border rounded-lg p-4 shadow-sm">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <h3 className="text-xl font-medium text-center">Sarah Johnson</h3>
            <p className="text-center text-muted-foreground">Editor-in-Chief</p>
          </div>

          <div className="border rounded-lg p-4 shadow-sm">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <h3 className="text-xl font-medium text-center">David Chen</h3>
            <p className="text-center text-muted-foreground">Technology Editor</p>
          </div>

          <div className="border rounded-lg p-4 shadow-sm">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <h3 className="text-xl font-medium text-center">Maria Rodriguez</h3>
            <p className="text-center text-muted-foreground">International Correspondent</p>
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
          <li><strong>Innovation:</strong> We embrace new technologies to improve how we gather and deliver news.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our History</h2>
        <p className="text-muted-foreground mb-4">
          Comet News was founded in 2023 by a team of journalists who recognized the need for a news platform
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