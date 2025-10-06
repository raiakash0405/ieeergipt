"use client";

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import {
  Trophy,
  Medal,
  Award,
  Clock,
  Globe,
  Star,
  Users,
  Timer,
  Target,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const AnimatedLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchUser, setSearchUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("asc");

  // Generate stable random values for floating particles
  const [floatingParticles] = useState(() => {
    const particles = [];

    // Generate particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 8,
      });
    }

    return particles;
  });

  // Country flag mapping
  const countryFlags = {
    IN: "🇮🇳",
    US: "🇺🇸",
    GB: "🇬🇧",
    CA: "🇨🇦",
    AU: "🇦🇺",
    DE: "🇩🇪",
    FR: "🇫🇷",
    JP: "🇯🇵",
    BR: "🇧🇷",
    KR: "🇰🇷",
    IT: "🇮🇹",
    ES: "🇪🇸",
    NL: "🇳🇱",
    SE: "🇸🇪",
    NO: "🇳🇴",
    FI: "🇫🇮",
    DK: "🇩🇰",
    CH: "🇨🇭",
    AT: "🇦🇹",
  };

  // Load CSV data
  useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        setLoading(true);
        // In a real Next.js app, you'd place the CSV in /public/data/leaderboard.csv
        const response = await axios.get("/data/leaderboard.csv");

        Papa.parse(response.data, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const processedData = results.data.map((row, index) => ({
              ...row,
              id: index,
              Score: parseFloat(row.Score),
              timeInSeconds: timeToSeconds(row.Time),
            }));

            // Sort by time (fastest first) as primary ranking
            const sortedData = processedData.sort((a, b) => {
              // First sort by score (highest first)
              if (b.Score !== a.Score) {
                return b.Score - a.Score;
              }
              // Then by time (fastest first) for same scores
              return a.timeInSeconds - b.timeInSeconds;
            });

            // Assign proper ranks based on combined score and time
            let currentRank = 1;
            sortedData.forEach((item, index) => {
              if (index > 0) {
                const prevItem = sortedData[index - 1];
                if (
                  item.Score !== prevItem.Score ||
                  item.timeInSeconds !== prevItem.timeInSeconds
                ) {
                  currentRank = index + 1;
                }
              }
              item.calculatedRank = currentRank;
            });

            setLeaderboardData(sortedData);
            setFilteredData(sortedData);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("CSV parsing error:", error);
        // Fallback data with proper time-based ranking
        const sampleData = [
          {
            Rank: 1,
            User: "pandeynihal232",
            Score: 110.0,
            Time: "53:07",
            Country: "IN",
            id: 0,
            timeInSeconds: 3187,
            calculatedRank: 1,
          },
          {
            Rank: 2,
            User: "Just_Fluke",
            Score: 110.0,
            Time: "1:11:17",
            Country: "IN",
            id: 1,
            timeInSeconds: 4277,
            calculatedRank: 2,
          },
          {
            Rank: 3,
            User: "codeMaster99",
            Score: 108.5,
            Time: "1:15:22",
            Country: "US",
            id: 2,
            timeInSeconds: 4522,
            calculatedRank: 3,
          },
        ];
        setLeaderboardData(sampleData);
        setFilteredData(sampleData);
        setLoading(false);
      }
    };

    loadLeaderboardData();
  }, []);

  const timeToSeconds = (timeStr) => {
    const parts = timeStr.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      return (
        parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
      );
    }
    return 0;
  };

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...leaderboardData];

    if (searchUser) {
      filtered = filtered.filter((item) =>
        item.User.toLowerCase().includes(searchUser.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [leaderboardData, searchUser]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <Star className="w-5 h-5 text-blue-500" />;
  };

  const getRankBackground = (rank) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600";
    if (rank === 2) return "from-gray-300 to-gray-500";
    if (rank === 3) return "from-amber-400 to-amber-600";
    return "from-blue-500 to-blue-700";
  };

  const getPerformanceBadge = (rank, score) => {
    if (rank === 1) return { text: "CHAMPION", color: "bg-yellow-500" };
    if (rank <= 3) return { text: "ELITE", color: "bg-purple-500" };
    if (rank <= 10) return { text: "PRO", color: "bg-blue-500" };
    if (score >= 100) return { text: "EXPERT", color: "bg-green-500" };
    return { text: "COMPETITOR", color: "bg-gray-500" };
  };

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
          <h2 className="text-2xl font-bold text-white mb-3">
            Loading Leaderboard
          </h2>
          <p className="text-gray-400">Preparing something amazing...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-28 bg-slate-900 p-6 relative overflow-hidden">
      {/* Subtle Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      {/* Floating Particles */}
      {floatingParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        ></div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Clean Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            CodeNex Leaderboard
          </h1>
          <p className="text-xl text-gray-300">Ranked by Performance & Speed</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex gap-3">
            {["All", "Friends", "Top 10"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedFilter === filter
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search username..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="px-6 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 w-80"
            />
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredData.length}
                </div>
                <div className="text-gray-400">Participants</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredData.length > 0
                    ? Math.max(...filteredData.map((d) => d.Score)).toFixed(2)
                    : "0"}
                </div>
                <div className="text-gray-400">Highest Score</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Timer className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredData.length > 0 ? filteredData[0]?.Time : "0:00"}
                </div>
                <div className="text-gray-400">Fastest Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 border-b border-white/10">
            <div className="grid grid-cols-6 gap-4 text-gray-300 font-semibold text-sm uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Rank
              </div>
              <div>User</div>
              <div className="text-center">Score</div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </div>
              <div className="text-center">Country</div>
              <div className="text-center">Status</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
            {filteredData.map((item, index) => {
              const badge = getPerformanceBadge(
                item.calculatedRank,
                item.Score
              );
              return (
                <div
                  key={`${item.id}`}
                  className="grid grid-cols-6 gap-4 p-6 hover:bg-white/5 transition-all duration-300 group"
                >
                  {/* Rank */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankBackground(
                        item.calculatedRank
                      )} flex items-center justify-center shadow-lg`}
                    >
                      {getRankIcon(item.calculatedRank)}
                    </div>
                    <span className="text-2xl font-bold text-white">
                      {item.calculatedRank}
                    </span>
                  </div>

                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.User.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-300">
                        {item.User}
                      </div>
                      <div className="text-gray-400 text-xs">
                        #{item.calculatedRank} Overall
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full border border-green-500/30">
                      <Star className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 font-bold text-lg">
                        {item.Score}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-2 rounded-full border border-blue-500/30">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 font-mono font-semibold">
                        {item.Time}
                      </span>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                      {/* <span className="text-xl">{countryFlags[item.Country] || '🌍'}</span> */}
                      <span className="text-gray-300 font-semibold">
                        {item.Country}
                      </span>
                    </div>
                  </div>

                  {/* Performance Badge */}
                  <div className="text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${badge.color}`}
                    >
                      {badge.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ranking Info */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-2">
            Ranking System
          </h3>
          <p className="text-gray-300 text-sm">
            Rankings are determined first by highest score, then by fastest
            completion time for participants with equal scores. The faster you
            complete with a high score, the higher your rank!
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-15px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translateY(-30px) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translateY(-15px) rotate(270deg) scale(1.05);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-float-slow {
          animation: float-slow ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedLeaderboard;
