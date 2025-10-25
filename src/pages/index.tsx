import React, { useState, useEffect, useRef } from 'react';

// --- Types & Data ---
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  services: string[];
  client: string;
  duration: string;
  year: string;
  images: string[];
  coverImage: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Service {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  projects: GalleryItem[];
}

// 3D Cube Component - Half Size with padding
const RotatingCube = ({ color = 'indigo' }) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (cubeRef.current) {
        const scrollY = window.scrollY;
        const rotation = scrollY * 0.2;
        cubeRef.current.style.transform = `rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colorClasses = {
    indigo: 'bg-indigo-600 border-indigo-700',
    blue: 'bg-blue-600 border-blue-700',
    purple: 'bg-purple-600 border-purple-700',
    green: 'bg-green-600 border-green-700',
    pink: 'bg-pink-600 border-pink-700'
  };

  return (
    <div className="relative w-10 h-10 mx-auto mb-6 pt-4 perspective-1000">
      <div 
        ref={cubeRef}
        className="relative w-full h-full preserve-3d transition-transform duration-150 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div 
          className={`absolute w-full h-full rounded-2xl ${colorClasses[color as keyof typeof colorClasses]} border-2 flex items-center justify-center`}
          style={{ transform: 'translateZ(15px)' }}
        >
          <div className="w-2 h-2 bg-white bg-opacity-20 rounded-full"></div>
        </div>
        
        {/* Back face */}
        <div 
          className={`absolute w-full h-full rounded-2xl ${colorClasses[color as keyof typeof colorClasses]} border-2`}
          style={{ transform: 'rotateY(180deg) translateZ(15px)' }}
        ></div>
        
        {/* Right face */}
        <div 
          className={`absolute w-5 h-full rounded-2xl ${colorClasses[color as keyof typeof colorClasses]} border-2`}
          style={{ transform: 'rotateY(90deg) translateZ(15px)' }}
        ></div>
        
        {/* Left face */}
        <div 
          className={`absolute w-5 h-full rounded-2xl ${colorClasses[color as keyof typeof colorClasses]} border-2`}
          style={{ transform: 'rotateY(-90deg) translateZ(15px)' }}
        ></div>
        
        {/* Top face */}
        <div 
          className={`absolute w-full h-5 rounded-2xl ${colorClasses[color as keyof typeof colorClasses]} border-2`}
          style={{ transform: 'rotateX(90deg) translateZ(15px)' }}
        ></div>
        
        {/* Bottom face */}
        <div 
          className={`absolute w-full h-5 rounded-2xl ${colorClasses[color as keyof typeof colorClasses]} border-2`}
          style={{ transform: 'rotateX(-90deg) translateZ(15px)' }}
        ></div>
      </div>
    </div>
  );
};

// Cursor Follower Component - For background layer
const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)',
        filter: 'blur(40px)',
        opacity: isVisible ? 0.3 : 0,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
        mixBlendMode: 'difference',
      }}
    />
  );
};

// Web Design Projects
const webDesignProjects: GalleryItem[] = [
  { 
    id: 1, 
    title: 'Hako - Identidad de Marca', 
    category: 'Creación de Marca, Diseño Web', 
    description: 'Diseño completo de identidad de marca y sitio web corporativo con enfoque moderno y minimalista.', 
    fullDescription: 'Hako es una marca emergente en el sector de equipos médicos que buscaba establecer una identidad sólida en el mercado. Desarrollamos una identidad visual completa que refleja sus valores de sostenibilidad y diseño consciente, junto con un sitio web corporativo que comunica efectivamente su propuesta de valor.',
    challenge: 'La marca necesitaba diferenciarse en un mercado saturado de productos similares, comunicando autenticidad y compromiso ambiental sin caer en clichés del sector ecológico.',
    solution: 'Creamos un sistema de identidad basado en formas orgánicas y una paleta de colores terrosos, combinado con tipografía moderna. El sitio web incorpora micro-interacciones que guían al usuario a través del proceso de descubrimiento de la marca.',
    services: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Web Design', 'Content Creation'],
    client: 'Hako Sustainable Goods',
    duration: '6 semanas',
    year: '2025',
    coverImage: 'assets/projects/project-1/cover.jpg',
    images: [
      'assets/projects/project-1/image1.jpg',
      'assets/projects/project-1/image2.jpg',
      'assets/projects/project-1/image3.jpg',
      'assets/projects/project-1/image4.jpg',
      'assets/projects/project-1/image5.jpg',
      'assets/projects/project-1/image6.jpg',
    ]
  },
  { 
    id: 2, 
    title: 'TechFlow - Portal Corporativo', 
    category: 'Diseño Web, UX/UI', 
    description: 'Portal corporativo moderno con dashboard interactivo y experiencia de usuario optimizada.', 
    fullDescription: 'TechFlow necesitaba un portal corporativo que permitiera a sus empleados acceder a información centralizada. Diseñamos una interfaz intuitiva con navegación clara y componentes reutilizables.',
    challenge: 'Crear una interfaz que fuera accesible para usuarios con diferentes niveles de experiencia técnica.',
    solution: 'Implementamos un diseño limpio con iconografía clara y flujos de navegación intuitivos. Cada sección está optimizada para reducir la curva de aprendizaje.',
    services: ['Web Design', 'UX Research', 'Prototyping', 'Visual Design'],
    client: 'TechFlow Solutions',
    duration: '8 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-2/cover.jpg',
    images: [
      'assets/projects/project-2/image1.jpg',
      'assets/projects/project-2/image2.jpg',
      'assets/projects/project-2/image3.jpg',
      'assets/projects/project-2/image4.jpg',
      'assets/projects/project-2/image5.jpg',
      'assets/projects/project-2/image6.jpg',
    ]
  },
  { 
    id: 3, 
    title: 'Grupo Kalte - E-commerce', 
    category: 'Diseño Web, Creación de Contenido', 
    description: 'Diseño moderno y funcional para tienda online con experiencia de usuario optimizada.', 
    fullDescription: 'Grupo Kalte, distribuidor de equipos de refrigeración industrial, necesitaba modernizar su presencia digital y establecer un canal de ventas online eficiente. Desarrollamos una plataforma e-commerce robusta con catálogo complejo y sistema de cotizaciones integrado.',
    challenge: 'Manejar un catálogo con más de 500 productos técnicos con múltiples variantes y especificaciones, manteniendo una experiencia de compra simple y accesible.',
    solution: 'Implementamos filtros avanzados y comparadores de productos, junto con un sistema de cotizaciones online que permite a los clientes solicitar precios personalizados para equipos industriales.',
    services: ['E-commerce Development', 'UX Design', 'Content Strategy', 'Product Photography', 'SEO Optimization'],
    client: 'Grupo Kalte',
    duration: '10 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-3/cover.jpg',
    images: [
      'assets/projects/project-3/image1.jpg',
      'assets/projects/project-3/image2.jpg',
      'assets/projects/project-3/image3.jpg',
      'assets/projects/project-3/image4.jpg',
      'assets/projects/project-3/image5.jpg',
      'assets/projects/project-3/image6.jpg',
    ]
  },
  { 
    id: 4, 
    title: 'Tomodachi - Portfolio Website', 
    category: 'Diseño Web, Creación de Contenido, Diseño Gráfico', 
    description: 'Portfolio creativo para fotógrafo con galería interactiva y diseño inmersivo.', 
    fullDescription: 'Portfolio digital para Tomodachi, fotógrafo especializado en retratos urbanos y documentales. Desarrollamos una experiencia web inmersiva que funciona como galería virtual y punto de contacto para clientes potenciales.',
    challenge: 'Mostrar una amplia variedad de trabajos fotográficos manteniendo la coherencia visual y permitiendo que cada imagen tenga el impacto adecuado, sin sobrecargar al usuario.',
    solution: 'Diseñamos una interfaz minimalista con navegación intuitiva y sistema de filtros por categorías. Implementamos lazy loading para optimizar el rendimiento y un sistema de lightbox que permite apreciar los detalles de cada fotografía.',
    services: ['Portfolio Design', 'Visual Identity', 'Web Development', 'Photo Curation', 'Copywriting'],
    client: 'Tomodachi Photography',
    duration: '4 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-4/cover.jpg',
    images: [
      'assets/projects/project-4/image1.jpg',
      'assets/projects/project-4/image2.jpg',
      'assets/projects/project-4/image3.jpg',
      'assets/projects/project-4/image4.jpg',
      'assets/projects/project-4/image5.jpg',
      'assets/projects/project-4/image6.jpg',
    ]
  },
];

// Web Apps Projects
const webAppsProjects: GalleryItem[] = [
  { 
    id: 5, 
    title: 'AI27 - Product Launch', 
    category: 'Web App, Native App, Diseño Web, Diseño UX', 
    description: 'Diseño de experiencia de usuario, aplicaciones web, nativas y sitio web. Implementación de AI para predicción de riesgos en logística.', 
    fullDescription: 'AI27 es una plataforma de inteligencia artificial especializada en la predicción de riesgos logísticos para empresas de transporte y cadena de suministro. Desarrollamos un ecosistema digital completo que incluye dashboard web, aplicación móvil y sitio corporativo.',
    challenge: 'Crear interfaces intuitivas para visualizar datos complejos de predicción de riesgos, haciendo accesible la inteligencia artificial a usuarios no técnicos en el sector logístico.',
    solution: 'Diseñamos un sistema de visualización de datos con gráficos interactivos y alertas contextuales. Implementamos un diseño responsivo que funciona igualmente bien en desktop y dispositivos móviles para profesionales en movimiento.',
    services: ['UI/UX Design', 'Web Application', 'Native App', 'AI Integration', 'Dashboard Design'],
    client: 'AI27 Technologies',
    duration: '12 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-5/cover.jpg',
    images: [
      'assets/projects/project-5/image1.jpg',
      'assets/projects/project-5/image2.jpg',
      'assets/projects/project-5/image3.jpg',
      'assets/projects/project-5/image4.jpg',
      'assets/projects/project-5/image5.jpg',
      'assets/projects/project-5/image6.jpg',
    ]
  },
  { 
    id: 6, 
    title: 'CloudSync - Gestor de Archivos', 
    category: 'Web App, Cloud Storage', 
    description: 'Aplicación web para gestión y sincronización de archivos en la nube con interfaz intuitiva.', 
    fullDescription: 'CloudSync es una plataforma de almacenamiento en la nube diseñada para equipos de trabajo remoto. Desarrollamos una aplicación web completa con sincronización en tiempo real, control de versiones y colaboración integrada.',
    challenge: 'Manejar sincronización de archivos en tiempo real sin afectar el rendimiento de la aplicación, manteniendo una interfaz responsiva y fluida.',
    solution: 'Implementamos WebSockets para sincronización en tiempo real, optimización de caché y lazy loading de archivos. La interfaz utiliza drag-and-drop intuitivo y vista previa de archivos.',
    services: ['Web Application', 'Real-time Sync', 'Cloud Architecture', 'UI/UX Design', 'Security'],
    client: 'CloudSync Inc',
    duration: '14 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-6/cover.jpg',
    images: [
      'assets/projects/project-6/image1.jpg',
      'assets/projects/project-6/image2.jpg',
      'assets/projects/project-6/image3.jpg',
      'assets/projects/project-6/image4.jpg',
      'assets/projects/project-6/image5.jpg',
      'assets/projects/project-6/image6.jpg',
    ]
  },
  { 
    id: 7, 
    title: 'TaskMaster - Gestor de Proyectos', 
    category: 'Web App, Project Management', 
    description: 'Plataforma de gestión de proyectos con tableros Kanban, cronogramas y colaboración en equipo.', 
    fullDescription: 'TaskMaster es una herramienta de gestión de proyectos diseñada para equipos ágiles. Incluye tableros Kanban personalizables, diagramas de Gantt, seguimiento de tiempo y reportes detallados.',
    challenge: 'Crear una interfaz que maneje múltiples vistas de datos complejos sin sacrificar la usabilidad o el rendimiento.',
    solution: 'Implementamos virtualización de listas para manejar grandes volúmenes de tareas, vistas múltiples sincronizadas y actualizaciones en tiempo real con WebSockets.',
    services: ['Web Application', 'Real-time Updates', 'Data Visualization', 'Collaboration Tools'],
    client: 'TaskMaster Solutions',
    duration: '16 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-7/cover.jpg',
    images: [
      'assets/projects/project-7/image1.jpg',
      'assets/projects/project-7/image2.jpg',
      'assets/projects/project-7/image3.jpg',
      'assets/projects/project-7/image4.jpg',
      'assets/projects/project-7/image5.jpg',
      'assets/projects/project-7/image6.jpg',
    ]
  },
  { 
    id: 8, 
    title: 'DataViz - Plataforma de Análisis', 
    category: 'Web App, Data Analytics', 
    description: 'Plataforma de análisis de datos con visualizaciones interactivas y reportes personalizables.', 
    fullDescription: 'DataViz es una plataforma de business intelligence que permite a las empresas visualizar y analizar sus datos en tiempo real. Incluye dashboards personalizables, gráficos interactivos y exportación de reportes.',
    challenge: 'Procesar y visualizar grandes volúmenes de datos sin afectar el rendimiento de la aplicación.',
    solution: 'Implementamos agregación de datos en el servidor, caching inteligente y gráficos optimizados con WebGL para renderización de millones de puntos de datos.',
    services: ['Web Application', 'Data Visualization', 'Real-time Analytics', 'Custom Dashboards'],
    client: 'DataViz Analytics',
    duration: '18 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-8/cover.jpg',
    images: [
      'assets/projects/project-8/image1.jpg',
      'assets/projects/project-8/image2.jpg',
      'assets/projects/project-8/image3.jpg',
      'assets/projects/project-8/image4.jpg',
      'assets/projects/project-8/image5.jpg',
      'assets/projects/project-8/image6.jpg',
    ]
  },
];

// Marketing Digital Projects
const marketingProjects: GalleryItem[] = [
  { 
    id: 9, 
    title: 'Le Pain Quotidien - Campaña Digital', 
    category: 'Redes Sociales, Creación de Contenido', 
    description: 'Serie de contenido semanal para marca de fitness con alto impacto visual.', 
    fullDescription: 'Campaña integral de redes sociales para Le Pain Quotidien, enfocada en posicionar su nueva línea de productos saludables y promover sus espacios como lugares de trabajo remoto. Desarrollamos contenido estratégico para Instagram, Facebook y TikTok.',
    challenge: 'Atraer a una audiencia más joven sin alienar a su base de clientes tradicional, mostrando la evolución de la marca manteniendo su esencia artesanal.',
    solution: 'Creamos series de contenido específicas para cada plataforma: tutorials en Instagram Reels, behind-the-scenes en Stories, y contenido inspiracional en Facebook. Implementamos una estrategia de UGC (User Generated Content) que incrementó el engagement en un 240%.',
    services: ['Social Media Strategy', 'Content Creation', 'Community Management', 'Video Production', 'Performance Analytics'],
    client: 'Le Pain Quotidien',
    duration: '16 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-9/cover.jpg',
    images: [
      'assets/projects/project-9/image1.jpg',
      'assets/projects/project-9/image2.jpg',
      'assets/projects/project-9/image3.jpg',
      'assets/projects/project-9/image4.jpg',
      'assets/projects/project-9/image5.jpg',
      'assets/projects/project-9/image6.jpg',
    ]
  },
  { 
    id: 10, 
    title: 'FitLife - Campaña de Lanzamiento', 
    category: 'Marketing Digital, Redes Sociales', 
    description: 'Campaña multicanal para lanzamiento de aplicación de fitness con estrategia de influencers.', 
    fullDescription: 'FitLife es una aplicación de fitness que necesitaba un lanzamiento impactante. Desarrollamos una campaña integrada con influencers, contenido viral y publicidad segmentada en múltiples plataformas.',
    challenge: 'Generar buzz y descargas en el lanzamiento de una aplicación en un mercado saturado de apps de fitness.',
    solution: 'Creamos contenido viral con desafíos fitness, colaboramos con micro-influencers relevantes y ejecutamos campañas de publicidad programática con targeting preciso. Logramos 50k descargas en el primer mes.',
    services: ['Campaign Strategy', 'Influencer Marketing', 'Content Creation', 'Paid Advertising', 'Analytics'],
    client: 'FitLife App',
    duration: '12 semanas',
    year: '2023',
    coverImage: 'assets/projects/project-10/cover.jpg',
    images: [
      'assets/projects/project-10/image1.jpg',
      'assets/projects/project-10/image2.jpg',
      'assets/projects/project-10/image3.jpg',
      'assets/projects/project-10/image4.jpg',
      'assets/projects/project-10/image5.jpg',
      'assets/projects/project-10/image6.jpg',
    ]
  },
  { 
    id: 11, 
    title: 'EcoStore - Estrategia SEO y SEM', 
    category: 'Marketing Digital, SEO, SEM', 
    description: 'Estrategia integral de posicionamiento en buscadores y publicidad pagada para tienda online.', 
    fullDescription: 'EcoStore es una tienda online de productos ecológicos que necesitaba aumentar su visibilidad en buscadores. Implementamos una estrategia completa de SEO técnico, contenido optimizado y campañas SEM.',
    challenge: 'Competir en un nicho altamente competitivo con presupuesto limitado para publicidad pagada.',
    solution: 'Optimizamos la arquitectura del sitio, creamos contenido de alto valor para posicionamiento orgánico y ejecutamos campañas SEM altamente segmentadas. Logramos aumentar el tráfico orgánico en un 320% en 6 meses.',
    services: ['SEO Strategy', 'SEM Campaigns', 'Content Marketing', 'Technical SEO', 'Conversion Optimization'],
    client: 'EcoStore',
    duration: '24 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  { 
    id: 12, 
    title: 'BrandBoost - Email Marketing', 
    category: 'Marketing Digital, Email Marketing', 
    description: 'Estrategia de email marketing con automatización y personalización avanzada.', 
    fullDescription: 'BrandBoost es una agencia que necesitaba mejorar su retención de clientes a través de email marketing. Diseñamos una estrategia de automatización con segmentación avanzada y contenido personalizado.',
    challenge: 'Aumentar la tasa de apertura y conversión de emails en un mercado saturado de mensajes de marketing.',
    solution: 'Implementamos segmentación basada en comportamiento, A/B testing continuo y automatización de flujos de bienvenida y re-engagement. Logramos aumentar la tasa de conversión en un 180%.',
    services: ['Email Strategy', 'Automation', 'Segmentation', 'A/B Testing', 'Analytics'],
    client: 'BrandBoost Agency',
    duration: '8 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
];

// Social Media Content Projects
const socialMediaProjects: GalleryItem[] = [
  { 
    id: 13, 
    title: 'Urban Vibes - Identidad Visual', 
    category: 'Redes Sociales, Diseño Gráfico', 
    description: 'Creación de identidad visual completa para marca de moda urbana en redes sociales.', 
    fullDescription: 'Urban Vibes es una marca de ropa urbana que necesitaba una identidad visual cohesiva en redes sociales. Creamos un sistema de diseño completo con paleta de colores, tipografía y componentes reutilizables.',
    challenge: 'Crear una identidad visual que fuera moderna, atractiva y consistente en todas las plataformas de redes sociales.',
    solution: 'Desarrollamos un sistema de diseño modular con templates reutilizables para Instagram, TikTok y Pinterest. Incluye guías de color, tipografía y composición que mantienen la coherencia visual.',
    services: ['Visual Identity', 'Graphic Design', 'Social Media Templates', 'Brand Guidelines'],
    client: 'Urban Vibes',
    duration: '6 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  { 
    id: 14, 
    title: 'TechNews - Contenido Educativo', 
    category: 'Redes Sociales, Video Content', 
    description: 'Serie de videos educativos sobre tecnología para LinkedIn y YouTube.', 
    fullDescription: 'TechNews es un canal de educación tecnológica que necesitaba contenido de calidad para LinkedIn y YouTube. Creamos una serie de videos cortos educativos con animaciones y gráficos explicativos.',
    challenge: 'Simplificar conceptos técnicos complejos en videos cortos y atractivos para diferentes plataformas.',
    solution: 'Creamos videos de 60-90 segundos con animaciones explicativas, gráficos dinámicos y subtítulos. Cada video está optimizado para la plataforma específica (vertical para TikTok, horizontal para YouTube).',
    services: ['Video Production', 'Animation', 'Motion Graphics', 'Content Strategy', 'Editing'],
    client: 'TechNews',
    duration: '10 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  { 
    id: 15, 
    title: 'WellnessHub - Community Management', 
    category: 'Redes Sociales, Community Management', 
    description: 'Gestión integral de comunidad en redes sociales para marca de bienestar.', 
    fullDescription: 'WellnessHub es una marca de bienestar que necesitaba gestión profesional de su comunidad en redes sociales. Implementamos estrategia de engagement, respuesta a comentarios y creación de contenido comunitario.',
    challenge: 'Construir una comunidad activa y comprometida en redes sociales desde cero.',
    solution: 'Creamos un calendario de contenido estratégico, respondemos a comentarios en menos de 2 horas, organizamos desafíos comunitarios y creamos contenido generado por usuarios. Logramos crecer de 5k a 50k seguidores en 6 meses.',
    services: ['Community Management', 'Content Calendar', 'Engagement Strategy', 'Crisis Management'],
    client: 'WellnessHub',
    duration: '26 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  { 
    id: 16, 
    title: 'CreativeStudio - Reels y Stories', 
    category: 'Redes Sociales, Video Content', 
    description: 'Producción de Reels y Stories para agencia creativa con contenido viral.', 
    fullDescription: 'CreativeStudio es una agencia creativa que necesitaba contenido viral para Instagram. Creamos una serie de Reels y Stories que mostraban el proceso creativo detrás de sus proyectos.',
    challenge: 'Crear contenido que fuera tanto educativo como entretenido, mostrando el trabajo de la agencia de forma atractiva.',
    solution: 'Creamos Reels con transiciones dinámicas, time-lapses de proyectos y behind-the-scenes Stories. Cada contenido está optimizado para viralidad con trending sounds y hashtags estratégicos.',
    services: ['Video Production', 'Reels Creation', 'Stories Strategy', 'Trending Content', 'Editing'],
    client: 'CreativeStudio',
    duration: '12 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
];

// 3D Modeling, AR and VR Projects
const threeDProjects: GalleryItem[] = [
  { 
    id: 17, 
    title: 'Binec - Diseño Web 3D, RV y RA', 
    category: 'Modelado 3D, Realidad Virtual y Aumentada', 
    description: 'Experiencias inmersivas con elementos 3D interactivos y prototipos de realidad aumentada.', 
    fullDescription: 'Desarrollo de experiencias inmersivas para Binec Studio, incorporando elementos 3D interactivos y prototipos de realidad aumentada para mostrar el potencial de estas tecnologías en proyectos comerciales.',
    challenge: 'Demostrar las capacidades técnicas del estudio en entornos 3D y realidad extendida a través de medios tradicionales (web), creando experiencias accesibles que no requieren hardware especializado.',
    solution: 'Implementamos WebGL para visualizar modelos 3D directamente en el navegador, junto con experiencias de AR que utilizan la cámara del dispositivo móvil. Creamos casos de estudio interactivos que muestran el proceso creativo detrás de cada proyecto.',
    services: ['3D Modeling', 'WebGL Development', 'AR Experiences', 'Interactive Design', 'Technical Consulting'],
    client: 'Binec Studio',
    duration: '8 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  { 
    id: 18, 
    title: 'AutoVR - Configurador 3D de Vehículos', 
    category: 'Modelado 3D, Realidad Virtual', 
    description: 'Experiencia inmersiva en VR para configurar y visualizar vehículos en tiempo real.', 
    fullDescription: 'AutoVR es una plataforma de realidad virtual que permite a los clientes configurar y visualizar vehículos en un entorno 3D inmersivo. Desarrollamos modelos 3D detallados de múltiples vehículos con opciones de personalización.',
    challenge: 'Crear modelos 3D de alta calidad que funcionen en tiempo real en dispositivos VR sin sacrificar la calidad visual.',
    solution: 'Optimizamos los modelos 3D con técnicas de LOD (Level of Detail), implementamos shaders personalizados y utilizamos texturas PBR para realismo. La experiencia funciona en Oculus Quest, HTC Vive y PlayStation VR.',
    services: ['3D Modeling', 'VR Development', 'Optimization', 'Interactive Design', 'Physics Engine'],
    client: 'AutoVR Inc',
    duration: '16 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  { 
    id: 19, 
    title: 'FurnitureAR - Visualizador de Muebles', 
    category: 'Modelado 3D, Realidad Aumentada', 
    description: 'Aplicación AR que permite visualizar muebles en el espacio real antes de comprar.', 
    fullDescription: 'FurnitureAR es una aplicación de realidad aumentada que permite a los clientes visualizar muebles en sus hogares antes de comprar. Desarrollamos modelos 3D de más de 500 productos con física realista.',
    challenge: 'Crear una experiencia AR fluida que funcione en dispositivos móviles con diferentes capacidades de hardware.',
    solution: 'Implementamos detección de planos AR, física de colisiones simplificada y optimización de modelos. La aplicación funciona en iOS y Android con ARKit y ARCore respectivamente.',
    services: ['3D Modeling', 'AR Development', 'Mobile Optimization', 'Physics Simulation', 'UI/UX Design'],
    client: 'FurnitureAR',
    duration: '14 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  { 
    id: 20, 
    title: 'MedicalVR - Simulador Quirúrgico', 
    category: 'Modelado 3D, Realidad Virtual', 
    description: 'Simulador quirúrgico en VR para entrenamiento médico con física realista.', 
    fullDescription: 'MedicalVR es una plataforma de entrenamiento médico que utiliza realidad virtual para simular procedimientos quirúrgicos. Desarrollamos modelos anatómicos precisos con física realista y retroalimentación háptica.',
    challenge: 'Crear simulaciones médicamente precisas que sean educativas y seguras para el entrenamiento de cirujanos.',
    solution: 'Trabajamos con expertos médicos para asegurar precisión anatómica, implementamos física de tejidos blandos y duros, y creamos sistemas de puntuación basados en métricas quirúrgicas reales.',
    services: ['3D Modeling', 'VR Development', 'Physics Simulation', 'Medical Accuracy', 'Haptic Feedback'],
    client: 'MedicalVR',
    duration: '20 semanas',
    year: '2023',
    coverImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
];

const services: Service[] = [
  {
    id: 'web-design',
    name: 'Diseño Web',
    title: 'Diseño Web',
    description: 'Sitios web personalizados que combinan un diseño creativo y funcionalidad.',
    icon: 'web',
    color: 'blue',
    projects: webDesignProjects
  },
  {
    id: 'web-apps',
    name: 'Aplicaciones Web',
    title: 'Aplicaciones Web',
    description: 'Desarrollo de aplicaciones web robustas y escalables.',
    icon: 'code',
    color: 'purple',
    projects: webAppsProjects
  },
  {
    id: 'marketing',
    name: 'Marketing Digital',
    title: 'Marketing Digital',
    description: 'Campañas digitales personalizadas para captación de clientes.',
    icon: 'chart',
    color: 'green',
    projects: marketingProjects
  },
  {
    id: 'social-media',
    name: 'Contenido para Redes',
    title: 'Contenido para Redes',
    description: 'Creación de contenido visual atractivo y estratégico.',
    icon: 'heart',
    color: 'pink',
    projects: socialMediaProjects
  },
  {
    id: '3d-ar-vr',
    name: 'Modelado 3D, AR y VR',
    title: 'Modelado 3D, AR y VR',
    description: 'Experiencias inmersivas con tecnologías de realidad aumentada y virtual.',
    icon: 'cube',
    color: 'indigo',
    projects: threeDProjects
  },
];

const allProjects = [...webDesignProjects, ...webAppsProjects, ...marketingProjects, ...socialMediaProjects, ...threeDProjects];

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

// --- Project Detail Component ---
interface ProjectDetailProps {
  project: GalleryItem;
  onBack: () => void;
  onNavigateToContact: () => void;
}

function ProjectDetail({ project, onBack, onNavigateToContact }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Project Hero */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a trabajos
          </button>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium">{project.category}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>
        </div>
      </section>

      {/* Full Width Image banner */}
      <div className="w-full aspect-video bg-gray-100 overflow-hidden relative">
        <img 
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Proyecto</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                {project.fullDescription}
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">El Desafío</h3>
              <p className="text-gray-600 leading-relaxed">
                {project.challenge}
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">La Solución</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {project.solution}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={project.images[0]} 
                    alt={`${project.title} - Solution 1`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={project.images[1] || project.images[0]} 
                    alt={`${project.title} - Solution 2`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Image Gallery */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Galería del Proyecto</h3>
              <div className="relative">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={project.images[currentImageIndex]} 
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Slider Controls */}
                {project.images.length > 1 && (
                  <>
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
                      {project.images.map((_, index) => (
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
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Details */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-600">
                {project.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Cliente</h3>
              <p className="text-gray-600">{project.client}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Duración</h3>
              <p className="text-gray-600">{project.duration}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Año</h3>
              <p className="text-gray-600">{project.year}</p>
            </div>
          </div>
        </div>

        {/* Additional Gallery */}
        <section className="mt-24">
          <h2 className="text-3xl font-light text-center mb-12">Detalles Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src={image} 
                  alt={`${project.title} - Additional view ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Next Project CTA */}
        <div className="mt-32 text-center border-t border-gray-100 pt-20">
          <h3 className="text-2xl font-light text-gray-600 mb-6">¿Te gustó este proyecto?</h3>
          <button 
            onClick={onNavigateToContact}
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg transform text-lg"
          >
            Hablemos sobre tu proyecto
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Service Projects View ---
interface ServiceProjectsViewProps {
  service: Service;
  onBack: () => void;
  onProjectClick: (project: GalleryItem) => void;
}

