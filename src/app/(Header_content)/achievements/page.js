"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Award, Users, Sparkles, ChevronRight } from "lucide-react";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch("/data/achievements.json");
        const data = await response.json();
        setAchievements(data.achievements.assign || []);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-500 border-r-cyan-400 rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 border-4 border-t-cyan-400 border-r-blue-500 rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            ></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Loading Events</h2>
          <p className="text-gray-400">Preparing something amazing...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Trophy,
      value: achievements.length + "+",
      label: "Major Achievements",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Award,
      value: "50+",
      label: "Awards & Recognitions",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      value: "1000+",
      label: "Students Impacted",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen pt-28 bg-slate-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0, 94, 244, 0.21),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />

      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-6 pb-16">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm mb-4 ">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Our Success Story
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Our{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Achievements
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Celebrating our journey of excellence, innovation, and impact in the
            world of engineering and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative space-y-4">
                  <div
                    className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <div className="text-4xl font-bold text-slate-100 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
                opacity: 0,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl transform translate-x-20 -translate-y-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-bold text-slate-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {achievement.title}
                    </h3>

                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-700/50 rounded-full">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <span className="text-sm text-slate-300 font-medium">
                        {achievement.date}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Trophy className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed">
                  {achievement.description}
                </p>

                <div className="flex items-center gap-2 text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32" />

          <div className="relative text-center space-y-6">
            <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Join Our Journey
            </h3>

            <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
              Be part of our continued success story. Join IEEE RGIPT and
              contribute to our legacy of excellence.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
