
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-24 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Happy Brother AC</h1>
          
          <div className="glass-card p-8 rounded-xl mb-12">
            <p className="text-lg mb-6">
              HappyBrother AC is a premier air conditioning service provider in Dubai, dedicated to delivering exceptional quality and customer satisfaction in every project we undertake.
            </p>
            
            <p className="text-lg mb-6">
              With years of experience in the industry, our team of certified technicians specializes in installation, maintenance, repair, and replacement of all types of air conditioning systems for both residential and commercial properties.
            </p>
            
            <p className="text-lg">
              We pride ourselves on our prompt service, technical expertise, and commitment to using only the highest quality materials and equipment. Our goal is to ensure your complete comfort and satisfaction with every service we provide.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              To provide the highest quality air conditioning services that enhance comfort, improve air quality, and maximize energy efficiency for our clients in Dubai.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-5 space-y-2 text-lg">
              <li>Experienced and certified technicians</li>
              <li>Prompt and reliable service</li>
              <li>Competitive and transparent pricing</li>
              <li>High-quality parts and equipment</li>
              <li>Comprehensive warranty on all services</li>
              <li>24/7 emergency service availability</li>
            </ul>
          </div>
        </div>
      </div>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default About;
