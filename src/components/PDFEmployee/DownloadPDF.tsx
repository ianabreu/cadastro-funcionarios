import { ReactNode } from "react";
import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./pdfStyles";

export interface EmployeePDFProps {
  id?: string | undefined;
  firstName: string;
  lastName: string;
  gender: string;
  birth: string;
  address: string;
  phone: string;
  admission: string;
  role: string;
  sector: string;
  wage: string;
  status: string;
  profileURL?: string;
}

interface PDFEmployeeProps {
  data: EmployeePDFProps;
}

export function DownloadPDF({
  data: {
    address,
    admission,
    birth,
    firstName,
    gender,
    lastName,
    phone,
    role,
    sector,
    status,
    wage,
  },
}: PDFEmployeeProps) {
  Font.register({
    family: "Ubuntu",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      },
    ],
  });
  function TextLine({
    label,
    children,
  }: {
    label: string;
    children?: ReactNode;
  }) {
    return (
      <View style={styles.line}>
        <Text style={styles.label}>{label}: </Text>
        <Text style={styles.text}>{children}</Text>
      </View>
    );
  }
  function Section({
    children,
    legend,
  }: {
    children?: ReactNode;
    legend: string;
  }) {
    return (
      <View style={styles.areaInfo}>
        <Text style={styles.legend}>{legend}</Text>
        <View style={{ flexDirection: "row" }}>{children}</View>
      </View>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Dados Do Funcionário</Text>

        <Section legend="Informações de Contato">
          <View style={{ flexDirection: "column", flex: 1, gap: 8 }}>
            <TextLine label="Nome">
              {firstName} {lastName}
            </TextLine>
            <TextLine label="Telefone">{phone}</TextLine>
            <TextLine label="Gênero">{gender}</TextLine>
            <TextLine label="Endereço">{address}</TextLine>
            <TextLine label="Data de Nascimento">{birth}</TextLine>
          </View>
        </Section>

        <Section legend="Informações do Funcionário">
          <View style={{ flexDirection: "column", flex: 1, gap: 8 }}>
            <TextLine label="Cargo">{role}</TextLine>
            <TextLine label="Setor">{sector}</TextLine>
            <TextLine label="Data de Admissão">{admission}</TextLine>
            <TextLine label="Salário">{wage}</TextLine>
            <TextLine label="Status">{status}</TextLine>
          </View>
        </Section>

        <View style={styles.footer}>
          <Text>Documento gerado em: </Text>
          <Text>
            {new Date().toLocaleDateString("pt-br", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
