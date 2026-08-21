export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyTestimonial {
  name: string;
  role: string;
  quote: string;
}

export interface BulletPoint {
  icon: string;
  point: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  websiteUrl?: string;
  summary: string;
  work?: string;
  tags: string[];
  image: string;
  heroImg?: string;
  logo?: string;
  stats: CaseStudyStat[];
  metrics: string[];
  meta_title?: string;
  meta_description?: string;
  content: string;
  testimonialVideoId?: string;
  testimonial?: CaseStudyTestimonial;
  review?: string;
  glowColor: string;
}

export const rawCaseStudies = [
  {
    slug: "itmsu",
    client: "ITMSU",
    websiteUrl: "https://itmsu.in",
    summary:
      "IoT Traffic Management System using Raspberry Pi, Hailo camera, Python/Flask, and Machine Learning for real-time urban traffic control.",
    work: "Laravel • Python • JavaScript • CSS • ML",
    tags: ["IoT & AI", "Python", "Machine Learning"],
    image: "/images/CaseStudyHero/itms.webp",
    heroImg: "/images/CaseStudyHero/itms.webp",
    logo: "/images/Logo-slider-imgs/itms-logo.webp",
    stats: [
      { value: "90%", label: "accuracy in vehicle detection" },
      { value: "65%", label: "faster data processing speed" },
      { value: "70%", label: "enhanced prediction reliability" },
    ],
    meta_title: "ITMSU Case Study | Warrgyizmorsch",
    meta_description:
      "See how Warrgyizmorsch helped ITMSU streamline digital communication with a modern, scalable website solution.",
    content: `
      <h2>About The Client</h2>
      <p>ITMS (Intelligent Traffic Management System) is an advanced IoT-based platform designed to modernise traffic monitoring and management through real-time data intelligence. The system leverages technologies such as Raspberry Pi, AI-powered cameras, and machine learning to analyse road congestion, detect vehicle types, and manage traffic flow efficiently. The project focuses on enhancing urban mobility by reducing manual intervention, improving signal accuracy, and optimising road-network efficiency.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>Needed to design and develop an <strong>IoT-driven traffic management solution</strong> capable of processing real-time video data from multiple intersections.</li>
        <li>Integration of <strong>Raspberry Pi and Hailow camera modules</strong> to enable automated vehicle detection and crowd analysis.</li>
        <li>Required <strong>machine-learning algorithms</strong> to accurately classify vehicle size, count traffic density, and predict congestion patterns.</li>
        <li>The system had to ensure <strong>low-latency data processing</strong> while maintaining stable communication between hardware and the web dashboard.</li>
        <li>Needed a <strong>user-friendly Flask-based interface</strong> to visualise traffic data and alerts for administrators in real-time.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>Built a complete IoT architecture using <strong>Raspberry Pi</strong> for edge computing and data collection from camera feeds.</li>
        <li>Implemented <strong>Hailow camera detection</strong> for capturing live traffic visuals, integrated with a <strong>Python-Flask backend</strong> for seamless data handling.</li>
        <li>Developed and trained <strong>machine-learning models</strong> to detect vehicle types (car, bus, bike, truck) and measure congestion density.</li>
        <li>Designed an interactive <strong>web dashboard</strong> using Flask, displaying live traffic counts, vehicle classifications, and congestion heatmaps.</li>
        <li>Enabled <strong>automated data communication</strong> between hardware and dashboard through REST APIs for real-time monitoring and decision-making.</li>
        <li>Optimised the system for <strong>scalability</strong>, allowing easy deployment across multiple city intersections with minimal configuration.</li>
      </ul>

      <h2>Key Implementation Steps</h2>
      <ol>
        <li>Integrated SEO best-practices with focus on keywords such as “IoT traffic management system”, “Raspberry Pi traffic monitoring”, and “Flask-based IoT projects”.</li>
        <li>Structured all project documentation and web content with meta descriptions, alt tags, and schema markup to improve search visibility.</li>
        <li>Ensured technical keywords like “vehicle detection system”, “real-time congestion monitoring”, and “AI-based traffic control” were naturally embedded.</li>
      </ol>

      <h2>Results &amp; Outcomes</h2>
      <ul>
        <li>Achieved <strong>90% accuracy</strong> in vehicle detection and congestion analysis through optimised ML model training.</li>
        <li>Improved <strong>data processing speed by 65%</strong>, enabling real-time dashboard updates with minimal latency.</li>
        <li>Enhanced <strong>traffic prediction reliability by 70%</strong>, allowing better signal timing and congestion management.</li>
        <li>The system proved <strong>scalable and cost-efficient</strong>, reducing manual monitoring effort by nearly 60%.</li>
        <li>Established a strong foundation for <strong>smart-city integration</strong>, aligning with future AI-driven mobility initiatives.</li>
      </ul>
    `,
    glowColor: "from-blue-600/35 via-cyan-500/25 to-transparent",
  },
  {
    slug: "aloe-naturals",
    client: "Aloe Naturals",
    websiteUrl: "https://aloe-naturals.com",
    summary:
      "Built a premium WordPress ecommerce website using JavaScript and custom CSS, improving performance, mobile checkout flow, and luxury brand visibility.",
    work: "WordPress • JavaScript • CSS • SEO",
    tags: ["E-Commerce", "WordPress", "Luxury Skincare"],
    image: "/images/CaseStudyHero/aloe_card.webp",
    heroImg: "/images/CaseStudyHero/aloe_card.webp",
    logo: "/images/Logo-slider-imgs/slider-aloe.webp",
    stats: [
      { value: "58%", label: "faster page load speed" },
      { value: "42%", label: "higher checkout completion" },
      { value: "48%", label: "overall conversion rate rise" },
    ],
    testimonialVideoId: "7wATe9LGXB4",
    testimonial: {
      name: "Aloe Naturals",
      role: "Customer testimonial",
      quote:
        "Working with Warrgyizmorsch on the Aloe Naturals website was a great experience from start to finish. The team was responsive, reliable, and delivered everything on time. I am very happy with the final result and would absolutely recommend them to anyone looking for a well-designed, functional website.",
    },
    meta_title: "Aloe Naturals Case Study | Warrgyiz Morsch",
    meta_description:
      "Learn how Warrgyiz Morsch helped Aloe Naturals build a strong digital presence and improve customer engagement online.",
    content: `
      <h2>About The Client</h2>
      <p>Aloe Naturals is a Switzerland-based luxury skincare brand specialising in aloe-vera-based cosmetic and wellness products. The brand combines natural ingredients with scientific innovation to create high-performance skincare solutions. Aloe Naturals partnered with us to elevate their digital presence through a premium website redesign and targeted advertising campaigns that reflect their luxury positioning and drive direct online sales.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>The existing website design was outdated, lacked premium appeal, and failed to capture the brand’s luxurious, nature-driven image.</li>
        <li>Poor mobile optimisation and a complex checkout flow were leading to high cart-abandonment rates.</li>
        <li>Payment gateway reliability issues reduced customer trust and completion rates during checkout.</li>
        <li>Absence of tracking infrastructure (no pixels or conversion tracking) made it difficult to evaluate ad performance.</li>
        <li>Previous advertising efforts lacked clear audience segmentation and conversion-focused strategy, resulting in wasted ad spend.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>We redesigned the website with a clean, modern layout that better reflected Aloe Naturals’ premium and nature-inspired image.</li>
        <li>The new platform was made fully mobile-responsive, ensuring fast, seamless performance across all devices.</li>
        <li>A secure, simplified payment gateway with SSL and fraud protection was integrated to improve checkout trust.</li>
        <li>GA4 and Meta Pixel were set up for detailed tracking of conversions, user behaviour, and ad performance.</li>
        <li>Targeted ad campaigns for skincare and luxury audiences were launched to boost engagement and conversions.</li>
        <li>Regular performance analysis and campaign optimisation helped increase CTR, lower costs, and maximise ROI.</li>
      </ul>

      <h2>Results &amp; Impact</h2>
      <ul>
        <li>Page load speed improved by <strong>58%</strong>, leading to a smoother user experience and lower bounce rates.</li>
        <li>The site achieved a <strong>90% mobile-optimised score</strong>, ensuring perfect usability across all major devices.</li>
        <li>Checkout completion rates increased by <strong>42%</strong> following the redesign and secure payment integration.</li>
        <li>Ad CTR grew by <strong>37%</strong>, driven by refined targeting and high-performing creatives.</li>
        <li>Overall conversion rates rose by <strong>48%</strong> within the first two months of campaign rollout.</li>
        <li>Revenue saw a <strong>35% increase</strong> in the first quarter after the website revamp.</li>
      </ul>
    `,
    glowColor: "from-emerald-500/35 via-teal-400/20 to-transparent",
  },
  {
    slug: "comfort-transfers",
    client: "Comfort Transfers",
    websiteUrl: "https://comforttransfers.ch",
    summary:
      "Created a high-performance Laravel platform with custom CRM automation, automated ride dispatches, secure payments, and performance marketing.",
    work: "Laravel • Tailwind • Bootstrap • SEO • Custom CRM",
    tags: ["Logistics & Travel", "Laravel", "Custom CRM"],
    image: "/images/CaseStudyHero/work_ct.webp",
    heroImg: "/images/CaseStudyHero/work_ct.webp",
    logo: "/images/Logo-slider-imgs/slider-comfort.webp",
    stats: [
      { value: "8X", label: "Return on Ad Spend (ROAS)" },
      { value: "+30%", label: "top-line revenue growth" },
      { value: "+65%", label: "increase in targeted web traffic" },
    ],
    testimonialVideoId: "judGRbDdyeA",
    testimonial: {
      name: "Comfort Transfers",
      role: "Customer testimonial",
      quote:
        "Warrgyizmorsch built exactly the website I needed - professional, user-friendly, and delivered on time. They were responsive, understood my requirements clearly, and made the whole process smooth and hassle-free. I highly recommend them to anyone looking for quality web development at a great value. Great Work Guys.",
    },
    meta_title: "Comfort Transfers Case Study | Warrgyiz Morsch",
    meta_description:
      "Discover how Warrgyizmorsch engineered luxury travel web infrastructure, proprietary CRM, and ROAS growth for Comfort Transfers.",
    content: `
      <h2>About The Client</h2>
      <p>Comfort Transfers is a premier Swiss luxury chauffeur and car hire enterprise operating across more than 12 major cities. Specializing in high-end airport transfers, corporate transit, and long-distance travel, the brand possesses a reputation for flawless reliability and exceptional service. To scale their digital market share, capture high-intent international travelers, and maximize booking volumes, they partnered with us to overhaul their digital infrastructure, execute a premium brand redesign, and deploy an aggressive growth marketing strategy.</p>
      
      <h2>Business Challenges</h2>
      <ul>
        <li><strong>Performance &amp; UX Bottlenecks:</strong> Legacy infrastructure suffered from slow loading speeds and lacked fluid mobile responsiveness, leading to high abandonment rates.</li>
        <li><strong>Depreciated Search Equity:</strong> Absence of technical SEO infrastructure obscured the brand from high-value organic search queries.</li>
        <li><strong>Brand-Identity Disconnect:</strong> The legacy web design failed to reflect the company's elite luxury status, diminishing consumer trust.</li>
        <li><strong>Transaction Friction:</strong> Insecure, multi-step checkout processes triggered drop-offs during the booking funnel.</li>
        <li><strong>Operational Blind Spots:</strong> Lack of centralized CRM made it impossible to efficiently dispatch rides or accurately attribute marketing spend.</li>
      </ul>

      <h2>Strategic Solutions</h2>
      <ul>
        <li><strong>Enterprise-Grade Infrastructure:</strong> Engineered a high-performance web architecture optimized for rapid server response times and cross-device speed.</li>
        <li><strong>Technical SEO Overhaul:</strong> Restructured URL hierarchies, injected high-intent keywords, and optimized metadata.</li>
        <li><strong>Premium UX/UI Redesign:</strong> Developed a bespoke visual interface establishing luxury brand authority and trust.</li>
        <li><strong>Custom Proprietary CRM:</strong> Engineered an automated CRM platform for vehicle logistics featuring native real-time distance and transit calculation engines.</li>
        <li><strong>Precision Performance Marketing:</strong> Built targeted paid acquisition funnels backed by advanced multi-touch conversion tracking.</li>
      </ul>

      <h2>Key Quantifiable Outcomes</h2>
      <ul>
        <li><strong>8X Return on Ad Spend (ROAS):</strong> Delivered an 800% efficiency rating on performance marketing capital.</li>
        <li><strong>+30% Top-Line Revenue Growth:</strong> Driven by elevated brand trust, automated operations, and precision audience targeting.</li>
        <li><strong>+65% Increase in Targeted Web Traffic:</strong> Achieved significant organic and paid reach expansion in 90 days.</li>
        <li><strong>Tier-1 Search Engine Dominance:</strong> Secured first-page Google rankings for competitive luxury travel queries.</li>
      </ul>
    `,
    glowColor: "from-cyan-500/35 via-blue-500/20 to-transparent",
  },



  {
    slug: "yellow-sapphire",
    client: "Yellow Sapphire",
    websiteUrl: "https://yellowsapphirevisa.com",
    summary:
      "Executed social media marketing, local search optimization, and Google Business Profile scaling to drive overseas education leads and walk-in consultations.",
    work: "Instagram • Facebook • Google Business Profile • SMM",
    tags: ["Digital Marketing", "Local SEO", "Lead Generation"],
    image: "/images/CaseStudyHero/case_yellow_sapphire.webp",
    heroImg: "/images/CaseStudyHero/case_yellow_sapphire.webp",
    logo: "/images/Logo-slider-imgs/yellow_spphire.webp",
    stats: [
      { value: "65%", label: "increased GMB engagement" },
      { value: "70%", label: "improved Instagram performance" },
      { value: "55%", label: "rise in local visibility" },
    ],
    testimonialVideoId: "OchEj4Y3ewU",
    testimonial: {
      name: "Yellow Sapphire",
      role: "Customer testimonial",
      quote:
        "Working with Mahipal Sir and his team at Warrgyizmorsch has been a great experience for us at Yellow Sapphire Visa and Education Consultants, Ludhiana. They are prompt, professional, and always deliver quality work on time. We have seen excellent results, and I would absolutely recommend their digital marketing services to anyone looking for a reliable and effective team.",
    },
    meta_title: "Yellow Sapphire Case Study | Warrgyiz Morsch",
    meta_description:
      "Discover how Warrgyiz Morsch helped Yellow Sapphire improve online reach and local walk-in leads through refined digital strategy.",
    content: `
      <h2>About The Client</h2>
      <p>Yellow Sapphire Visa & Education Consultants is a premier consultancy specialising in study-abroad and immigration services. They provide end-to-end support, including visa processing, counselling, IELTS/PTE preparation, and overseas university admission guidance.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>Inconsistent social media branding and low cadence of student success stories.</li>
        <li>Under-optimized Google My Business (GMB) presence failing to capture local high-intent search queries.</li>
        <li>Lack of integrated tracking linking social posts to student consultations and walk-in appointments.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li><strong>Full GMB Optimization:</strong> Updated business categories, verified listings, published weekly success stories, and managed reviews.</li>
        <li><strong>Instagram Content Engine:</strong> Developed branded visual templates, visa tips, student testimonial reels, and university highlights.</li>
        <li><strong>Local Geo-Targeted Campaigns:</strong> Combined social ads with Google Maps direction triggers to boost physical footfall.</li>
      </ul>

      <h2>Results &amp; Impact</h2>
      <ul>
        <li><strong>GMB Engagement Increased by 65%:</strong> Substantial surge in direct phone calls and direction requests.</li>
        <li><strong>Instagram Performance Grew by 70%:</strong> High follower retention and engagement on student visa success reels.</li>
        <li><strong>60% Growth in Customer Trust &amp; Inquiries:</strong> Authentic social proof directly scaled consultation bookings.</li>
      </ul>
    `,
    glowColor: "from-amber-500/35 via-yellow-400/20 to-transparent",
  },
  {
    slug: "wts-visa",
    client: "WTS Visa",
    websiteUrl: "https://wtsvisa.com",
    summary:
      "Comprehensive digital transformation combining web development, custom enterprise CRM, technical SEO, SMM, and performance marketing.",
    work: "Laravel • Tailwind CSS • PHP • Custom CRM",
    tags: ["Custom CRM", "Laravel", "Lead Automation"],
    image: "/images/CaseStudyHero/case_wts.webp",
    heroImg: "/images/CaseStudyHero/case_wts.webp",
    logo: "/images/Logo-slider-imgs/slider-wts.webp",
    stats: [
      { value: "40%", label: "increase in digital enquiry submissions" },
      { value: "45%", label: "increase in high-quality leads" },
      { value: "30%", label: "growth in conversions" },
    ],
    meta_title: "WTS Visa Case Study | Warrgyiz Morsch",
    meta_description:
      "Discover how Warrgyiz Morsch supported WTS Visa with custom CRM development, scalable web architecture, and digital marketing.",
    content: `
      <h2>Project Overview</h2>
      <p>WTS Visa is a premier consultancy with over 12 years of experience specializing in student visa and immigration services. The engagement began by rebuilding their website and was strategically scaled into a comprehensive digital ecosystem—encompassing a dynamic custom CRM, technical SEO, SMM, and hyper-targeted performance marketing.</p>
      
      <h2>The Challenges</h2>
      <ul>
        <li>Fractured user journey and weak mobile usability causing high drop-off rates on inquiry forms.</li>
        <li>Lack of centralized tracking systems making lead management and attribution impossible.</li>
        <li>Untargeted marketing spend with poor return on ad spend.</li>
      </ul>

      <h2>The Solution</h2>
      <ul>
        <li><strong>Premium Web Redesign:</strong> Rebuilt the platform with 100% mobile responsiveness and intuitive navigation.</li>
        <li><strong>Dynamic Custom CRM:</strong> Engineered a centralized CRM allowing management real-time control over routes, lead assignments, and user accountability.</li>
        <li><strong>Full-Funnel Acquisition:</strong> Launched targeted performance marketing campaigns combined with SEO-first content architecture.</li>
      </ul>

      <h2>Business Outcomes</h2>
      <ul>
        <li><strong>40% Increase in Digital Inquiries:</strong> Frictionless forms and modern UI accelerated lead capture.</li>
        <li><strong>45% Increase in High-Quality Leads:</strong> Better audience segmentation eliminated wasted ad budget.</li>
        <li><strong>30% Overall Conversion Growth:</strong> Unifying web, CRM, and marketing created an end-to-end conversion engine.</li>
      </ul>
    `,
    glowColor: "from-purple-600/35 via-pink-600/20 to-transparent",
  },


  {
    slug: "flower-bear",
    client: "Flower Bear",
    websiteUrl: "https://flowerbear.co.uk/",
    summary:
      "Rebuilt the complete UK ecommerce website from scratch in WordPress with a modern responsive design, optimized performance, and SEO structure.",
    work: "WordPress • WooCommerce • JavaScript • CSS",
    tags: ["E-Commerce", "WordPress", "UK Retail"],
    image: "/images/CaseStudyHero/flower_bear_case.webp",
    heroImg: "/images/CaseStudyHero/flower_bear_case.webp",
    logo: "/images/Logo-slider-imgs/slider-flower.webp",
    stats: [
      { value: "70%", label: "improvement in website performance speed" },
      { value: "60%", label: "enhanced user engagement" },
      { value: "55%", label: "increased organic search visibility" },
    ],
    meta_title: "Flower Bear Case Study | Warrgyiz Morsch",
    meta_description:
      "Discover how Warrgyiz Morsch helped Flower Bear create a smooth ecommerce experience for online customers.",
    content: `
      <h2>About The Client</h2>
      <p>Flower Bear is a UK-based floral gift brand specialising in handcrafted teddy bears made from premium artificial flowers for gifting occasions such as anniversaries and romantic celebrations.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>The client required a complete rebuild to replace their outdated, slow legacy site.</li>
        <li>Needed a modern, elegant design to highlight product quality with easy mobile purchasing.</li>
        <li>Required a simplified backend allowing quick inventory and pricing updates.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>Rebuilt the website in WordPress with a lightweight custom theme tailored for luxury gifts.</li>
        <li>Implemented on-page SEO targeting key terms like “floral teddy bear UK” and “handcrafted flower gifts”.</li>
        <li>Optimized checkout flows to reduce cart abandonment during peak holiday periods.</li>
      </ul>

      <h2>Results &amp; Outcomes</h2>
      <ul>
        <li><strong>70% Improvement in Website Speed:</strong> Instant page loading across desktop and mobile.</li>
        <li><strong>60% Enhanced User Engagement:</strong> Better visuals increased time on site.</li>
        <li><strong>55% Increase in Organic Search Visibility:</strong> Strong Google ranking for target gift queries.</li>
      </ul>
    `,
    glowColor: "from-pink-600/35 via-purple-500/20 to-transparent",
  },
  {
    slug: "plate-master",
    client: "Plate Master",
    websiteUrl: "https://www.numberplatemaster.co.uk/plate-builder",
    summary:
      "Created a real-time build-plate customization web app using Next.js with live visual previews, material selections, and dynamic pricing integration.",
    work: "Next.js • React • Tailwind CSS • API Integration",
    tags: ["Web App", "Next.js", "Interactive Builder"],
    image: "/images/CaseStudyHero/numberPlate_case.webp",
    heroImg: "/images/CaseStudyHero/numberPlate_case.webp",
    logo: "/images/Logo-slider-imgs/number_plate.webp",
    stats: [
      { value: "100%", label: "fully functional build-plate tool" },
      { value: "High", label: "improvement in conversion rate" },
      { value: "High", label: "SEO visibility improved" },
    ],
    meta_title: "Plate Master Case Study | Warrgyiz Morsch",
    meta_description:
      "See how Warrgyiz Morsch helped Plate Master improve online visibility and user experience with a tailored Next.js build-plate solution.",
    content: `
      <h2>About The Client</h2>
      <p>Plate Master is a UK-based brand specialising in custom registration number plates and online plate-building tools allowing bespoke vehicle accessory design.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>Needed a dynamic, instant-render plate builder tool for fonts, badges, borders, and materials.</li>
        <li>Required client-side performance without latency during live text and style customization.</li>
        <li>Integration with backend commerce workflow for automated order generation.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>Developed reactive UI components in Next.js for real-time 3D style and material previews.</li>
        <li>Integrated live pricing engines that dynamically update based on plate selections.</li>
        <li>Optimized technical SEO so build-tool pages rank for custom plate searches in the UK.</li>
      </ul>

      <h2>Results &amp; Outcomes</h2>
      <ul>
        <li><strong>100% Fully Functional Builder:</strong> Seamless interactive customization tool.</li>
        <li><strong>Substantial Conversion Increase:</strong> Instant previews eliminated buyer hesitation.</li>
        <li><strong>Scalable Architecture:</strong> Easily supports new materials and plate regulations.</li>
      </ul>
    `,
    glowColor: "from-cyan-500/35 via-blue-500/20 to-transparent",
  },
  {
    slug: "assignment-in-need",
    client: "Assignment In Need",
    websiteUrl: "https://assignmentinneed.com",
    summary:
      "Engineered a custom CRM, modern mobile-first website, and automated lead pipelines for a UK academic platform serving 30,000+ students globally.",
    work: "Laravel • Custom CRM • Flutter • SEO",
    tags: ["Custom CRM", "Laravel", "Academic Platform"],
    image: "/images/CaseStudyHero/assignment_case.webp",
    heroImg: "/images/CaseStudyHero/assignment_case.webp",
    logo: "/images/Logo-slider-imgs/assignment_logo.png",
    stats: [
      { value: "100+", label: "keywords ranking in top 5 positions" },
      { value: "50%", label: "improvement in CRM operational efficiency" },
      { value: "80%+", label: "organic traffic increase in 6 months" },
    ],
    meta_title: "Assignment In Need Case Study | 210% Traffic Growth with SEO & CRM",
    meta_description:
      "Explore how we helped Assignment in Need with CRM development, website design, and SEO to improve performance and conversions.",
    content: `
      <h2>About The Client</h2>
      <p>Assignment In Need is a premier academic writing and support service helping students across undergraduate and doctoral levels globally, connecting learners with verified PhD-level researchers.</p>
      
      <h2>The Challenges</h2>
      <ul>
        <li>No centralized CRM, causing student inquiries to go untracked and creating severe lead leakage.</li>
        <li>Manual spreadsheet operations resulting in dispatch delays and communication bottlenecks.</li>
        <li>Slow legacy website not optimized for mobile devices or search engine indexing.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li><strong>Custom CRM Architecture:</strong> Automated lead capture, order pipeline tracking, WhatsApp chat integration, and payment milestone notifications.</li>
        <li><strong>High-Speed Web Platform:</strong> Modern visual hierarchy with mobile-first service discovery pages.</li>
        <li><strong>Technical &amp; Content SEO:</strong> Ranked 100+ competitive academic keywords in Google Top 5.</li>
      </ul>

      <h2>Results &amp; Outcomes</h2>
      <ul>
        <li><strong>80%+ Increase in Organic Traffic:</strong> Top-tier search dominance in the UK and international markets.</li>
        <li><strong>Lead Response Time Under 15 Minutes:</strong> CRM automation replaced manual 4-hour delays.</li>
        <li><strong>50% Operational Efficiency Gain:</strong> Streamlined order assignments and author workflows.</li>
      </ul>
    `,
    glowColor: "from-blue-600/35 via-cyan-500/25 to-transparent",
  },
  {
    slug: "fantas-beauty",
    client: "Fantas Beauty Store",
    websiteUrl: "https://fantasbeauty.com/",
    summary:
      "Custom Laravel fashion & cosmetics eCommerce development with advanced speed engineering, luxury visual hierarchy, and mobile optimization.",
    work: "Laravel • PHP • Tailwind CSS • Speed Engineering",
    tags: ["Laravel", "Cosmetics", "Speed Optimization"],
    image: "/images/CaseStudyHero/Fantas-Beauty.webp",
    heroImg: "/images/CaseStudyHero/Fantas-Beauty.webp",
    logo: "/images/Logo-slider-imgs/Fantas.png",
    stats: [
      { value: "-49%", label: "reduced page rendering time" },
      { value: "+52%", label: "increased on-site engagement" },
      { value: "-34%", label: "bounce rate reduction" },
    ],
    meta_title: "Fantas Beauty Store Case Study | Laravel Development & SEO",
    meta_description:
      "Discover how Fantas Beauty Store improved UX, SEO, and performance with custom Laravel development.",
    content: `
      <h2>About The Client</h2>
      <p>Fantas Beauty is a luxury digital platform specializing in high-end beauty, tattoo artistry, eyelash extensions, and luxury grooming collections.</p>
      
      <h2>Challenges</h2>
      <ul>
        <li>Disorganized product categorization making product discovery difficult.</li>
        <li>Sluggish page rendering times due to uncompressed media assets.</li>
        <li>Inconsistent branding across mobile devices.</li>
      </ul>

      <h2>Solutions</h2>
      <ul>
        <li>Refined core architecture to support dynamic product catalogs with zero speed degradation.</li>
        <li>Reorganized navigation and filtering for seamless browsing to checkout.</li>
        <li>Engineered speed optimizations including script management, CDN delivery, and WebP compression.</li>
      </ul>

      <h2>Outcomes</h2>
      <ul>
        <li><strong>-49% Page Rendering Time:</strong> Nearly halved loading times for instant browsing.</li>
        <li><strong>+52% On-Site Engagement:</strong> Deeper user exploration of beauty collections.</li>
        <li><strong>-34% Bounce Rate:</strong> Higher customer retention across mobile devices.</li>
      </ul>
    `,
    glowColor: "from-pink-600/35 via-rose-500/20 to-transparent",
  },

  {
    slug: "find-love-and-peace",
    client: "Find Love & Peace",
    websiteUrl: "https://singleparentsfindloveandpeace.com/",
    summary:
      "Built a scalable matchmaking platform from scratch with modern UI/UX, responsive architecture, performance optimization, and SEO-first structure.",
    work: "Next.js • Tailwind CSS • JavaScript • Community Platform",
    tags: ["Next.js", "Matchmaking", "Community Web App"],
    image: "/images/CaseStudyHero/Matrimony.webp",
    heroImg: "/images/CaseStudyHero/Matrimony.webp",
    logo: "/images/Logo-slider-imgs/Metronomi.png",
    stats: [
      { value: "62%", label: "increased overall platform interaction" },
      { value: "59%", label: "improved technical performance" },
      { value: "76%", label: "growth in search visibility" },
    ],
    meta_title: "Find Love & Peace Case Study | UI/UX, SEO & Performance Growth",
    meta_description:
      "See how the Find Love & Peace matchmaking platform improved user experience, SEO visibility, and performance.",
    content: `
      <h2>About The Client</h2>
      <p>Find Love & Peace is a digital matchmaking platform designed specifically for single parents to connect with a supportive community and find meaningful relationships.</p>
      
      <h2>Challenges</h2>
      <ul>
        <li>Required a clean, welcoming layout to organize detailed user profiles and secure communication.</li>
        <li>Needed high-level mobile responsiveness and rapid loading on smartphones.</li>
        <li>Zero initial search engine visibility for niche single-parent matchmaking queries.</li>
      </ul>

      <h2>Solution</h2>
      <ul>
        <li>Engineered a high-performance Next.js web application with modern iconography and friendly design.</li>
        <li>Optimized client-side scripts and secure authentication workflows.</li>
        <li>Built an SEO-first page hierarchy with rich snippet metadata.</li>
      </ul>

      <h2>Outcomes</h2>
      <ul>
        <li><strong>62% Increase in Platform Interaction:</strong> Higher member onboarding and engagement.</li>
        <li><strong>76% Growth in Search Visibility:</strong> Indexed top search positions for single parent community queries.</li>
      </ul>
    `,
    glowColor: "from-pink-600/35 via-rose-500/20 to-transparent",
  },
  {
    slug: "democracy-asia",
    client: "Democracy Asia",
    websiteUrl: "https://democracyasia.com",
    summary:
      "Built and optimized a content-focused digital publishing platform with social media marketing, audience growth, and custom CRM development.",
    work: "Laravel • PHP • MySQL • Publishing CRM",
    tags: ["Digital Media", "Laravel", "Publishing CRM"],
    image: "/images/CaseStudyHero/democracy.webp",
    heroImg: "/images/CaseStudyHero/democracy.webp",
    logo: "/images/Logo-slider-imgs/Democracy Asia.png",
    stats: [
      { value: "10,000+", label: "monthly website visitors" },
      { value: "500-700", label: "subscribers generated per month" },
      { value: "High", label: "social-driven traffic growth" },
    ],
    meta_title: "Democracy Asia Case Study | SEO, Traffic Growth & CRM",
    meta_description:
      "Explore how Warrgyizmorsch helped Democracy Asia achieve 10,000+ monthly traffic and strong subscriber growth.",
    content: `
      <h2>About The Client</h2>
      <p>Democracy Asia is a digital publishing platform delivering insightful journalism and analytical commentary on politics, economy, and society across Asia.</p>
      
      <h2>Challenges Faced</h2>
      <ul>
        <li>Legacy platform struggled to handle concurrent traffic spikes during breaking news events.</li>
        <li>Lack of reader management systems to segment audiences or manage newsletters.</li>
      </ul>

      <h2>Solutions Implemented</h2>
      <ul>
        <li>Redesigned the platform with content-focused UI/UX optimized for Core Web Vitals.</li>
        <li>Built a custom reader CRM featuring subscriber lifecycle tracking and automated newsletter workflows.</li>
        <li>Implemented multi-channel social media distribution for high referral traffic.</li>
      </ul>

      <h2>Outcomes</h2>
      <ul>
        <li><strong>10,000+ Monthly Visitors:</strong> Scaled reader base via organic and referral channels.</li>
        <li><strong>Streamlined Editorial Workflows:</strong> Authors publish daily with instant caching and distribution.</li>
      </ul>
    `,
    glowColor: "from-blue-600/35 via-cyan-500/25 to-transparent",
  },
  {
    slug: "united-tree",
    client: "United Tree",
    websiteUrl: "https://unitedtree.in",
    summary:
      "Implemented social media marketing and Google Business Profile optimization to improve local visibility, engagement, and store enquiries.",
    work: "Instagram • Facebook • Google Business Profile • SMM",
    tags: ["Digital Marketing", "Local SEO", "Fashion Brand"],
    image: "/images/CaseStudyHero/united_tree.webp",
    heroImg: "/images/CaseStudyHero/united_tree.webp",
    logo: "/images/Logo-slider-imgs/united_tree_logo.webp",
    stats: [
      { value: "60%", label: "increased GMB listing interactions" },
      { value: "70%", label: "growth in Instagram engagement" },
      { value: "50%", label: "boost in store-related enquiries" },
    ],
    meta_title: "United Tree Case Study | Warrgyiz Morsch",
    meta_description:
      "See how Warrgyiz Morsch helped United Tree strengthen its digital identity and online engagement.",
    content: `
      <h2>About The Client</h2>
      <p>United Tree Lifestyle is a modern men’s fashion brand focused on trend-aware wardrobe essentials and youthful aesthetics.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>Inconsistent visual identity across social and local search profiles.</li>
        <li>Google My Business listing was under-optimized with low customer interactions.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>Created consistent monthly content calendars featuring lifestyle reels and product showcases.</li>
        <li>Fully optimized Google Maps presence with high-resolution imagery and product posts.</li>
      </ul>

      <h2>Results &amp; Impact</h2>
      <ul>
        <li><strong>60% Rise in GMB Interactions:</strong> Higher store directions and phone inquiries.</li>
        <li><strong>70% Growth in Instagram Engagement:</strong> Authentic fashion reels drove active follower growth.</li>
      </ul>
    `,
    glowColor: "from-emerald-500/35 via-teal-400/20 to-transparent",
  },
  {
    slug: "cod-sphere",
    client: "Cod Sphere",
    websiteUrl: "https://codsphere.com",
    summary:
      "Designed a modern user-centric interface and cohesive visual identity while supporting the brand through strategic social media marketing.",
    work: "UI/UX Design • Figma • SMM • Branding",
    tags: ["UI/UX Design", "Design System", "Branding"],
    image: "/images/CaseStudyHero/cod_sphere.webp",
    heroImg: "/images/CaseStudyHero/cod_sphere.webp",
    logo: "/images/Logo-slider-imgs/code_spare_logo.webp",
    stats: [
      { value: "75%", label: "improvement in UI design efficiency" },
      { value: "70%", label: "rise in social engagement" },
      { value: "65%", label: "increase in brand awareness" },
    ],
    meta_title: "Cod Sphere Case Study | Warrgyiz Morsch",
    meta_description:
      "See how Warrgyiz Morsch enabled Cod Sphere to present its services effectively with a high-performance visual identity.",
    content: `
      <h2>About The Client</h2>
      <p>Cod Sphere is a technology-led solutions provider specialising in bespoke software, web, and app development with an emphasis on user experience.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>Existing interface lacked visual hierarchy and unified design patterns.</li>
        <li>Social media communication lacked technical depth and consistent brand voice.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>Designed a modern UI design system in Figma with reusable components for web and mobile.</li>
        <li>Created branded social templates showcasing architecture and engineering excellence.</li>
      </ul>

      <h2>Results &amp; Impact</h2>
      <ul>
        <li><strong>75% UI Efficiency Improvement:</strong> Faster developer handoffs and clean components.</li>
        <li><strong>65% Increase in Brand Awareness:</strong> Elevated digital positioning among tech clients.</li>
      </ul>
    `,
    glowColor: "from-blue-600/35 via-cyan-500/25 to-transparent",
  },
  {
    slug: "no-shift",
    client: "No Shifts",
    websiteUrl: "https://noshifts.in",
    summary:
      "Created a complete brand identity and social media strategy focused on youth culture, individuality, creativity, and community engagement.",
    work: "Brand Identity • Logo Design • SMM • Creative Strategy",
    tags: ["Branding", "Creative Direction", "SMM"],
    image: "/images/CaseStudyHero/no_shift_bg.webp",
    heroImg: "/images/CaseStudyHero/no_shift_bg.webp",
    logo: "/images/Logo-slider-imgs/no_shift.webp",
    stats: [
      { value: "75%", label: "increase in brand visibility" },
      { value: "65%", label: "improvement in engagement rates" },
      { value: "55%", label: "rise in follower growth" },
    ],
    meta_title: "No Shift Case Study | Warrgyiz Morsch",
    meta_description:
      "Find out how Warrgyiz Morsch supported No Shift with a creative brand identity and digital presence.",
    content: `
      <h2>About The Client</h2>
      <p>No Shift is a contemporary lifestyle and entertainment brand rooted in youth culture, music, fashion, and authentic community expression.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>Required a striking, minimalist logo and complete typography system from scratch.</li>
        <li>Needed an emotional and cultural connection through expressive social media messaging.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>Crafted the complete brand identity kit: logo motion, color palettes, and typography rules.</li>
        <li>Developed engaging storytelling content highlighting events, artists, and culture.</li>
      </ul>

      <h2>Results &amp; Impact</h2>
      <ul>
        <li><strong>75% Increase in Brand Visibility:</strong> Distinct visual recall across social platforms.</li>
        <li><strong>65% Higher Engagement Rates:</strong> Vibrant community interactions and event attendance.</li>
      </ul>
    `,
    glowColor: "from-purple-600/35 via-pink-600/20 to-transparent",
  },
  {
    slug: "nretia-health",
    client: "Nretia Health",
    websiteUrl: "https://nretia.com",
    summary:
      "Created a high-fidelity healthcare UI/UX design in Figma with a complete design system, responsive layouts, and developer-ready handoff assets.",
    work: "UI/UX Design • Figma Prototype • Design System",
    tags: ["Healthcare UI", "Figma Design System", "Product Design"],
    image: "/images/CaseStudyHero/naretia_case.webp",
    heroImg: "/images/CaseStudyHero/naretia_case.webp",
    logo: "/images/Logo-slider-imgs/nratie_logo.webp",
    stats: [
      { value: "100%", label: "client satisfaction" },
      { value: "10x", label: "return on investment" },
      { value: "24/7", label: "reliable support" },
    ],
    meta_title: "Nretia Health Case Study | Warrgyiz Morsch",
    meta_description:
      "Explore how Warrgyiz Morsch supported Nretia Health with a compliant, user-friendly healthcare UI prototype.",
    content: `
      <h2>About The Client</h2>
      <p>NRETIA Health is a healthcare-ecosystem solutions provider focusing on digital transformation and clinical UX design for medical practitioners and patients.</p>
      
      <h2>Our Challenges</h2>
      <ul>
        <li>Required a clinical yet user-friendly interface prototype adhering to healthcare usability standards.</li>
        <li>Needed comprehensive multi-device Figma components ready for agile development handoff.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>Constructed a complete healthcare design system with accessible contrast, typography, and iconography.</li>
        <li>Designed full interactive prototype flows for patient records, scheduling, and provider dashboards.</li>
      </ul>

      <h2>Results &amp; Outcomes</h2>
      <ul>
        <li><strong>70% Reduction in Development Ambiguity:</strong> Clear annotations and interactive component states.</li>
        <li><strong>50% Accelerated Stakeholder Sign-Off:</strong> High-fidelity visuals secured swift executive approval.</li>
      </ul>
    `,
    glowColor: "from-teal-500/35 via-cyan-400/20 to-transparent",
  },
  {
    slug: "london-stay",
    client: "London Stay",
    websiteUrl: "https://londonstay.co.uk",
    summary:
      "Built a student accommodation website and cross-platform mobile application connecting international students with verified UK landlords.",
    work: "Flutter • Mobile App • Next.js • Verification Engine",
    tags: ["Mobile App", "Flutter", "PropTech"],
    image: "/images/CaseStudyHero/Matrimony.webp",
    heroImg: "/images/CaseStudyHero/Matrimony.webp",
    logo: "/images/Logo-slider-imgs/slider-londonstreet.webp",
    stats: [
      { value: "85%", label: "increase in confirmed bookings" },
      { value: "78%", label: "inquiry-to-booking conversion rate" },
      { value: "4-7 Days", label: "search time reduced to" },
    ],
    meta_title: "London Stay Case Study | Student Accommodation Website & App",
    meta_description:
      "Explore how we built a student accommodation platform with website and mobile app, boosting bookings and trust.",
    content: `
      <h2>About The Client</h2>
      <p>London Stay is a dedicated student accommodation platform connecting international students heading to the UK with verified landlords and secure leases.</p>
      
      <h2>Challenges</h2>
      <ul>
        <li>International students suffered from fragmented accommodation searches and fraud risks.</li>
        <li>Absence of a seamless mobile app despite students primarily using mobile phones.</li>
      </ul>

      <h2>Our Solution</h2>
      <ul>
        <li>Engineered a cross-platform mobile app (iOS &amp; Android) in Flutter alongside a fast Next.js web portal.</li>
        <li>Integrated landlord verification engines, interactive map searches, and secure deposit payments.</li>
      </ul>

      <h2>Results &amp; Outcomes</h2>
      <ul>
        <li><strong>85% Increase in Confirmed Bookings:</strong> Rapid student trust and adoption.</li>
        <li><strong>Search Time Reduced from 3-4 Weeks to 4-7 Days:</strong> Instant verified property discovery.</li>
        <li><strong>Zero Fraud Complaints:</strong> Robust verification systems protected all transactions.</li>
      </ul>
    `,
    glowColor: "from-blue-600/35 via-cyan-500/25 to-transparent",
  },

];

/* ---------------- Exported caseStudies list ---------------- */
export const caseStudies: CaseStudy[] = rawCaseStudies.map((cs) => ({
  ...cs,
  metrics: cs.stats.map((s) => `${s.value} ${s.label}`),
}));

/* ---------------- Legacy Slug Alias Resolver ---------------- */
const slugAliases: Record<string, string> = {
  "itms": "itmsu",
  "aloe": "aloe-naturals",
  "comfort": "comfort-transfers",
  "ironstreets": "iron-streets",
  "mewar": "mewar-hi-tech",
  "oltao-fans": "oltao",
  "wts": "wts-visa",
  "virazo": "virazo-furniture",
  "assignment": "assignment-in-need",
  "bharat": "bharat-ceramics",
  "bharat-ceramica": "bharat-ceramics",
  "find-love-peace": "find-love-and-peace",
  "nretia": "nretia-health",
};

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const normalized = slugAliases[slug] || slug;
  return caseStudies.find(
    (cs) => cs.slug === normalized || cs.slug === slug || slugAliases[cs.slug] === normalized
  );
}