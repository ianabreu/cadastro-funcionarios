import styles from "./card.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Info } from "../Info";
import { ImageProfile } from "../ImageProfile";
import { EmployeeProps, STATUS } from "../../@types/employee";
import { ListOutlined, PictureAsPdfOutlined } from "@mui/icons-material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadPDF, EmployeePDFProps } from "../PDFEmployee/DownloadPDF";
interface EmployeeCardProps {
  employee: EmployeeProps;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const navigate = useNavigate();

  const data: EmployeePDFProps = {
    ...employee,
    id: employee.id,
    status: STATUS[employee.status as keyof typeof STATUS],
  };
  function goToDetails(id: string | undefined) {
    if (id === undefined) {
      toast.error("Erro ao acessar o item");
    } else {
      navigate(`/funcionario/detalhes/${id}`);
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.row}>
        <ImageProfile src={employee.profileURL} small />
        <div className={styles.content}>
          <Info small label="Nome">
            {employee.firstName} {employee.lastName}
          </Info>
          <Info small label="Cargo">
            {employee.role}
          </Info>
          <Info small label="Setor">
            {employee.sector}
          </Info>
          <Info small label="Data de Admissão">
            {employee.admission}
          </Info>
        </div>
      </div>

      <div className={styles.buttonArea}>
        <PDFDownloadLink
          document={<DownloadPDF data={data} />}
          fileName={`download-${data.firstName}.pdf`}
          style={{ width: "100%" }}
        >
          <Button
            variant="contained"
            size="small"
            color="warning"
            endIcon={<PictureAsPdfOutlined />}
            fullWidth
          >
            Download
          </Button>
        </PDFDownloadLink>

        <Button
          variant="contained"
          size="small"
          onClick={() => goToDetails(employee.id)}
          endIcon={<ListOutlined />}
          fullWidth
        >
          Detalhes
        </Button>
      </div>
    </section>
  );
}
