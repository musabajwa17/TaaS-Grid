"use client";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";

// Lightweight plain styles (avoid calling StyleSheet.create at module load)
const plainStyles = {
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: 25,
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginTop: 15,
    paddingBottom: 5,
    borderBottom: "1.5px solid #000",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
    lineHeight: 1.4,
  },
  skillGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillBox: {
    border: "1px solid #000",
    borderRadius: 4,
    padding: "3px 6px",
    margin: 2,
  },
};

// Default export is a small wrapper that lazy-loads the heavy react-pdf renderer
export default function ResumePDFWrapper({ data }) {
  const [PdfComponents, setPdfComponents] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import("@react-pdf/renderer").then((mod) => {
      if (mounted) setPdfComponents(mod);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!PdfComponents) return null; // or a small loader

  const { Document, Page, Text, View } = PdfComponents;

  return (
    <Document>
      <Page size="A4" style={plainStyles.page}>
        <View style={plainStyles.header}>
          <Text style={plainStyles.name}>{data?.name || "Your Name"}</Text>
          {data?.title && <Text>{data.title}</Text>}
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
            {data?.email && <Text>{data.email}</Text>}
            {data?.phone && <Text>• {data.phone}</Text>}
            {data?.location && <Text>• {data.location}</Text>}
          </View>
          {(data?.github || data?.linkedin) && (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 5 }}>
              {data.linkedin && <Text>{data.linkedin}</Text>}
              {data.github && data.linkedin && <Text>•</Text>}
              {data.github && <Text>{data.github}</Text>}
            </View>
          )}
        </View>

        {data?.summary && (
          <View style={plainStyles.section}>
            <Text style={plainStyles.sectionTitle}>Professional Summary</Text>
            <Text style={plainStyles.text}>{data.summary}</Text>
          </View>
        )}

        {data?.experience && data.experience.length > 0 && (
          <View style={plainStyles.section}>
            <Text style={plainStyles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <Text key={i} style={plainStyles.text}>
                {exp}
              </Text>
            ))}
          </View>
        )}

        {data?.education && data.education.length > 0 && (
          <View style={plainStyles.section}>
            <Text style={plainStyles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <Text key={i} style={plainStyles.text}>
                {edu}
              </Text>
            ))}
          </View>
        )}

        {data?.skills && data.skills.length > 0 && (
          <View style={plainStyles.section}>
            <Text style={plainStyles.sectionTitle}>Skills</Text>
            <View style={plainStyles.skillGrid}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={plainStyles.skillBox}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {data?.projects && data.projects.length > 0 && (
          <View style={plainStyles.section}>
            <Text style={plainStyles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold' }}>{proj.name}</Text>
                <Text style={plainStyles.text}>{proj.description}</Text>
                {proj.domain && (
                  <Text style={{ fontSize: 10 }}>
                    Tech: {proj.domain.join(', ')}
                  </Text>
                )}
                {proj.link && (
                  <Text style={{ fontSize: 10, textDecoration: 'underline' }}>
                    {proj.link}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {data?.certifications && data.certifications.length > 0 && (
          <View style={plainStyles.section}>
            <Text style={plainStyles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, i) => (
              <Text key={i} style={plainStyles.text}>
                {cert}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

export async function downloadPDF(cvData) {
  // dynamically import pdf builder to avoid bundling it in initial loads
  const mod = await import("@react-pdf/renderer");
  const { pdf } = mod;
  // create element using React
  const element = React.createElement(ResumePDFWrapper, { data: cvData });
  const blob = await pdf(element).toBlob();
  saveAs(blob, `${(cvData?.name || "resume").replace(/\s+/g, "_")}.pdf`);
}
