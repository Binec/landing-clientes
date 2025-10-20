import React, { useState, useEffect, useRef } from 'react';

// --- Types & Data ---
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  images: number[];
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Identidad de Marca', category: 'Diseño Web', description: 'Diseño completo de identidad de marca y sitio web corporativo con enfoque moderno y minimalista.', images: [1, 2, 3] },
  { id: 2, title: 'Campaña en redes sociales', category: 'Redes Sociales', description: 'Campañas integrales para Facebook e Instagram con contenido visual atractivo y estrategias de engagement.', images: [1, 2, 3] },
  { id: 3, title: 'E-commerce', category: 'Web Design', description: 'Diseño moderno y funcional para tienda online con experiencia de usuario optimizada.', images: [1, 2, 3] },
  { id: 4, title: 'Content Series', category: 'Social Media', description: 'Serie de contenido semanal para marca de fitness con alto impacto visual.', images: [1, 2, 3] },
  { id: 5, title: 'Portfolio Website', category: 'Web Design', description: 'Portfolio creativo para fotógrafo con galería interactiva y diseño inmersivo.', images: [1, 2, 3] },
  { id: 6, title: 'Product Launch', category: 'Social Media', description: 'Campaña de lanzamiento en redes sociales con estrategia multicanal.', images: [1, 2, 3] },
];

// --- Hooks ---
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

// --- Sub-components ---
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
          const duration = 2000;

          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animateCount);
          };
          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
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

// --- Main Component ---
type ViewState = 'landing' | 'project';

