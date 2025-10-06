"use client"; // MUST be the first line
import { useState, useEffect } from "react";
import {
  Users,
  Target,
  Award,
  Lightbulb,
  Star,
  BookOpen,
  Crown,
  Shield,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

const AboutUsPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [floatingParticles] = useState(() => {
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 10 + Math.random() * 10,
        size: 1 + Math.random() * 2,
      });
    }
    return particles;
  });

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const response = await fetch("/data/about-us.json");
        const data = await response.json();
        setAboutData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading about data:", error);
        setAboutData(getMockData());
        setLoading(false);
      }
    };

    loadAboutData();
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeline((prev) => {
        if (!aboutData?.history?.milestones) return prev;
        return (prev + 1) % aboutData.history.milestones.length;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [aboutData]);

  const getMockData = () => ({
    hero: {
      title: "About Our Journey",
      subtitle: "Building the Future Together",
      description:
        "We are a community of innovators, creators, and dreamers dedicated to making a positive impact through technology and collaboration.",
    },
    mission: {
      title: "Our Mission",
      description:
        "To empower individuals and organizations through innovative solutions that drive meaningful change.",
      points: [
        "Foster creativity and innovation",
        "Build sustainable communities",
        "Create lasting impact",
      ],
    },
    vision: {
      title: "Our Vision",
      description:
        "A world where technology serves humanity and creates opportunities for everyone to thrive.",
    },
    history: {
      title: "Our Journey",
      description: "Key milestones that shaped our story",
      milestones: [
        {
          year: "2024",
          title: "Global Expansion",
          description: "Reached 50+ countries worldwide",
        },
        {
          year: "2023",
          title: "Innovation Award",
          description: "Recognized for breakthrough solutions",
        },
        {
          year: "2022",
          title: "Community Growth",
          description: "Built a thriving community of 100k+ members",
        },
        {
          year: "2021",
          title: "Foundation",
          description: "Started with a vision to change the world",
        },
      ],
    },
    activities: {
      title: "What We Do",
      description: "Diverse initiatives that drive our mission forward",
      categories: [
        {
          icon: "🚀",
          title: "Innovation Labs",
          description: "Creating cutting-edge solutions for tomorrow",
        },
        {
          icon: "🎓",
          title: "Education Programs",
          description: "Empowering through knowledge and skills",
        },
        {
          icon: "🤝",
          title: "Community Building",
          description: "Connecting people and fostering collaboration",
        },
      ],
    },
    achievements: {
      title: "Our Impact",
      stats: [
        {
          number: "100K+",
          label: "Community Members",
          description: "Growing daily",
        },
        { number: "50+", label: "Countries", description: "Global reach" },
        { number: "500+", label: "Projects", description: "Launched" },
        { number: "95%", label: "Satisfaction", description: "User rating" },
      ],
    },
    events: {
      title: "Recent Milestones",
      assign: [
        {
          date: "Q1 2024",
          title: "Product Launch",
          description: "Released flagship platform v2.0",
        },
        {
          date: "Q4 2023",
          title: "Annual Summit",
          description: "Hosted 5000+ attendees",
        },
        {
          date: "Q3 2023",
          title: "Partnership",
          description: "Strategic collaboration announced",
        },
      ],
    },
    values: {
      title: "Core Values",
      items: [
        {
          icon: "💡",
          title: "Innovation",
          description: "Pushing boundaries and exploring new frontiers",
        },
        {
          icon: "⭐",
          title: "Excellence",
          description: "Striving for the highest quality in everything",
        },
        {
          icon: "🤝",
          title: "Collaboration",
          description: "Working together to achieve more",
        },
      ],
    },
    contact: {
      title: "Get In Touch",
      description: "Connect with us for collaborations and inquiries",
      email: "hello@example.com",
      phone: "+1 234 567 8900",
      address: "San Francisco, CA",
      socialLinks: { linkedin: "#" },
    },
  });

  const getValueIcon = (iconName) => {
    const icons = {
      "💡": Lightbulb,
      "⭐": Star,
      "🤝": Users,
      "📚": BookOpen,
      "👑": Crown,
      "🛡️": Shield,
    };
    return icons[iconName] || Lightbulb;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-400/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-400 border-r-purple-400 rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 border-4 border-t-purple-400 border-r-blue-400 rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            ></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Loading Experience
          </h2>
          <p className="text-gray-400">Preparing something amazing...</p>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Content Unavailable
          </h2>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x - 40}%`,
            top: `${mousePosition.y - 40}%`,
          }}
        ></div>
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-teal-500/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      {floatingParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        ></div>
      ))}

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
        {/* Hero Section */}
        <div
          className={`text-center mb-32 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-400/10 to-purple-600/10 border border-blue-400/30 rounded-full mb-12 mt-12 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-semibold tracking-wide">
              WHO WE ARE
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 animate-gradient">
              {aboutData.hero.title}
            </span>
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-8">
            {aboutData.hero.subtitle}
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            {aboutData.hero.description}
          </p>

          <div className="flex justify-center gap-4 mt-12">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div
          className={`grid md:grid-cols-2 gap-8 mb-32 transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 hover:border-blue-400/50 transition-all duration-500 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-4xl font-bold text-white">
                  {aboutData.mission.title}
                </h3>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                {aboutData.mission.description}
              </p>
              <ul className="space-y-4">
                {aboutData.mission.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 group/item">
                    <div className="p-1 bg-blue-400/20 rounded-lg mt-1 group-hover/item:bg-blue-400/30 transition-colors">
                      <ChevronRight className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-teal-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 hover:border-purple-600/50 transition-all duration-500 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-4xl font-bold text-white">
                  {aboutData.vision.title}
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                {aboutData.vision.description}
              </p>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div
          className={`mb-32 transform transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-400/10 to-purple-600/10 border border-purple-400/30 rounded-full mb-6 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold tracking-wide">
                TIMELINE
              </span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-100 mb-4">
              {aboutData.history.title}
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {aboutData.history.description}
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-600 to-teal-500 rounded-full shadow-lg shadow-blue-400/50"></div>

            <div className="space-y-16">
              {aboutData.history.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"
                    }`}
                  >
                    <div
                      className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-500 ${
                        activeTimeline === index
                          ? "scale-105 shadow-2xl shadow-purple-600/20 border-purple-400/50"
                          : "hover:scale-105"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-600/0 group-hover:from-blue-400/10 group-hover:to-purple-500/5 rounded-3xl transition-all duration-500"></div>
                      <div className="relative">
                        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
                          {milestone.year}
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors">
                          {milestone.title}
                        </h4>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-20 flex items-center justify-center">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full transition-all duration-500 ${
                          activeTimeline === index
                            ? "bg-purple-600/30 blur-xl scale-150"
                            : ""
                        }`}
                      ></div>
                      <div
                        className={`w-8 h-8 rounded-full border-4 transition-all duration-500 ${
                          activeTimeline === index
                            ? "bg-purple-400 border-purple-200 scale-125 shadow-lg shadow-purple-600/50"
                            : "bg-blue-400 border-blue-300"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 rounded-full bg-white/50 animate-ping ${
                            activeTimeline === index
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative max-w-2xl mx-auto">
            <div className="absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-600 to-teal-500 rounded-full shadow-lg shadow-blue-400/50"></div>

            <div className="space-y-12">
              {aboutData.history.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-start gap-8"
                  onTouchStart={() => setActiveTimeline(index)}
                >
                  <div className="relative z-20 mt-2">
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        activeTimeline === index
                          ? "bg-purple-600/30 blur-xl scale-150"
                          : ""
                      }`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full border-4 transition-all duration-500 ${
                        activeTimeline === index
                          ? "bg-purple-400 border-purple-200 scale-125 shadow-lg shadow-purple-600/50"
                          : "bg-blue-400 border-blue-300"
                      }`}
                    ></div>
                  </div>

                  <div className="flex-1">
                    <div
                      className={`group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 transition-all duration-500 ${
                        activeTimeline === index
                          ? "scale-105 shadow-2xl shadow-purple-600/20 border-purple-400/50"
                          : ""
                      }`}
                    >
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                        {milestone.year}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">
                        {milestone.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activities */}
        <div
          className={`mb-32 transform transition-all duration-1000 delay-600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-teal-500/10 to-purple-600/10 border border-teal-400/30 rounded-full mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-teal-400" />
              <span className="text-teal-300 text-sm font-semibold tracking-wide">
                ACTIVITIES
              </span>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-100 mb-4">
              {aboutData.activities.title}
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {aboutData.activities.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.activities.categories.map((activity, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-500 group-hover:-translate-y-2 h-full">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {activity.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors">
                    {activity.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div
          className={`mb-32 transform transition-all duration-1000 delay-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 mb-4">
              {aboutData.achievements.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aboutData.achievements.stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center hover:border-blue-400/50 transition-all duration-500 group-hover:-translate-y-2">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-teal-300 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white font-bold mb-2 text-lg">
                    {stat.label}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div
          className={`mb-32 transform transition-all duration-1000 delay-1200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 mb-4">
              {aboutData.values.title}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.values.items.map((value, index) => {
              const IconComponent = getValueIcon(value.icon);
              return (
                <div key={index} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-500 group-hover:-translate-y-2 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-purple-100 transition-colors">
                        {value.title}
                      </h4>
                    </div>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div
          className={`transform transition-all duration-1000 delay-1400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-2xl border border-blue-400/30 rounded-3xl p-12">
              <div className="text-center mb-12">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {aboutData.contact.title}
                </h3>
                <p className="text-xl text-gray-300">
                  {aboutData.contact.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-white font-bold mb-2 text-lg">Email</div>
                  <a
                    href={`mailto:${aboutData.contact.email}`}
                    className="text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {aboutData.contact.email}
                  </a>
                </div>

                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 text-teal-400" />
                  </div>
                  <div className="text-white font-bold mb-2 text-lg">Phone</div>
                  <a
                    href={`tel:${aboutData.contact.phone}`}
                    className="text-teal-300 hover:text-teal-200 transition-colors"
                  >
                    {aboutData.contact.phone}
                  </a>
                </div>

                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-400/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-white font-bold mb-2 text-lg">
                    Address
                  </div>
                  <div className="text-gray-300">
                    {aboutData.contact.address}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href={aboutData.contact.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-400 hover:to-purple-600 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-400/50"
                >
                  Connect With Us
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.6;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
