"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, Building2, Award } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      number: "50,000+",
      label: "Active Jobs",
      icon: <Briefcase className="w-10 h-10 text-[#00bb98]" />,
    },
    {
      id: 2,
      number: "25,000+",
      label: "Successful Placements",
      icon: <Award className="w-10 h-10 text-[#00bb98]" />,
    },
    {
      id: 3,
      number: "1,200+",
      label: "Partner Companies",
      icon: <Building2 className="w-10 h-10 text-[#00bb98]" />,
    },
    {
      id: 4,
      number: "100,000+",
      label: "Registered Professionals",
      icon: <Users className="w-10 h-10 text-[#00bb98]" />,
    },
  ];

  return (
    <section className="w-full bg-[#f4f8fd] py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 text-center border border-gray-100 hover:border-[#00bb98]/30"
          >
            <div className="flex items-center justify-center mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-extrabold text-black mb-1">{stat.number}</h3>
            <p className="text-gray-600 font-medium">{stat.label}</p>
            <div className="mt-4 h-1 w-12 bg-[#00bb98] mx-auto rounded-full"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
