import React, { useState, useEffect, useRef } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Brand Identity', category: 'Web Design', description: 'Complete brand identity design for tech startup' },
  { id: 2, title: 'Social Campaign', category: 'Social Media', description: 'Instagram campaign for fashion brand' },
  { id: 3, title: 'E-commerce Site', category: 'Web Design', description: 'Modern e-commerce platform design' },
  { id: 4, title: 'Content Series', category: 'Social Media', description: 'Weekly content series for fitness brand' },
  { id: 5, title: 'Portfolio Website', category: 'Web Design', description: 'Creative portfolio for photographer' },
  { id: 6, title: 'Product Launch', category: 'Social Media', description: 'Social media launch campaign' },
];

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
}

export default function LandingPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const servicesAnimation = useScrollAnimation();
  const workAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = new FormData();
    form.append('entry.1234567890', formData.name);
    form.append('entry.1234567891', formData.email);
    form.append('entry.1234567892', formData.service);
    form.append('entry.1234567893', formData.message);
    
    try {
      await fetch('https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse', {
        method: 'POST',
        body: form,
        mode: 'no-cors'
      });
      setSubmitMessage('Thank you! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900">Studio</div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
              <a href="#work" className="text-gray-600 hover:text-gray-900 transition-colors">Work</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6">
              Web Design &
              <span className="block text-gray-500">Social Content</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We create stunning digital experiences and engaging social media content that connects brands with their audience.
            </p>
            <a href="#contact" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
              Start Your Project
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div 
        id="services" 
        ref={servicesAnimation.ref}
        style={{
          opacity: servicesAnimation.isVisible ? 1 : 0,
          transform: servicesAnimation.isVisible ? 'translateY(0)' : 'translateY(3rem)',
          transition: 'all 1s ease-out'
        }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Web Design</h3>
              <p className="text-gray-600">
                Custom websites that blend beautiful design with seamless functionality. From concept to launch, we build digital experiences that convert.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Social Media Content</h3>
              <p className="text-gray-600">
                Engaging content that tells your brand story. We create, schedule, and manage social media campaigns that grow your audience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div 
        id="work" 
        ref={workAnimation.ref}
        style={{
          opacity: workAnimation.isVisible ? 1 : 0,
          transform: workAnimation.isVisible ? 'translateY(0)' : 'translateY(3rem)',
          transition: 'all 1s ease-out'
        }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Our Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer group"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedItem(item); }}
                aria-label={`View details of ${item.title}`}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl aspect-square mb-4 group-hover:border-gray-400 transition-colors" />
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal for Gallery Item */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedItem(null)}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl leading-none"
              aria-label="Close popup"
            >
              ×
            </button>
            <h3 id="modal-title" className="text-2xl font-semibold mb-2 text-gray-900">
              {selectedItem.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{selectedItem.category}</p>
            <p id="modal-description" className="text-gray-700">
              {selectedItem.description}
            </p>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div 
        id="contact" 
        ref={contactAnimation.ref}
        style={{
          opacity: contactAnimation.isVisible ? 1 : 0,
          transform: contactAnimation.isVisible ? 'translateY(0)' : 'translateY(3rem)',
          transition: 'all 1s ease-out'
        }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-gray-700 font-medium mb-1">
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="" disabled>Select a service</option>
                <option value="Web Design">Web Design</option>
                <option value="Social Media Content">Social Media Content</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {submitMessage && (
              <p className="text-center text-gray-700 mt-4">{submitMessage}</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Studio. All rights reserved.
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5533313935"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '4rem',
          height: '4rem',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          zIndex: 9999,
          transition: 'all 0.3s ease',
          color: 'white'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#20BA5A';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#25D366';
        }}
        aria-label="Contact us on WhatsApp"
      >
        <svg
          style={{ width: '2rem', height: '2rem' }}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}