import React, { useState, useEffect } from 'react';
import './App.css';
import Threads from './components/Threads';
import ProfileCard from './components/ProfileCard';
import TargetCursor from './components/TargetCursor';
import profilePhoto from './assets/profile.jpg';

const NAV_ITEMS = ['ABOUT', 'WORK', 'SKILLS', 'PROJECTS', 'CERTIFICATES', 'AWARDS', 'CONTACT'];

const EDUCATION = [
  {
    degree: 'Bachelor of Science in Computer Engineering',
    school: 'Polytechnic University of the Philippines',
    period: '10/2022 – 09/2026',
    location: 'Sta. Mesa, Manila, Philippines',
    details: [
      'Major in: System Development',
      'Conducted research study entitled “Rizal Through Play: A 2.5 Dimensional Role Playing Game Approach To The Thematic and Historical Depths of Noli Me Tangere”, a gamified educational tool to improve student engagement in studying classic Philippine literature',
      'Participated in: Digital Signal Processing Fair 2026 with entry for “Doppler Things”, Technical Committee for INTERFACE: Bridging Core Computer Engineering Principles with Emerging Industry Practice Seminar, Technical Committee for Design and Project Research Defense',
    ],
  },
  {
    degree: 'Bachelor of Science in Nursing',
    school: 'Adamson University',
    period: '08/2021 – 05/2021',
    location: 'Manila, Philippines',
    details: [],
  },
  {
    degree: 'High School Diploma, STEM Strand',
    school: 'Saint Francis Institute Learning and Business Highschool Inc.',
    period: '06/2009 – 05/2021',
    location: 'Main Campus Branch',
    details: [
      'Activities and societies: With High Honors - Grade 12',
      'With Honors - Grade 1 - 11',
      'Champion: Volleyball (2017)',
      'Champion: Street Dance (2018) | Theme: "Maskara Festival" (Main Campus Branch)',
      'Best in Research Award for "Perceptions of Junior High School Students of SFILBHSI - Main Campus on Effective Teaching Strategies Towards their Improved Academic Performance"',
      'Participated in: Drums and Lyre Competition (2018-2019) | Street Dance Competition (2017-2019) | Online Christmas Carole Contest (2020)'
    ],
  },
];

const WORK = [
  {
    role: 'Software Quality Assurance Tester I',
    org: 'Elevated Plus Inc.',
    type: 'Full-time',
    period: '10/2026 – Present',
    location: 'Legazpi Village, Makati · Hybrid',
    points: [],
  },
  {
    role: 'Technical Support Intern',
    org: 'IBMS Technology Phils. Corp',
    period: '07/2025 – 09/2025',
    points: [
      'Assisted in maintaining network configurations and server operations.',
      'Supported end-users with hardware and software troubleshooting.',
      'Assisted various departments in maintaining network security by configuring remote routers and firewalls.',
      'Performed tests on newly installed hardware and software to provide components that interface correctly with each other and network.',
      'Participated in training sessions to enhance technical skills and knowledge.',
      'Installed access control systems and handled cable splicing in various locations.',
      'Troubleshot door lock systems and performed relay maintenance in service areas.',
      'Application of industry standards in installation of cabling systems; utilized star topologies in backbone systems',
      'Conducted research in equipment and materials to fulfill client’s requests and technical requirements',
    ],
  },
  {
    role: 'Student Assistant',
    org: 'Polytechnic University of the Philippines',
    period: '08/2024 – 10/2024',
    points: [
      'Addressed fellow students’ inquiries regarding university policies and procedures, enhancing their understanding of institutional guidelines.',
      'Guided students in navigating university resources, facilitating their access to necessary support and information.',
      'Assisted professors with administrative tasks and classroom preparation.',
      'Provided administrative support such as filing, photocopying, scanning, faxing, and sorting mail.',
      'Organized and maintained office files, documents, and records.',
      'Oversaw office supplies inventory by ordering materials and tracking usage to ensure availability for staff and students.',
      'Set up audiovisual equipment for classroom presentations and assisted with audiovisual equipment operation.',
      'Explained class procedures, lab policies and important dates.',
      'Provided computer software and hardware maintenance in classrooms',
      'Created orientation material and video presentation for students and faculty',
    ],
  },
];

const VISIBLE_POINTS = 4;

