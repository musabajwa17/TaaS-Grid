export const getStatusColor = (status) => {
if (status === "Active") return "bg-gradient-to-r from-green-500 to-teal-500 text-white";
if (status === "Pending") return "bg-gradient-to-r from-teal-400 to-green-400 text-white";
if (status === "Closed") return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
return "bg-gray-200 text-gray-700";
};