import { motion, useReducedMotion, useScroll } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ================= ANIMATION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

/* ================= ROOT ================= */
export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-[#0b1020] text-slate-100 relative overflow-x-hidden">
      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-cyan-400 origin-left z-[100]"
      />

      <CursorGlow />
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

/* ================= CURSOR GLOW ================= */
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="hidden md:block pointer-events-none fixed top-0 left-0 w-40 h-40 rounded-full bg-cyan-400/10 blur-3xl z-0"
      animate={{ x: pos.x - 80, y: pos.y - 80 }}
      transition={{ type: "tween", ease: "linear", duration: 0.2 }}
    />
  );
}

/* ================= BACKGROUND ================= */
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-[120px]"
        animate={{ x: [0, 200, 0], y: [0, 150, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
        animate={{ x: [0, -200, 0], y: [0, -150, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ================= NAVBAR ================= */
function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-bold tracking-wide text-lg">
          Ritik <span className="text-cyan-400">Khare</span>
        </span>
        <nav className="hidden md:flex gap-8 text-sm text-slate-300">
          {["about", "skills", "projects", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="relative hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <span className="inline-block mb-6 px-5 py-1 rounded-full text-sm bg-white/10 border border-white/20">
            Java Backend Engineer | Spring Boot | Secure APIs
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Ritik Khare <br />
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_200%] bg-clip-text text-transparent"
            >
              Java Backend Developer
            </motion.span>
          </h1>

          <p className="mt-8 text-lg text-slate-400 max-w-xl">
            MCA graduate from <strong className="text-slate-200">VIT Chennai</strong> with hands-on experience
            building <strong className="text-slate-200">secure backend systems</strong> using
            Spring Boot, JWT, RBAC, Docker, and MySQL.
          </p>

          <div className="mt-12 flex gap-4">
            <a
              href="/resume.pdf"
              className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-lg shadow-cyan-500/40 flex items-center gap-2"
            >
              <Download size={18} /> Resume
            </a>

            <a
              href="https://github.com/khare01"
              target="_blank"
              className="px-8 py-4 rounded-xl border border-white/20 hover:border-cyan-400 transition flex items-center gap-2"
            >
              <Github size={18} /> GitHub
            </a>
          </div>
        </motion.div>

         <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-3xl opacity-50"></div>

            <img
              src="/profile.jpg"
              alt="Ritik Khare"
              className="relative w-72 h-72 rounded-full object-cover object-top border-4 border-white/20 shadow-2xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ================= ABOUT ================= */
function About() {
  return (
    <motion.section
      id="about"
      className="max-w-5xl mx-auto px-6 py-16"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold mb-6">
        About Me
        <span className="block w-20 h-1 bg-cyan-400 mt-3 rounded"></span>
      </h2>

      <p className="text-slate-400 text-lg leading-relaxed mb-4">
        I am an MCA graduate from Vellore Institute of Technology, Chennai, with a strong interest in backend engineering
        and secure system design. I work primarily with Java and Spring Boot to build RESTful backend services,
        focusing on authentication, authorization, and clean API design.
      </p>

      <p className="text-slate-400 text-lg leading-relaxed">
        I have hands-on experience developing secure backend applications involving JWT-based authentication,
        role-based access control, and database integration. I enjoy solving backend problems that require clear logic,
        structured design, and a focus on reliability.
      </p>
    </motion.section>
  );
}

/* ================= SKILLS ================= */
function Skills() {
  const prefersReducedMotion = useReducedMotion();

  const skills = [
    { title: "Programming Languages", value: "Java (8+), Python", desc: "Strong foundation in Java with OOP and backend problem solving." },
    { title: "Backend Engineering", value: "Spring Boot, Spring Security, Spring Data JPA, REST APIs, Microservices, Flask", desc: "Designed secure modular backend systems." },
    { title: "Security & Authentication", value: "JWT, RBAC, BCrypt, OAuth (Basics)", desc: "Implemented authentication & authorization flows." },
    { title: "Databases", value: "MySQL", desc: "Experience in relational database design & integration." },
    { title: "DevOps & Containers", value: "Docker", desc: "Containerized applications for consistent environments." },
    { title: "Cloud (Basics)", value: "AWS (EC2, S3, IAM)", desc: "Basic cloud deployment awareness." },
    { title: "Web Technologies", value: "React.js, HTML, CSS, JavaScript (ES6+), JSON", desc: "Built responsive UIs integrated with APIs." },
    { title: "Testing & Quality", value: "JUnit 5, Mockito", desc: "Unit testing for business logic reliability." },
    { title: "Tools & Environment", value: "Git, GitHub, Maven, IntelliJ IDEA, VS Code", desc: "Modern collaborative development workflow." },
    { title: "Core CS Concepts", value: "OOP, Data Structures & Algorithms, Backend System Design", desc: "Strong fundamentals for scalable systems." },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-14">
          Technical Expertise
          <span className="block w-24 h-1 bg-cyan-400 mt-3 rounded"></span>
        </h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={
                prefersReducedMotion ? {} : { y: -10, scale: 1.03 }
              }
              transition={{ type: "spring", stiffness: 180, damping: 15 }}
              className="relative p-8 rounded-2xl bg-[#0f172a] border border-white/10 hover:border-cyan-400/50 shadow-xl shadow-cyan-500/10"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition" />
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-cyan-400 font-medium mb-3">{skill.value}</p>
              <p className="text-slate-400">{skill.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */
function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16">
          Projects
          <span className="block w-20 h-1 bg-cyan-400 mt-3 rounded"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <Project
            title="Identity & Access Management (IAM) Platform"
            desc="Developed a secure backend platform using Spring Boot with JWT authentication, RBAC, OTP verification, and Dockerized deployment."
            tech="Spring Boot • Spring Security • JWT • MySQL • Docker"
            github="https://github.com/khare01/Identity-Access-Management-IAM-Platform"
          />
          <Project
            title="Enhanced Multi-Layered Authentication System"
            desc="Designed an advanced authentication system combining passwords, visual cryptography, face recognition, liveness detection, and emotion verification."
            tech="Flask • FaceNet • MediaPipe • DeepFace • OpenCV"
            github="https://github.com/khare01/Enhanced-Multi-Layered-Authentication"
          />
          <Project
            title="Multiple Facial Recognition & Automated Attendance System"
            desc="Built a multi-face recognition attendance system using FaceNet and OpenCV. Research published at ICICS-2025 (Taylor & Francis)."
            tech="Python • Streamlit • FaceNet • OpenCV"
            github="https://github.com/khare01/Multiple-Facial-Recognition-and-Automated-Attendance-Posting"
          />

          <Project
            title="Protecting Images with Facial Biometrics"
            desc="Developed a research-driven security system that combines facial biometrics with image encryption. Facial features extracted using CNNs are used to dynamically generate encryption keys, ensuring secure and tamper-resistant image protection."
            tech="Python • OpenCV • CNN • Keras • AES Encryption • NumPy • Cryptography"
            github="https://github.com/khare01/Protecting-Images-with-Facial-Biometrics"
          />

        </div>
      </div>
    </section>
  );
}

function Project({ title, desc, tech, github }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ rotateX: 3, rotateY: -3, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="p-10 rounded-2xl bg-[#0f172a] border border-white/10 hover:border-cyan-400/50 shadow-xl shadow-cyan-500/10"
    >
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-slate-400 mb-4">{desc}</p>
      <p className="text-sm text-cyan-400 font-medium mb-6">{tech}</p>
      <a
        href={github}
        target="_blank"
        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
      >
        View Code <ExternalLink size={16} />
      </a>
    </motion.div>
  );
}

/* ================= CONTACT ================= */
function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-20"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Let’s Connect
          <span className="block w-20 h-1 bg-cyan-400 mt-3 mx-auto rounded"></span>
        </h2>
        <div className="flex justify-center gap-8 text-slate-400">
          <motion.a whileHover={{ y: -6, scale: 1.2 }} href="mailto:khareji1jan@gmail.com"><Mail /></motion.a>
          <motion.a whileHover={{ y: -6, scale: 1.2 }} href="https://github.com/khare01"><Github /></motion.a>
          <motion.a whileHover={{ y: -6, scale: 1.2 }} href="https://linkedin.com/in/ritikkhare01"><Linkedin /></motion.a>
        </div>
      </div>
    </motion.section>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} Ritik Khare — Java Backend Developer
    </footer>
  );
}
