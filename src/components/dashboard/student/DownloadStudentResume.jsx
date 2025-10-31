// "use client";
// import { saveAs } from "file-saver";
// import React, { useEffect, useState } from "react";

// const plainStyles = {
//   page: {
//     backgroundColor: "#ffffff",
//     color: "#000000",
//     padding: 30,
//     fontFamily: "Helvetica",
//     fontSize: 12,
//     lineHeight: 1.5,
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: 15,
//     borderBottom: "2px solid #000",
//     paddingBottom: 10,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   subText: {
//     fontSize: 10,
//     color: "#444",
//   },
//   section: {
//     marginTop: 15,
//     paddingBottom: 5,
//     borderBottom: "1px solid #000",
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 6,
//     textTransform: "uppercase",
//   },
//   text: {
//     marginBottom: 4,
//   },
//   skillGrid: {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 4,
//   },
//   skillBox: {
//     border: "1px solid #000",
//     borderRadius: 4,
//     padding: "2px 5px",
//     margin: 2,
//   },
// };

// export default function DownloadStudentResumeWrapper({ data }) {
//   const [Pdf, setPdf] = useState(null);

//   // Dynamically import react-pdf
//   useEffect(() => {
//     let mounted = true;
//     import("@react-pdf/renderer").then((mod) => {
//       if (mounted) setPdf(mod);
//     });
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   if (!Pdf) return null;

//   const { Document, Page, Text, View } = Pdf;

//   return (
//     <Document>
//       <Page size="A4" style={plainStyles.page}>
//         {/* Header */}
//         {/* <View style={plainStyles.header}>
//           <Text style={plainStyles.name}>{data?.name || "Your Name"}</Text>
//           {data?.title && <Text>{data.title}</Text>}
//           {(data?.email || data?.phone || data?.location) && (
//             <Text style={plainStyles.subText}>
//               {[data.email, data.phone, data.location].filter(Boolean).join(" | ")}
//             </Text>
//           )}
//         </View> */}

//         {/* Summary */}
//         {/* {data?.summary && (
//           <View style={plainStyles.section}>
//             <Text style={plainStyles.sectionTitle}>Summary</Text>
//             <Text style={plainStyles.text}>{data.summary}</Text>
//           </View>
//         )} */}

//         {/* Experience */}
//         {/* {data?.experience?.length > 0 && (
//           <View style={plainStyles.section}>
//             <Text style={plainStyles.sectionTitle}>Experience</Text>
//             {data.experience.map((exp, i) => (
//               <View key={i}>
//                 <Text style={plainStyles.text}>
//                   <Text style={{ fontWeight: "bold" }}>{exp.role}</Text>
//                   {exp.company ? ` at ${exp.company}` : ""}
//                   {exp.years ? ` (${exp.years})` : ""}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         )} */}

//         {/* Education */}
//         {/* {data?.education?.length > 0 && (
//           <View style={plainStyles.section}>
//             <Text style={plainStyles.sectionTitle}>Education</Text>
//             {data.education.map((edu, i) => (
//               <View key={i}>
//                 <Text style={plainStyles.text}>
//                   <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
//                   {edu.institution ? ` - ${edu.institution}` : ""}
//                   {edu.year ? ` (${edu.year})` : ""}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         )} */}

//         {/* Projects */}
//         {/* {data?.projects?.length > 0 && (
//           <View style={plainStyles.section}>
//             <Text style={plainStyles.sectionTitle}>Projects</Text>
//             {data.projects.map((proj, i) => (
//               <View key={i}>
//                 <Text style={plainStyles.text}>
//                   <Text style={{ fontWeight: "bold" }}>{proj.name}</Text>
//                   {proj.domain ? ` (${proj.domain})` : ""}
//                 </Text>
//                 {proj.description && <Text>- {proj.description}</Text>}
//                 {proj.link && <Text>🔗 {proj.link}</Text>}
//               </View>
//             ))}
//           </View>
//         )} */}

// {/* Certifications */}
// {/* {Array.isArray(data?.certifications) && data.certifications.length > 0 && (
//   <View style={plainStyles.section} wrap={false}>
//     <Text style={plainStyles.sectionTitle}>Certifications</Text>
//     {data.certifications.map((cert, i) => (
//       <View key={i} style={{ marginBottom: 4, marginLeft: 8 }}>
//         <Text style={plainStyles.text}>• {cert?.name || "Certification"}</Text>
//       </View>
//     ))}
//   </View>
// )} */}

// {/* Skills */}
// {/* {Array.isArray(data?.skills) && data.skills.length > 0 && (
//   <View style={plainStyles.section} wrap={false}>
//     <Text style={plainStyles.sectionTitle}>Skills</Text>
//     <View
//       style={{
//         flexDirection: "row",
//         flexWrap: "wrap",
//         marginTop: 5,
//       }}
//     >
//       {data.skills.map((skill, i) => (
//         <View
//           key={i}
//           style={{
//             borderWidth: 1,
//             borderColor: "#000",
//             borderRadius: 4,
//             paddingVertical: 2,
//             paddingHorizontal: 5,
//             marginRight: 5,
//             marginBottom: 5,
//           }}
//         >
//           <Text>{skill}</Text>
//         </View>
//       ))}
//     </View>
//   </View>
// )} */}


//       </Page>
//     </Document>
//   );
// }

// /* Download handler */
// export async function downloadPDF(cvData) {
//   const mod = await import("@react-pdf/renderer");
//   const { pdf } = mod;
//   const element = React.createElement(DownloadStudentResumeWrapper, { data: cvData });
//   const blob = await pdf(element).toBlob();
//   const filename = `${(cvData?.name || "resume").replace(/\s+/g, "_")}.pdf`;
//   saveAs(blob, filename);
// }


"use client";
import { saveAs } from "file-saver";
import React from "react";
import { Document, Page, Text, View, pdf } from "@react-pdf/renderer";

const plainStyles = {
  page: { backgroundColor: "#fff", color: "#000", padding: 30, fontFamily: "Helvetica", fontSize: 12, lineHeight: 1.5 },
  header: { textAlign: "center", marginBottom: 15, borderBottom: "2px solid #000", paddingBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  subText: { fontSize: 10, color: "#444" },
  section: { marginTop: 15, paddingBottom: 5, borderBottom: "1px solid #000" },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 6, textTransform: "uppercase" },
  text: { marginBottom: 4 },
};

export default function DownloadStudentResumeWrapper({ data }) {
  return (
    <Document>
      <Page size="A4" style={plainStyles.page}>
        {/* <View style={plainStyles.header}>
          <Text style={plainStyles.name}>{data?.name || "Your Name"}</Text>
          {data?.title && <Text>{data.title}</Text>}
          {(data?.email || data?.phone || data?.location) && (
            <Text style={plainStyles.subText}>
              {[data.email, data.phone, data.location].filter(Boolean).join(" | ")}
            </Text>
          )}
        </View> */}
        {/* Add other sections as needed */}
      </Page>
    </Document>
  );
}

/* Download handler */
export async function downloadPDF(cvData) {
  const element = <DownloadStudentResumeWrapper data={cvData} />;
  const blob = await pdf(element).toBlob(); // uses static import
  const filename = `${(cvData?.name || "resume").replace(/\s+/g, "_")}.pdf`;
  saveAs(blob, filename);
}