const CONTACT_EMAIL = 'lgiamndla07@gmail.com';
const WEB3FORMS_ACCESS_KEY = 'bd2d1bce-3036-4f54-abb6-7bb7dfb4d701';

const LOCAL_LOGOS = import.meta.glob('./assets/skills/*.{png,svg,webp,jpg,jpeg}', {
  eager: true,
  import: 'default',
});

const localLogo = (file) => {
  const key = Object.keys(LOCAL_LOGOS).find((k) => k.toLowerCase().includes(`/skills/${file}.`));
  return key ? LOCAL_LOGOS[key] : null;
};

const devicon = (slug) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
const wikimedia = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}`;
const simpleIcons = (slug, version = 'latest') => `https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${slug}.svg`;

const FALLBACK_ART = {
  Canva: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="canvaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#canvaGrad)" />
      <path d="M31 17.5a9.5 9.5 0 1 0 0 13" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  CapCut: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M33 14a12 12 0 1 0 0 20" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M10 40 38 8" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  ),
  Pygame: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="3" y="3" width="42" height="42" rx="10" fill="#2e7d32" />
      <text x="24" y="31" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="sans-serif">
        pg
      </text>
    </svg>
  ),
};

const TECH_STACK = [
  { name: 'Python', file: 'python', sources: [{ src: devicon('python') }] },
  { name: 'C#', file: 'csharp', sources: [{ src: devicon('csharp') }] },
  { name: 'C++', file: 'cplusplus', sources: [{ src: devicon('cplusplus') }] },
  { name: 'Java', file: 'java', sources: [{ src: devicon('java') }] },
  { name: 'HTML', file: 'html', sources: [{ src: devicon('html5') }] },
  { name: 'CSS', file: 'css', sources: [{ src: devicon('css3') }] },
  { name: 'JavaScript', file: 'javascript', sources: [{ src: devicon('javascript') }] },
  { name: 'React', file: 'react', sources: [{ src: devicon('react') }] },
  { name: 'Arduino IDE', file: 'arduino', sources: [{ src: devicon('arduino') }] },
  { name: 'Unity', file: 'unity', sources: [{ src: devicon('unity'), invert: true }] },
  {
    name: 'Pygame',
    file: 'pygame',
    wide: true,
    sources: [{ src: wikimedia('Pygame_logo.svg'), plate: true }],
    art: FALLBACK_ART.Pygame,
  },
  { name: 'Blender', file: 'blender', sources: [{ src: devicon('blender') }] },
  {
    name: 'Canva',
    file: 'canva',
    sources: [
      { src: devicon('canva') },
      { src: simpleIcons('canva', '10.0.0'), invert: true },
      { src: 'https://cdn.simpleicons.org/canva' },
    ],
    art: FALLBACK_ART.Canva,
  },
  {
    name: 'CapCut',
    file: 'capcut',
    sources: [
      { src: wikimedia('Capcut-icon.svg') },
      { src: simpleIcons('capcut'), invert: true },
    ],
    art: FALLBACK_ART.CapCut,
  },
  { name: 'TestRail', file: 'testrail', sources: [{ src: simpleIcons('testrail') }] },
  { name: 'Jira', file: 'jira', sources: [{ src: devicon('jira') }] },
  { name: 'Slack', file: 'slack', sources: [{ src: devicon('slack') }] },
  { name: 'Confluence', file: 'confluence', sources: [{ src: devicon('confluence') }] },
];

const SKILL_GROUPS = [
  { title: 'Programming Languages', items: ['Python', 'C#', 'C++', 'Java'] },
  { title: 'Web & Frontend Development', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Embedded Systems & IDE', items: ['Arduino IDE'] },
  { title: 'Game Design', items: ['Unity', 'Pygame'] },
  { title: 'Multimedia Tools', items: ['Blender', 'Canva', 'CapCut'] },
  { title: 'Technical Skills', items: ['IT Support & Infrastructure', 'Software Testing', 'Network Security'] },
  { title: 'Quality Assurance & Collaboration', items: ['TestRail', 'Jira', 'Slack', 'Confluence', 'Whiteglove Testing', 'Adhoc'] },
  { title: 'Soft Skills', items: ['Adaptability', 'Time Management', 'Flexibility', 'Responsibility', 'Self Development', 'Attention to Detail'] },
];

const PROJECTS_DATA = [
  {
    id: 1,
    category: 'Game Dev',
    title: 'Rizal Through Play: A 2.5D RPG Approach to Noli Me Tangere',
    period: '11/2024 – 05/2026',
    summary: 'A gamified educational tool developed using Unity Engine, Blender, C++, Web/Mobile Application, Firebase, and Git to improve student engagement towards classic Philippine literature.',
    problemContext: 'Students often struggle with traditional reading comprehension methods for classic historical literature like Noli Me Tangere, leading to low engagement and retention.',
    keyHighlights: [
      'Built immersive 2.5D interactive role-playing environments in Unity.',
      'Modeled bespoke 3D assets and environments using Blender.',
      'Integrated real-time database syncing with Firebase for progress tracking.'
    ],
    tags: ['Unity', 'Blender', 'C++', 'Firebase', 'Git'],
    year: '2026',
    files: [
      './src/assets/Projects/RizalThroughPlay/RizalThroughPlay.png',
      './src/assets/Projects/RizalThroughPlay/RTP_Ingame.jpeg'
    ]
  },
  {
    id: 2,
    category: 'IoT & Hardware',
    title: 'Doppler Things — Gesture-Controlled Prototype Detection',
    period: '11/2025 – 01/2026',
    summary: 'Gesture-controlled prototype detection of hand movements by analyzing real-time frequency shifts based on motion direction and proximity towards or away from ultrasonic sensors using PyGame and Arduino IDE.',
    problemContext: 'Traditional human-computer interfaces lack tactile, contactless proximity awareness suited for specialized embedded prototyping environments.',
    keyHighlights: [
      'Processed real-time frequency shifts via Arduino microcontroller and ultrasonic sensors.',
      'Designed responsive visual feedback loops utilizing PyGame modules.',
      'Optimized sensor polling rates for latency-free hand gesture tracking.'
    ],
    tags: ['PyGame', 'Arduino IDE', 'Ultrasonic Sensors'],
    year: '2026',
    files: [
      './src/assets/Projects/DopplerThings/DopplerThings_Logo.png',
      './src/assets/Projects/DopplerThings/DopplerThings_Menu.png',
      './src/assets/Projects/DopplerThings/DopplerThings_Demogorgon.png',
      './src/assets/Projects/DopplerThings/DopplerThings_Vecna.png'
    ]
  },
];

const CERTIFICATES_DATA = [
  {
    title: 'Introduction to Software Testing',
    issuer: 'Simplilearn',
    date: 'October 11, 2026',
    file: './src/assets/Certificate/SkillUP_Introduction to Software Testing.pdf'
  },
  {
    title: 'Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: 'September 7, 2026',
    file: './src/assets/Certificate/CCNA_Intro to Networking.pdf'
  },
  {
    title: 'Python Essentials I',
    issuer: 'Polytechnic University of the Philippines',
    date: 'February 5, 2025',
    file: './src/assets/Certificate/Python Essentials I.pdf'
  },
];

const AWARDS_DATA = [
  {
    title: 'Best in Research Award',
    org: 'Saint Francis Institute Learning and Business Highschool Inc.',
    date: '01/12/2021',
    description: 'Awarded for perceptions of Junior High School students on effective teaching strategies towards improved academic performance.',
    file: ''
  },
  {
    title: 'With High Honors',
    org: 'Saint Francis Institute Learning and Business Highschool Inc.',
    date: '01/12/2020',
    description: 'Recognized for high academic excellence throughout senior/junior high school.',
    file: ''
  },
  {
    title: 'With Honors',
    org: 'Saint Francis Institute Learning and Business Highschool Inc.',
    date: '2009–2020',
    description: 'Recognized for academic achievement throughout basic education years.',
    file: ''
  },
  {
    title: 'Dean’s Lister & Academic Recognition',
    org: 'Polytechnic University of the Philippines',
    date: '2022–2026',
    description: 'Consistent academic performance during Bachelor of Science in Computer Engineering studies.',
    file: ''
  },
];

function SkillTile({ name, file, sources = [], wide, art }) {
  const list = [];
  const local = localLogo(file);
  if (local) list.push({ src: local });
  list.push(...sources);

  const [idx, setIdx] = useState(0);
  const current = list[idx];

  return (
    <div className="skill_tile">
      <div className={`skill_tile_icon${wide ? ' wide' : ''}`}>
        {current ? (
          <img
            key={current.src}
            src={current.src}
            alt=""
            draggable={false}
            className={[current.invert && 'invert', current.plate && 'plate'].filter(Boolean).join(' ')}
            onError={() => setIdx((i) => i + 1)}
          />
        ) : art ? (
          art
        ) : (
          <span className="skill_tile_fallback">{name.slice(0, 2)}</span>
        )}
      </div>
      <span className="skill_tile_name">{name}</span>
    </div>
  );
}

export default function App() {
  const [roleText, setRoleText] = useState('');
  const [activeNav, setActiveNav] = useState('ABOUT');
  const [activeSocial, setActiveSocial] = useState('Instagram');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [openJobs, setOpenJobs] = useState({});
  const [projectFilter, setProjectFilter] = useState('ALL');
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);

  const toggleJob = (i) => setOpenJobs((prev) => ({ ...prev, [i]: !prev[i] }));

  const emptyForm = { name: '', email: '', subject: '', message: '' };
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (WEB3FORMS_ACCESS_KEY) {
      const botcheck = new FormData(e.currentTarget).get('botcheck') === 'on';
      setStatus('sending');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            from_name: 'Portfolio Contact Form',
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            botcheck,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || 'Request failed');
        setStatus('sent');
        setForm(emptyForm);
      } catch {
        setStatus('error');
      }
      return;
    }

    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  useEffect(() => {
    const target = 'QUALITY ASSURANCE TESTER';
    let idx = 0;
    setRoleText('');
    const interval = setInterval(() => {
      idx++;
      setRoleText(target.slice(0, idx));
      if (idx >= target.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight * 0.35;
      let current = 'ABOUT';
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.toLowerCase());
        if (el && el.getBoundingClientRect().top <= marker) current = item;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = NAV_ITEMS[NAV_ITEMS.length - 1];
      }
      setActiveNav(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredProjects = projectFilter === 'ALL' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category.toUpperCase() === projectFilter.toUpperCase());

  const renderFilePreview = (filePath, altText) => {
    if (!filePath) return <div style={{ color: '#aaa', padding: '2rem', textAlign: 'center' }}>No preview media available</div>;
    const isPdf = filePath.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      return (
        <iframe 
          src={filePath} 
          title={altText} 
          className="modal_pdf_viewer"
        />
      );
    }
    return <img src={filePath} alt={altText} />;
  };

  return (
    <div className="portfolio_root">
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <Threads
          color="#ffffff"
          lineCount={30}
          thickness={1.5}
          softness={1.3}
          amplitude={1.7}
          distance={0.4}
          waves={1.05}
          speed={0.8}
          split={0.04}
          fray={0.5}
          angle={25}
          taper={0.85}
          brightness={1.6}
          parting={0}
          enableMouseInteraction={false}
          fade={0}
          opacity={1}
          seed={0}
        />
      </div>

      <TargetCursor
        targetSelector=".home_nav_link, .home_resume_btn, .home_social_item, .profile-card__contact, .work_toggle_btn, .contact_submit, .modal_download_btn, .modal_close_btn, .gallery_filter_btn, .gallery_card, .cert_card_action_btn, .award_view_btn, .award_media_thumb"
        spinDuration={2}
        hoverDuration={0.2}
        size={36}
        cornerSize={12}
        thickness={3}
        padding={6}
        dotSize={4}
        cursorColor="#ffffff"
        blendMode="difference"
        parallaxOn
        matchRadius
        showLabel
        clickEffect
        hideDefaultCursor
      />

      <nav className="home_navbar">
        <ul className="home_nav_list">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`home_nav_link ${activeNav === item ? 'active' : ''}`}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ABOUT / HERO */}
      <section id="about" className="about_section">
        <div className="home_container">
          <div className="home_content_wrapper">
            <div className="home_details_column">
              <h2 className="home_greeting">
                Hi, I'm <span className="home_name_italic">Logie Mendiola</span>.
              </h2>
              <h3 className="home_role_title">
                <span>{roleText}</span>
                <span className="home_cursor_thick"></span>
              </h3>

              <p className="home_about_card">
                Quality Assurance Manual Tester with a focus on game development across multiple device platforms. I have hands-on experience in IT infrastructure and network configuration, including setting up routers and firewalls, cabling installation, and access control systems. I also have prior game development experience with the Unity engine, using Blender for 3D modeling, plus web development experience with HTML, CSS, and JavaScript.
              </p>

              <div className="home_cta_group">
                <button
                  type="button"
                  className="home_resume_btn"
                  data-cursor-label="Open"
                  onClick={() => setIsResumeOpen(true)}
                >
                  View Resume
                </button>
              </div>

              <div className="home_socials_group">
                <a
                  href="https://www.linkedin.com/in/logie-mendiola-229374225/"
                  target="_blank"
                  rel="noreferrer"
                  className={`home_social_item ${activeSocial === 'Linkedin' ? 'active' : ''}`}
                  data-cursor-label="Visit"
                  onClick={() => setActiveSocial('Linkedin')}
                >
                  <div className="home_social_icon_box">
                    <svg viewBox="0 0 24 24" className="social_svg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <span className="home_social_label">Linkedin</span>
                </a>

                <a
                  href="https://www.facebook.com/lex.mendiola.5"
                  target="_blank"
                  rel="noreferrer"
                  className={`home_social_item ${activeSocial === 'Facebook' ? 'active' : ''}`}
                  data-cursor-label="Visit"
                  onClick={() => setActiveSocial('Facebook')}
                >
                  <div className="home_social_icon_box">
                    <svg viewBox="0 0 24 24" className="social_svg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                  <span className="home_social_label">Facebook</span>
                </a>

                <a
                  href="https://github.com/lamendiola07"
                  target="_blank"
                  rel="noreferrer"
                  className={`home_social_item ${activeSocial === 'Github' ? 'active' : ''}`}
                  data-cursor-label="Visit"
                  onClick={() => setActiveSocial('Github')}
                >
                  <div className="home_social_icon_box">
                    <svg viewBox="0 0 24 24" className="social_svg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </div>
                  <span className="home_social_label">Github</span>
                </a>

                <a
                  href="https://www.instagram.com/tatsu.gieri/"
                  target="_blank"
                  rel="noreferrer"
                  className={`home_social_item ${activeSocial === 'Instagram' ? 'active' : ''}`}
                  data-cursor-label="Visit"
                  onClick={() => setActiveSocial('Instagram')}
                >
                  <div className="home_social_icon_box">
                    <svg viewBox="0 0 24 24" className="social_svg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <span className="home_social_label">Instagram</span>
                </a>

                <a
                  href="https://x.com/justghieeeee"
                  target="_blank"
                  rel="noreferrer"
                  className={`home_social_item ${activeSocial === 'X' ? 'active' : ''}`}
                  data-cursor-label="Visit"
                  onClick={() => setActiveSocial('X')}
                >
                  <div className="home_social_icon_box">
                    <svg viewBox="0 0 24 24" className="social_svg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                  </div>
                  <span className="home_social_label">X</span>
                </a>

                <a
                  href="https://www.youtube.com/@justghiee"
                  target="_blank"
                  rel="noreferrer"
                  className={`home_social_item ${activeSocial === 'YouTube' ? 'active' : ''}`}
                  data-cursor-label="Visit"
                  onClick={() => setActiveSocial('YouTube')}
                >
                  <div className="home_social_icon_box">
                    <svg viewBox="0 0 24 24" className="social_svg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="home_social_label">YouTube</span>
                </a>
              </div>
            </div>

            <div className="home_profile_column">
              <ProfileCard
                avatarUrl={profilePhoto}
                miniAvatarUrl={profilePhoto}
                name="Logie Mendiola"
                title="Quality Assurance Tester"
                handle="lamendiola07"
                status="Online"
                contactText="Contact"
                onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </div>
          </div>
        </div>

        <div className="section_block" id="education">
          <div className="section_panel">
            <div className="section_heading">
              <h2>Education</h2>
              <span className="section_heading_line" />
            </div>
            <div className="section_divider" />

            <ul className="timeline">
              {EDUCATION.map((edu) => (
                <li className="timeline_item" key={`${edu.degree}-${edu.school}`}>
                  <span className="timeline_node" aria-hidden="true" />
                  <h3 className="timeline_title">{edu.degree}</h3>
                  <p className="timeline_org">{edu.school}</p>
                  <p className="timeline_meta">{[edu.period, edu.location].filter(Boolean).join(' · ')}</p>
                  {edu.details.length > 0 && (
                    <ul className="timeline_list">
                      {edu.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section id="work" className="section_block">
        <div className="section_panel">
          <div className="section_heading">
            <h2>Work Experience</h2>
            <span className="dots_icon" aria-hidden="true" />
            <span className="section_heading_line" />
          </div>
          <div className="section_divider" />

          <ul className="timeline">
            {WORK.map((job, i) => {
              const open = !!openJobs[i];
              const shown = open ? job.points : job.points.slice(0, VISIBLE_POINTS);
              return (
                <li className="timeline_item" key={job.role}>
                  <span className="timeline_node" aria-hidden="true" />
                  <h3 className="timeline_title">{job.role}</h3>
                  <p className="timeline_org">{job.org}{job.type ? ` · ${job.type}` : ''}</p>
                  <p className="timeline_meta">{[job.period, job.location].filter(Boolean).join(' · ')}</p>
                  {shown.length > 0 && (
                    <ul className="timeline_list">
                      {shown.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                  {job.points.length > VISIBLE_POINTS && (
                    <button type="button" className="work_toggle_btn" onClick={() => toggleJob(i)}>
                      {open ? 'Show less' : `Show all ${job.points.length} responsibilities`}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section_block">
        <div className="section_panel">
          <div className="section_heading">
            <h2>Tech Stack</h2>
            <span className="section_heading_line" />
          </div>
          <div className="section_divider" />

          <div className="skills_marquee">
            <div className="skills_marquee_track">
              {[0, 1].map((copy) => (
                <div className="skills_marquee_group" key={copy} aria-hidden={copy === 1}>
                  {TECH_STACK.map((tech) => (
                    <SkillTile key={tech.name} {...tech} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="skills_groups">
            {SKILL_GROUPS.map((group) => (
              <div className="skills_group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skills_chips">
                  {group.items.map((item) => (
                    <span className="skill_chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS TAB */}
      <section id="projects" className="section_block">
        <div className="section_panel">
          <div className="section_heading">
            <h2>Built Projects</h2>
            <span className="section_heading_line" />
          </div>
          <div className="section_divider" />

          <div className="gallery_filter_bar">
            {['ALL', 'GAME DEV', 'IOT & HARDWARE'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery_filter_btn ${projectFilter === cat ? 'active' : ''}`}
                onClick={() => setProjectFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery_grid">
            {filteredProjects.map((proj) => (
              <div 
                className="gallery_card" 
                key={proj.id}
                onClick={() => { setSelectedProject(proj); setActiveImageIdx(0); }}
              >
                <div className="gallery_card_image_preview">
                  {proj.files[0].toLowerCase().endsWith('.pdf') ? (
                    <iframe src={proj.files[0]} title={proj.title} className="card_iframe_preview" />
                  ) : (
                    <img src={proj.files[0]} alt={proj.title} />
                  )}
                  <span className="gallery_card_badge">{proj.category}</span>
                  <span className="gallery_card_year">{proj.year}</span>
                </div>
                <div className="gallery_card_content">
                  <h3 className="gallery_card_title">{proj.title}</h3>
                  <p className="gallery_card_desc">{proj.summary}</p>
                  <div className="gallery_card_tags">
                    {proj.tags.map((t) => (
                      <span className="gallery_tag" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="gallery_card_action">
                    <span className="details_link">DETAILS &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LICENSES AND CERTIFICATES */}
      <section id="certificates" className="section_block">
        <div className="section_panel">
          <div className="section_heading">
            <h2>Licenses and Certifications</h2>
            <span className="section_heading_line" />
          </div>
          <div className="section_divider" />

          <div className="cert_gallery_grid">
            {CERTIFICATES_DATA.map((cert) => (
              <div className="cert_frame_card" key={cert.title}>
                <div className="cert_frame_bar">
                  <div className="cert_dots"><span/><span/><span/></div>
                </div>
                <div className="cert_img_box">
                  {cert.file.toLowerCase().endsWith('.pdf') ? (
                    <iframe src={cert.file} title={cert.title} className="card_iframe_preview" />
                  ) : (
                    <img src={cert.file} alt={cert.title} />
                  )}
                </div>
                <div className="cert_info_box">
                  <h3>{cert.title}</h3>
                  <p className="cert_issuer">{cert.issuer} · <span className="cert_year">{cert.date}</span></p>
                  <div className="cert_footer_row">
                    <span className="cert_id">Verified</span>
                    <button 
                      type="button" 
                      className="cert_card_action_btn" 
                      onClick={() => setSelectedCert(cert)}
                    >
                      VIEW &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS AND ACHIEVEMENTS */}
      <section id="awards" className="section_block">
        <div className="section_panel">
          <div className="section_heading">
            <h2>Awards and Achievements</h2>
            <span className="section_heading_line" />
          </div>
          <p className="section_subheading">A collection of academic and professional recognitions that reflect dedication to excellence.</p>
          <div className="section_divider" />

          <div className="dome_gallery_container awards_dome">
            <div className="dome_gallery_ring">
              {AWARDS_DATA.map((award, idx) => (
                <div className="dome_gallery_item award_item" key={award.title}>
                  <div className="dome_item_preview">
                    <span>AWARD #{idx + 1}</span>
                    <h4>{award.title}</h4>
                    <p>{award.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="awards_highlights_grid">
            {AWARDS_DATA.map((award) => (
              <div className="award_highlight_card" key={award.title}>
                {award.file ? (
                  <div className="award_media_thumb" onClick={() => setSelectedAward(award)}>
                    {award.file.toLowerCase().endsWith('.pdf') ? (
                      <iframe src={award.file} title={award.title} />
                    ) : (
                      <img src={award.file} alt={award.title} />
                    )}
                  </div>
                ) : (
                  <div className="award_icon_box">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                )}
                <div className="award_content">
                  <h3>{award.title}</h3>
                  <p className="award_org">{award.org} · <span className="award_date">{award.date}</span></p>
                  <p className="award_desc">{award.description}</p>
                  {award.file && (
                    <button type="button" className="award_view_btn" onClick={() => setSelectedAward(award)}>
                      VIEW ATTACHMENT &rarr;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section_block contact_section">
        <div className="contact_header">
          <h2>Connect With Me</h2>
          <p>Have a project in mind, a question about my work, or just want to connect? Send me a message below.</p>
        </div>

        <form className="contact_form" onSubmit={handleSubmit}>
          <div className="contact_row">
            <label className="contact_field">
              <span>Name</span>
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            </label>
            <label className="contact_field">
              <span>Email</span>
              <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </label>
          </div>

          <label className="contact_field">
            <span>Subject</span>
            <input type="text" name="subject" placeholder="Project Inquiry / Collaboration" value={form.subject} onChange={handleChange} required />
          </label>

          <label className="contact_field">
            <span>Message</span>
            <textarea name="message" rows={5} placeholder="Hello Logie, I would like to discuss..." value={form.message} onChange={handleChange} required />
          </label>

          <input type="checkbox" name="botcheck" className="contact_honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <button type="submit" className="contact_submit" disabled={status === 'sending'}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M2.4 20.6 22 12 2.4 3.4 2.3 10l14 2-14 2z" />
            </svg>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="contact_status sent">
              {WEB3FORMS_ACCESS_KEY ? 'Thanks! Your message has been sent.' : 'Your email app should now open with the message ready to send.'}
            </p>
          )}
          {status === 'error' && (
            <p className="contact_status error">
              Something went wrong. Please try again, or email me at {CONTACT_EMAIL}.
            </p>
          )}
        </form>
      </section>

      {/* PROJECT DETAILS POPUP MODAL */}
      {selectedProject && (
        <div className="modal_overlay active" onClick={() => setSelectedProject(null)}>
          <div className="project_detail_modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <div className="modal_dots"><span/><span/><span/></div>
              <h4 className="modal_title">PORTFOLIO_VIEWER // {selectedProject.title}</h4>
              <button type="button" className="modal_close_btn" onClick={() => setSelectedProject(null)}>&times;</button>
            </div>
            
            <div className="project_detail_body">
              {/* Left Column: Image / PDF Viewer */}
              <div className="project_modal_left">
                <div className="modal_img_counter">{activeImageIdx + 1} / {selectedProject.files.length}</div>
                <div className="modal_main_image">
                  {renderFilePreview(selectedProject.files[activeImageIdx], selectedProject.title)}
                </div>
                {selectedProject.files.length > 1 && (
                  <div className="modal_img_controls">
                    <button 
                      type="button" 
                      onClick={() => setActiveImageIdx((prev) => (prev === 0 ? selectedProject.files.length - 1 : prev - 1))}
                    >
                      &larr; PREV
                    </button>
                    <div className="modal_thumb_dots">
                      {selectedProject.files.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={idx === activeImageIdx ? 'active' : ''} 
                          onClick={() => setActiveImageIdx(idx)}
                        />
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setActiveImageIdx((prev) => (prev === selectedProject.files.length - 1 ? 0 : prev + 1))}
                    >
                      NEXT &rarr;
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Heading, Summary, Problem Context, Key Highlights */}
              <div className="project_modal_right">
                <div className="modal_meta_badge_row">
                  <span className="gallery_card_badge">{selectedProject.category}</span>
                  <span className="gallery_card_year">{selectedProject.year}</span>
                </div>
                
                <h2 className="modal_proj_heading">{selectedProject.title}</h2>
                
                <div className="modal_section_block">
                  <h4 className="modal_subheading">SUMMARY</h4>
                  <p className="modal_text">{selectedProject.summary}</p>
                </div>

                <div className="modal_section_block">
                  <h4 className="modal_subheading problem_accent">PROBLEM CONTEXT</h4>
                  <p className="modal_text">{selectedProject.problemContext}</p>
                </div>

                <div className="modal_section_block">
                  <h4 className="modal_subheading">KEY HIGHLIGHTS & DETAILS</h4>
                  <ul className="modal_highlights_list">
                    {selectedProject.keyHighlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="project_detail_footer">
              <span>PORTFOLIO SHOWCASE // LOGIE MENDIOLA</span>
              <button type="button" className="modal_footer_close" onClick={() => setSelectedProject(null)}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE DETAIL POPUP MODAL */}
      {selectedCert && (
        <div className="modal_overlay active" onClick={() => setSelectedCert(null)}>
          <div className="project_detail_modal cert_popup_modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <div className="modal_dots"><span/><span/><span/></div>
              <h4 className="modal_title">CERTIFICATE_VIEWER // {selectedCert.title}</h4>
              <button type="button" className="modal_close_btn" onClick={() => setSelectedCert(null)}>&times;</button>
            </div>
            
            <div className="cert_modal_body">
              <div className="cert_modal_preview_container">
                {renderFilePreview(selectedCert.file, selectedCert.title)}
              </div>
              <div className="cert_modal_info">
                <h2>{selectedCert.title}</h2>
                <p><strong>Issuer:</strong> {selectedCert.issuer}</p>
                <p><strong>Date:</strong> {selectedCert.date}</p>
              </div>
            </div>

            <div className="project_detail_footer">
              <span>ISSUED BY {selectedCert.issuer.toUpperCase()}</span>
              <button type="button" className="modal_footer_close" onClick={() => setSelectedCert(null)}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* AWARD DETAIL POPUP MODAL */}
      {selectedAward && (
        <div className="modal_overlay active" onClick={() => setSelectedAward(null)}>
          <div className="project_detail_modal cert_popup_modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <div className="modal_dots"><span/><span/><span/></div>
              <h4 className="modal_title">AWARD_VIEWER // {selectedAward.title}</h4>
              <button type="button" className="modal_close_btn" onClick={() => setSelectedAward(null)}>&times;</button>
            </div>
            
            <div className="cert_modal_body">
              {selectedAward.file && (
                <div className="cert_modal_preview_container">
                  {renderFilePreview(selectedAward.file, selectedAward.title)}
                </div>
              )}
              <div className="cert_modal_info">
                <h2>{selectedAward.title}</h2>
                <p><strong>Organization:</strong> {selectedAward.org}</p>
                <p><strong>Date:</strong> {selectedAward.date}</p>
                <p>{selectedAward.description}</p>
              </div>
            </div>

            <div className="project_detail_footer">
              <span>AWARD RECOGNITION</span>
              <button type="button" className="modal_footer_close" onClick={() => setSelectedAward(null)}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* RESUME MODAL */}
      {isResumeOpen && (
        <div className="modal_overlay active" onClick={() => setIsResumeOpen(false)}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h4 className="modal_title">Logie Mendiola — Resume</h4>
              <div className="modal_actions">
                <a href="/assets/Mendiola,Logie_Resume.pdf" download="Mendiola,Logie_Resume.pdf" className="modal_download_btn">
                  Download PDF
                </a>
                <button type="button" className="modal_close_btn" onClick={() => setIsResumeOpen(false)}>
                  &times;
                </button>
              </div>
            </div>
            <div className="modal_body">
              <iframe src="/assets/Mendiola,Logie_Resume.pdf" title="Resume Viewer" className="resume_iframe" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}