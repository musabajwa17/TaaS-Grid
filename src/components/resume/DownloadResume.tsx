"use client";
import { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import React from "react";

// 🧩 Styles similar to your html2pdf layout
const styles = StyleSheet.create({
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
});

// 🧠 PDF Document Component
type CVData = {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  experience?: string[];
  education?: string[];
  skills?: string[];
};

const ResumePDF: React.FC<{ data?: CVData | null }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{data?.name || "Your Name"}</Text>
        {data?.title && <Text>{data.title}</Text>}
        {data?.email && <Text>{data.email}</Text>}
        {data?.phone && <Text>{data.phone}</Text>}
      </View>

      {/* EXPERIENCE */}
      {data?.experience && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp: string, i: number) => (
            <Text key={i} style={styles.text}>
              {exp}
            </Text>
          ))}
        </View>
      )}

      {/* EDUCATION */}
      {data?.education && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu: string, i: number) => (
            <Text key={i} style={styles.text}>
              {edu}
            </Text>
          ))}
        </View>
      )}

      {/* SKILLS */}
      {data?.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillGrid}>
            {data.skills.map((skill: string, i: number) => (
              <Text key={i} style={styles.skillBox}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export async function downloadPDF(cvData : CVData) {
  const blob = await pdf(<ResumePDF data={cvData} />).toBlob();
  saveAs(blob, `${(cvData?.name || "resume").replace(/\s+/g, "_")}.pdf`);
}

export default ResumePDF;
