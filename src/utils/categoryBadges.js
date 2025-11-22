import { Briefcase, BookOpen, Lightbulb } from "lucide-react";


export const getCategoryBadge = (cat) => {
if (cat === "job") return { label: "Job", gradient: "from-green-500 to-teal-500", icon: Briefcase };
if (cat === "internship") return { label: "Internship", gradient: "from-teal-500 to-green-500", icon: BookOpen };
if (cat === "fyp") return { label: "FYP Idea", gradient: "from-green-600 to-teal-600", icon: Lightbulb };
return { label: "Unknown", gradient: "from-gray-300 to-gray-400", icon: Briefcase };
};