import React, { useState, useEffect, useRef } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Identidad de Marca', category: 'Diseño Web', description: 'Diseño de la identidad de marca y sitio web' },
  { id: 2, title: 'Camapaña en redes sociales', category: 'Redes Sociales', description: 'Camapañas para fb, instagram' },
  { id: 3, title: 'E-commerce', category: 'Web Design', description: 'Diseño moderno para un ecommerce' },
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

interface CounterProps {
  end: number;
  title: string;
  suffix?: string;
}

function Counter({ end, title, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number | undefined;
          const duration = 2000; // 2 seconds

          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            setCount(Math.floor(progress * end));

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            }
          };

          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-300">{title}</div>
    </div>
  );
}

export default function LandingPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const servicesAnimation = useScrollAnimation();
  const workAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle form submission success
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center text-2xl font-bold text-gray-900">
              <div className="w-8 h-8 bg-gray-900 rounded-full mr-2"></div>
              Studio
            </div>
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

      {/* Stats Banner */}
      <div 
        ref={statsAnimation.ref}
        style={{
          opacity: statsAnimation.isVisible ? 1 : 0,
          transform: statsAnimation.isVisible ? 'translateY(0)' : 'translateY(3rem)',
          transition: 'all 1s ease-out'
        }}
        className="py-16 bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Counter end={35} title="Clients" />
            <Counter end={100} suffix="k" title="Views" />
            <Counter end={100} suffix="+" title="Websites and Apps" />
          </div>
        </div>
      </div>

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

      {/* Contact Section with Formspree */}
      <div 
        id="contact" 
        ref={contactAnimation.ref}
        style={{
          opacity: contactAnimation.isVisible ? 1 : 0,
          transform: contactAnimation.isVisible ? 'translateY(0)' : 'translateY(3rem)',
          transition: 'all 1s ease-out'
        }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="text-left">
                <h3 className="text-2xl font-light mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white">ferruscarea30@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-300 text-sm">Phone</p>
                      <p className="text-white">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-left">
                <h3 className="text-2xl font-light mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                    aria-label="Behance"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.920 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://soundcloud.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                    aria-label="SoundCloud"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.56 8.87c-.12 0-.24-.02-.36-.04C10.84 8.59 10.37 8.5 9.9 8.5c-1.6 0-3.11.62-4.24 1.76-.31.31-.31.82 0 1.13.15.15.36.23.56.23s.41-.08.56-.23c.83-.83 1.93-1.29 3.12-1.29.28 0 .56.03.83.09.31.07.64-.12.73-.43.17-.57.48-1.09.91-1.5.42-.42.95-.73 1.5-.91.31-.09.5-.41.43-.73-.09-.31-.41-.5-.73-.43-.74.19-1.41.57-1.97 1.12-.56.56-.94 1.23-1.13 1.97-.06.2-.23.35-.44.35zm7.51-3.45c-.12 0-.24-.02-.36-.04-.36-.09-.73-.14-1.11-.14-2.03 0-3.93.79-5.36 2.22-.31.31-.31.82 0 1.13.15.15.36.23.56.23s.41-.08.56-.23c1.15-1.15 2.68-1.79 4.3-1.79.28 0 .56.03.83.09.31.07.64-.12.73-.43.24-.81.69-1.56 1.32-2.19.63-.63 1.38-1.08 2.19-1.32.31-.09.5-.41.43-.73-.09-.31-.41-.5-.73-.43-.98.24-1.89.75-2.65 1.51-.76.76-1.27 1.67-1.51 2.65-.06.2-.23.35-.44.35z"/>
                      <path d="M17.67 15.33c-.18 0-.36-.05-.52-.15-.4-.27-.51-.78-.24-1.18.27-.4.78-.51 1.18-.24.4.27.51.78.24 1.18-.16.24-.42.39-.66.39zm-1.33 1.33c-.18 0-.36-.05-.52-.15-.4-.27-.51-.78-.24-1.18.27-.4.78-.51 1.18-.24.4.27.51.78.24 1.18-.16.24-.42.39-.66.39zm-1.33 1.33c-.18 0-.36-.05-.52-.15-.4-.27-.51-.78-.24-1.18.27-.4.78-.51 1.18-.24.4.27.51.78.24 1.18-.16.24-.42.39-.66.39zm-1.33 1.33c-.18 0-.36-.05-.52-.15-.4-.27-.51-.78-.24-1.18.27-.4.78-.51 1.18-.24.4.27.51.78.24 1.18-.16.24-.42.39-.66.39zm-1.33 1.33c-.18 0-.36-.05-.52-.15-.4-.27-.51-.78-.24-1.18.27-.4.78-.51 1.18-.24.4.27.51.78.24 1.18-.16.24-.42.39-.66.39zm-1.33 1.33c-.18 0-.36-.05-.52-.15-.4-.27-.51-.78-.24-1.18.27-.4.78-.51 1.18-.24.4.27.51.78.24 1.18-.16.24-.42.39-.66.39z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form with Formspree */}
            {/* Contact Form with Formspree */}
<div className="bg-gray-800 rounded-lg p-8">
  <h3 className="text-2xl font-light mb-6 text-left">Send us a message</h3>
  {formSubmitted ? (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h4 className="text-xl font-medium mb-2">Thank You!</h4>
      <p className="text-gray-300">Your message has been sent successfully. We'll get back to you soon!</p>
    </div>
  ) : (
    <form 
      action="https://formspree.io/f/meornwrg" 
      method="POST"
      className="space-y-6"
    >
      <div>
        <label htmlFor="contact-name" className="block text-gray-300 font-medium mb-2 text-left">
          Name
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-gray-300 font-medium mb-2 text-left">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="your.email@example.com"
          required
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-gray-300 font-medium mb-2 text-left">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Tell us about your project..."
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-white text-gray-900 py-3 rounded-full hover:bg-gray-200 transition-colors font-medium"
      >
        Send Message
      </button>
    </form>
  )}
</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-gray-900 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Studio. All rights reserved.
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5533313935"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          className="w-8 h-8 text-white"
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