function ServiceProjectsView({ service, onBack, onProjectClick }: ServiceProjectsViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a servicios
          </button>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-16">Proyectos de {service.name}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {service.projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectClick(project)}
                className="cursor-pointer group"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onProjectClick(project); }}
                aria-label={`View details of ${project.title}`}
              >
                <div className="bg-gray-200 rounded-xl aspect-square mb-4 overflow-hidden group-hover:scale-105 transition-all">
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">{project.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
type ViewState = 'landing' | 'project' | 'service-projects';

export default function MainContainer() {
  // Routing & Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [currentProject, setCurrentProject] = useState<GalleryItem | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  // Landing Page State
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Animations
  const servicesAnimation = useScrollAnimation();
  const workAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();

  // --- Effects ---
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedItem(null);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedItem) setCurrentImageIndex(0);
  }, [selectedItem]);

  useEffect(() => {
    if (currentView === 'landing' && pendingScroll) {
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
    setCurrentProject(item);
    setCurrentView('project');
    setSelectedItem(null);
    window.scrollTo(0, 0);
  };

  const handleBackToProjects = () => {
    setCurrentView('landing');
    setTimeout(() => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleServiceClick = (service: Service) => {
    setCurrentService(service);
    setCurrentView('service-projects');
    window.scrollTo(0, 0);
  };

  const handleBackToServices = () => {
    setCurrentView('landing');
    setTimeout(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navigateTo = (sectionId?: string) => {
    if (currentView === 'project') {
      setCurrentView('landing');
      if (sectionId) {
        setPendingScroll(sectionId);
      } else {
        window.scrollTo(0, 0);
      }
    } else if (currentView === 'service-projects') {
      setCurrentView('landing');
      if (sectionId) {
        setPendingScroll(sectionId);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('contact-', '')]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/meornwrg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `New contact form submission from ${formData.name}`
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Shared Components ---
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center md:justify-between items-center h-16">
          <button
            onClick={() => navigateTo()}
            className="flex items-center text-2xl font-bold text-gray-900 focus:outline-none"
          >
            <div className="w-100 h-10 mr-3 flex items-center justify-center overflow-hidden">
              <img src="assets/binec-logo.png" alt="Binec Studio Logo" />
            </div>
            <span className="hidden md:inline">Binec Studio</span>
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
      <div className="w-100 h-10 mr-3 mb-30 flex items-center justify-center overflow-hidden">
        <img src="assets/binec-logo.png" alt="Binec Studio Logo" />
      </div>
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
  if (currentView === 'project' && currentProject) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <ProjectDetail 
          project={currentProject} 
          onBack={handleBackToProjects}
          onNavigateToContact={() => navigateTo('contact')}
        />
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  if (currentView === 'service-projects' && currentService) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <ServiceProjectsView 
          service={currentService}
          onBack={handleBackToServices}
          onProjectClick={handleViewFullProject}
        />
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Default Landing View
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CursorFollower /> {/* Add the cursor follower here */}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6">
              Diseño y Aplicaciones Web
              <span className="block text-gray-500">Redes Sociales</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 ">
              Creamos experiencias digitales y contenido para redes sociales. Campañas digitales para captación de clientes potenciales.
            </p>
            <button 
              onClick={() => navigateTo('contact')}
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg transform">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <Counter end={35} title="Clientes" />
            <Counter end={175} suffix="k" title="Proyectos" />
            <div className="col-span-2 md:col-span-1">
              <Counter end={100} suffix="+" title="Productos digitales" />
            </div>
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
          
          {/* Flexbox container that centers everything */}
          <div className="flex flex-wrap justify-center gap-12">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="text-center group cursor-pointer flex flex-col h-full w-full sm:w-80"
              >
                {/* Service Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                  service.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-200' :
                  service.color === 'purple' ? 'bg-purple-100 group-hover:bg-purple-200' :
                  service.color === 'green' ? 'bg-green-100 group-hover:bg-green-200' :
                  service.color === 'pink' ? 'bg-pink-100 group-hover:bg-pink-200' :
                  'bg-indigo-100 group-hover:bg-indigo-200'
                }`}>
                  {/* Web Design Icon */}
                  {service.color === 'blue' && (
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {/* Web Apps Icon */}
                  {service.color === 'purple' && (
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )}
                  {/* Marketing Digital Icon */}
                  {service.color === 'green' && (
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    </svg>
                  )}
                  {/* Social Media Icon */}
                  {service.color === 'pink' && (
                    <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  {/* 3D Modeling Icon - Replaced with rotating cube */}
                  {service.color === 'indigo' && (
                    <RotatingCube color="indigo" />
                  )}
                </div>
                
                <h3 className={`text-2xl font-medium text-gray-900 mb-4 group-hover:transition-colors ${
                  service.color === 'blue' ? 'group-hover:text-blue-600' :
                  service.color === 'purple' ? 'group-hover:text-purple-600' :
                  service.color === 'green' ? 'group-hover:text-green-600' :
                  service.color === 'pink' ? 'group-hover:text-pink-600' :
                  'group-hover:text-indigo-600'
                }`}>
                  {service.name}
                </h3>
                <p className="text-gray-600 flex-grow">
                  {service.description}
                </p>
                
                <p className={`mt-6 inline-flex items-center justify-center font-medium transition-colors ${
                  service.color === 'blue' ? 'text-blue-600 group-hover:text-blue-700' :
                  service.color === 'purple' ? 'text-purple-600 group-hover:text-purple-700' :
                  service.color === 'green' ? 'text-green-600 group-hover:text-green-700' :
                  service.color === 'pink' ? 'text-pink-600 group-hover:text-pink-700' :
                  'text-indigo-600 group-hover:text-indigo-700'
                }`}>
                  Ver más
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </p>
              </div>
            ))}
          </div>
          
          {/* CTA below services grid */}
          <div className="mt-16 text-center">
            <button
              onClick={() => navigateTo('contact')}
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg transform"
            >
              Cotizar mi proyecto
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section Work */}
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
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Algunos de nuestros trabajos</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {allProjects.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer group"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedItem(item); }}
                aria-label={`View details of ${item.title}`}
              >
                <div className="bg-gray-200 rounded-xl aspect-square mb-4 overflow-hidden group-hover:scale-105 transition-all">
                  <img 
                    src={item.coverImage} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">{item.category}</p>
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
                  <img 
                    src={selectedItem.images[currentImageIndex]} 
                    alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
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
                
                {/* CTA Button and Ver más Link */}
                <div className="mt-8 space-y-4">
                  <button 
                    onClick={() => {
                      setSelectedItem(null); // Close the popup
                      setTimeout(() => navigateTo('contact'), 300); // Navigate to contact after close animation
                    }}
                    className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg transform flex items-center justify-center space-x-2"
                  >
                    <span>Cotizar mi proyecto</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handleViewFullProject(selectedItem)}
                    className="w-full text-gray-600 hover:text-gray-900 px-6 py-3 rounded-full border border-gray-300 hover:border-gray-400 transition-all hover:scale-105 transform flex items-center justify-center space-x-2"
                  >
                    <span>Ver más</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
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
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header - centered on all screens */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-light">Ponte en contacto</h2>
          </div>
          
          {/* Two columns that stack on mobile */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column - Contact Info */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-light mb-6">Información de contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start sm:items-center space-x-4 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white text-base md:text-lg break-words">ferruscarea30@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start sm:items-center space-x-4 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-gray-300 text-sm">Celular</p>
                      <p className="text-white text-base md:text-lg">55 33 31 39 35</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-light mb-6">Sígueme</h3>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {/* Behance */}
                  <a href="https://www.behance.net/binec" className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all" aria-label="Behance">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 1.425-2.842 1.425-1.83 0-2.403-.829-2.687-1.784-.591-1.993-1.777-2.537-3.547-2.537h-4.65v4.9h-3.502v-14h7.677c3.298 0 4.508 1.748 4.508 4.258 0 1.448-.558 2.741-1.816 3.467 1.807.767 2.204 2.308 1.861 4.271zm-14.476-6h3.203c1.668 0 2.133-.493 2.133-1.864 0-1.268-.482-1.788-1.668-1.788h-3.668v3.652zm0 6h4.202c1.297 0 2.095-.354 2.095-1.858 0-1.297-.675-1.945-2.331-1.945h-3.966v3.803z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/ferrusca_rea" className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 rounded-full flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all" aria-label="Instagram">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.78 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  {/* SoundCloud */}
                  <a href="https://soundcloud.com/user-238668885/01-paraiso" className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-500 hover:scale-110 transition-all" aria-label="SoundCloud">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.56 8.87V17h-1.14v-8.13c0-.19-.15-.34-.34-.34s-.34.15-.34.34v8.13h-1.14V9.4c0-.19-.15-.34-.34-.34s-.34.15-.34.34v7.6h-1.14V11.57c0-.19-.15-.34-.34-.34s-.34.15-.34.34v5.43H5.3V13.46c0-.19-.15-.34-.34-.34s-.34.15-.34.34v3.54h-1.14v-2.36c0-.19-.15-.34-.34-.34s-.34.15-.34.34v2.36h-1.14v-1.4c0-.19-.15-.34-.34-.34s-.34.15-.34.34v1.4H0v.36c0 3.32 2.67 6 5.92 6H12v-9c0 3.84 3.16 7 7 7s7-3.16 7-7-3.16-7-7-7c-2.76 0-5.14 1.67-6.29 4.05-.05 0-.1-.02-.15-.02z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/david-ferrusca-a0800a104/" className="w-10 h-10 md:w-12 md:h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all" aria-label="LinkedIn">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-gray-800 rounded-lg p-6 md:p-8 order-1 lg:order-2">
              <h3 className="text-xl md:text-2xl font-light mb-6">Escribe un mensaje</h3>
              {formSubmitted ? (
                <div className="text-center py-6 md:py-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg md:text-xl font-medium mb-2">¡Gracias!</h4>
                  <p className="text-gray-300 text-sm md:text-base">Tu mensaje se ha enviado correctamente</p>
                </div>
              ) : (
                <form 
                  onSubmit={handleFormSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label htmlFor="contact-name" className="block text-gray-300 font-medium mb-2 text-left">Nombre</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm md:text-base" 
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-gray-300 font-medium mb-2 text-left">Correo</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm md:text-base" 
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-gray-300 font-medium mb-2 text-left">Teléfono</label>
                    <input 
                      type="tel" 
                      id="contact-phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm md:text-base" 
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-gray-300 font-medium mb-2 text-left">Mensaje</label>
                    <textarea 
                      id="contact-message" 
                      rows={4} 
                      required 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 md:px-4 py-2 md:py-3 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm md:text-base" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-full transition-all hover:shadow-lg transform font-medium text-sm md:text-base ${
                      isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-white text-gray-900 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? 'SENDING...' : 'ENVIAR MENSAJE'}
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