export default function MainContainer() {
  // Routing & Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [fullProject, setFullProject] = useState<GalleryItem | null>(null);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  // Landing Page State
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Animations
  const servicesAnimation = useScrollAnimation();
  const workAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();

  // --- Effects ---
  // Handle keyboard (Escape to close modal)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedItem(null);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset image index when opening new modal item
  useEffect(() => {
    if (selectedItem) setCurrentImageIndex(0);
  }, [selectedItem]);

  // Handle pending scrolls after view change
  useEffect(() => {
    if (currentView === 'landing' && pendingScroll) {
      // Small timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setPendingScroll(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentView, pendingScroll]);

  // --- Handlers ---
  const handleViewFullProject = (item: GalleryItem) => {
    setFullProject(item);
    setCurrentView('project');
    setSelectedItem(null);
    window.scrollTo(0, 0);
  };

  const navigateTo = (sectionId?: string) => {
    if (currentView === 'project') {
      // If we are on project view, switch to landing and set pending scroll
      setCurrentView('landing');
      if (sectionId) {
        setPendingScroll(sectionId);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      // If already on landing, just scroll
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
    }
  };

  // --- Shared Components ---
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => navigateTo()}
            className="flex items-center text-2xl font-bold text-gray-900 focus:outline-none group"
          >
            <div className="w-10 h-10 bg-gray-200 border-2 border-dashed rounded-lg mr-3 group-hover:border-gray-400 transition-all group-hover:scale-110" />
            Binec Studio
          </button>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => navigateTo('services')} className="text-gray-600 hover:text-gray-900 transition-all hover:scale-105 transform">Servicios</button>
            <button onClick={() => navigateTo('work')} className="text-gray-600 hover:text-gray-900 transition-all hover:scale-105 transform">Trabajos</button>
            <button onClick={() => navigateTo('contact')} className="text-gray-600 hover:text-gray-900 transition-all hover:scale-105 transform">Contacto</button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="py-8 text-center text-gray-500 text-sm bg-gray-900 border-t border-gray-800">
      &copy; {new Date().getFullYear()} Binec Studio. Todos los derechos son reservados.
    </footer>
  );

  const WhatsAppButton = () => (
    <a
      href="https://wa.me/5533313935"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 hover:rotate-12 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );

  // --- Views ---
  if (currentView === 'project' && fullProject) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <main className="pt-16">
          {/* Project Hero */}
          <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <button 
                onClick={() => navigateTo('work')}
                className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver a trabajos
              </button>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                {fullProject.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium">{fullProject.category}</span>
                <span>•</span>
                <span>2023</span>
              </div>
            </div>
          </section>

          {/* Full Width Image banner */}
          <div className="w-full aspect-[21/9] bg-gray-100 overflow-hidden">
             <div className="w-full h-full bg-gray-200 border-y-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-2xl font-light">Project Cover Image</span>
             </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Proyecto</h2>
                  <p className="text-xl text-gray-600 leading-relaxed font-light">
                    {fullProject.description}
                  </p>
                  <p className="mt-6 text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">El Desafío</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">La Solución</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="aspect-video bg-gray-200 border-2 border-dashed rounded-lg" />
                     <div className="aspect-video bg-gray-200 border-2 border-dashed rounded-lg" />
                  </div>
                </section>
              </div>

              {/* Sidebar Details */}
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Servicios</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>UI/UX Design</li>
                    <li>Frontend Development</li>
                    <li>Backend Integration</li>
                    <li>Brand Strategy</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Cliente</h3>
                  <p className="text-gray-600">Empresa Confidencial S.A.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Duración</h3>
                  <p className="text-gray-600">8 Semanas</p>
                </div>
              </div>
            </div>

            {/* Additional Gallery */}
            <section className="mt-24">
              <h2 className="text-3xl font-light text-center mb-12">Galería del Proyecto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((img) => (
                  <div key={img} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gray-200 border-2 border-dashed flex items-center justify-center hover:scale-105 transition-transform duration-500">
                      <span className="text-gray-400">Detailed View {img}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Next Project CTA */}
            <div className="mt-32 text-center border-t border-gray-100 pt-20">
              <h3 className="text-2xl font-light text-gray-600 mb-6">¿Listo para comenzar tu proyecto?</h3>
              <button 
                onClick={() => navigateTo('contact')}
                className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg transform text-lg"
              >
                Contáctanos hoy mismo
              </button>
            </div>
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Default Landing View
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6">
              Diseño Web
              <span className="block text-gray-500">Redes sociales</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Creamos experiencias digitales y contenido para redes sociales. También creamos campañas digitales para captación de clientes potenciales.
            </p>
            <button 
              onClick={() => navigateTo('contact')}
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg transform"
            >
              Trabajemos juntos
            </button>
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
            <Counter end={35} title="Clientes" />
            <Counter end={100} suffix="k" title="Views" />
            <Counter end={100} suffix="+" title="Productos digitales" />
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
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center group">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-6 group-hover:border-gray-400 group-hover:scale-110 transition-all" />
              <h3 className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">Diseño Web</h3>
              <p className="text-gray-600">
                Custom websites that blend beautiful design with seamless functionality. From concept to launch, we build digital experiences that convert.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-6 group-hover:border-gray-400 group-hover:scale-110 transition-all" />
              <h3 className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">Aplicaciones Web</h3>
              <p className="text-gray-600">
                Custom websites that blend beautiful design with seamless functionality. From concept to launch, we build digital experiences that convert.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-6 group-hover:border-gray-400 group-hover:scale-110 transition-all" />
              <h3 className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">Marketing Digital</h3>
              <p className="text-gray-600">
                Campañas digitales personalizadas para captación de clientes potenciales. Creamos, programamos, y manejamos las cuentas para crecer con tu audiencia.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-6 group-hover:border-gray-400 group-hover:scale-110 transition-all" />
              <h3 className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">Contenido para Redes Sociales</h3>
              <p className="text-gray-600">
                Custom websites that blend beautiful design with seamless functionality. From concept to launch, we build digital experiences that convert.
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
                <div className="bg-gray-200 border-2 border-dashed rounded-xl aspect-square mb-4 group-hover:border-gray-400 group-hover:scale-105 transition-all" />
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Popup Modal with Gallery Slider */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-full max-h-screen overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start z-10">
              <div>
                <h3 id="modal-title" className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-lg text-gray-500">{selectedItem.category}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-all"
                aria-label="Close popup"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* Left Column - Image Gallery */}
              <div className="relative">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-105">
                    <span className="text-gray-400 text-xl">Image {currentImageIndex + 1}</span>
                  </div>
                </div>
                
                {/* Slider Controls */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all hover:scale-110 shadow-sm"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all hover:scale-110 shadow-sm"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {selectedItem.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${ 
                        index === currentImageIndex ? 'bg-gray-900 w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Right Column - Content */}
              <div className="flex flex-col justify-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Sobre el proyecto</h4>
                <p id="modal-description" className="text-gray-700 leading-relaxed">
                  {selectedItem.description}
                </p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Diseño Creativo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Alto Rendimiento</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Entrega Rápida</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleViewFullProject(selectedItem)}
                  className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg transform flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <span>Ver proyecto completo</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
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
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white">ferruscarea30@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors">
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
                  {/* Social Icons (reused) */}
                  {['Behance', 'Instagram', 'SoundCloud', 'LinkedIn'].map((network) => (
                     <a
                      key={network}
                      href="#"
                      className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 hover:scale-110 transition-all"
                      aria-label={network}
                    >
                      <div className="w-6 h-6 bg-gray-400 rounded-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-light mb-6 text-left">Send us a message</h3>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-medium mb-2">Thank You!</h4>
                  <p className="text-gray-300">Your message has been sent successfully.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); setTimeout(() => setFormSubmitted(false), 5000); }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="contact-name" className="block text-gray-300 font-medium mb-2 text-left">Name</label>
                    <input type="text" id="contact-name" required className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-gray-300 font-medium mb-2 text-left">Email</label>
                    <input type="email" id="contact-email" required className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-gray-300 font-medium mb-2 text-left">Message</label>
                    <textarea id="contact-message" rows={4} required className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-white text-gray-900 py-3 rounded-full hover:bg-gray-200 transition-all hover:scale-105 hover:shadow-lg transform font-medium">
                    ENVIAR MENSAJE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
