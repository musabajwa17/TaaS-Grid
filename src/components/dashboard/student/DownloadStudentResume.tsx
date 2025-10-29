"use client";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";

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

type CVData = {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  experience?: string[];
  education?: string[];
  skills?: string[];
};

export default function DownloadStudentResumeWrapper({ data }: { data?: CVData | null }) {
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

  if (!PdfComponents) return null;

  const { Document, Page, Text, View } = PdfComponents;

  return (
    <Document>
      <Page size="A4" style={plainStyles.page as any}>
        <View style={plainStyles.header as any}>
          <Text style={plainStyles.name as any}>{data?.name || "Your Name"}</Text>
          {data?.title && <Text>{data.title}</Text>}
          {data?.email && <Text>{data.email}</Text>}
          {data?.phone && <Text>{data.phone}</Text>}
        </View>

        {data?.experience && (
          <View style={plainStyles.section as any}>
            <Text style={plainStyles.sectionTitle as any}>Experience</Text>
            {data.experience.map((exp: string, i: number) => (
              <Text key={i} style={plainStyles.text as any}>
                {exp}
              </Text>
            ))}
          </View>
        )}

        {data?.education && (
          <View style={plainStyles.section as any}>
            <Text style={plainStyles.sectionTitle as any}>Education</Text>
            {data.education.map((edu: string, i: number) => (
              <Text key={i} style={plainStyles.text as any}>
                {edu}
              </Text>
            ))}
          </View>
        )}

        {data?.skills && data.skills.length > 0 && (
          <View style={plainStyles.section as any}>
            <Text style={plainStyles.sectionTitle as any}>Skills</Text>
            <View style={plainStyles.skillGrid as any}>
              {data.skills.map((skill: string, i: number) => (
                <Text key={i} style={plainStyles.skillBox as any}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}

export async function downloadPDF(cvData: CVData) {
  const mod = await import("@react-pdf/renderer");
  const { pdf } = mod as any;
  const element = React.createElement(DownloadStudentResumeWrapper, { data: cvData });
  const blob = await pdf(element).toBlob();
  saveAs(blob, `${(cvData?.name || "resume").replace(/\s+/g, "_")}.pdf`);
}
