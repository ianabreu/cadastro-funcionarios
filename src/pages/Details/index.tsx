import { useContext, useEffect, useState } from "react";
import styles from "./details.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeContext } from "../../contexts/employee";

import { Info } from "../../components/Info";
import { ImageProfile } from "../../components/ImageProfile";
import { EmployeeProps } from "../../@types/employee";
import { Button } from "@mui/material";
import { Edit, CurrencyExchange, GavelOutlined } from "@mui/icons-material";
import Loading from "../../components/Loading";
import { Modal } from "../../components/Modal";

import { InfoContactForm } from "../../components/FormEmployee/InfoContactForm";
import { InfoContactProps, InfoEmployeeProps } from "../../schemas/employee";
import { InfoEmployeeForm } from "../../components/FormEmployee/InfoEmployeeForm";
import { InfoStatusForm } from "../../components/FormEmployee/InfoStatusForm";
import { TypeUpdateProps } from "../../@types/history";
import History from "../../components/History";

export default function Details() {
  const [employee, setEmployee] = useState({} as EmployeeProps);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModalContact, setOpenModalContact] = useState<boolean>(false);
  const [openModalEmployee, setOpenModalEmployee] = useState<boolean>(false);
  const [openModalStatus, setOpenModalStatus] = useState<boolean>(false);

  const { getEmployee } = useContext(EmployeeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const infoContactData: InfoContactProps = {
    id: employee.id,
    address: employee.address,
    birth: employee.birth && employee.birth.split("/").reverse().join("-"),
    firstName: employee.firstName,
    lastName: employee.lastName,
    phone: employee.phone,
    gender: employee.gender,
  };
  const infoEmployeeData: InfoEmployeeProps = {
    id: employee.id,
    admission:
      employee.admission && employee.admission.split("/").reverse().join("-"),
    role: employee.role,
    sector: employee.sector,
    wage: employee.wage,
  };
  useEffect(() => {
    async function loadEmployee() {
      if (id) {
        const response = await getEmployee(id);
        if (!response) {
          return navigate("/");
        }
        if (response) {
          setEmployee(response);
          setLoading(false);
          return;
        }
      } else {
        setLoading(false);
        return;
      }
    }
    loadEmployee();
  }, [getEmployee, id, navigate]);

  function closeModal() {
    setOpenModalContact(false);
    setOpenModalEmployee(false);
    setOpenModalStatus(false);
  }

  function openEdit(type: TypeUpdateProps) {
    if (type === "contact") {
      setOpenModalContact(true);
      return;
    }
    if (type === "promotion") {
      setOpenModalEmployee(true);
      return;
    }
    if (type === "status") {
      setOpenModalStatus(true);
      return;
    }
  }
  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>
            <h1>Detalhes</h1>
            <div>
              <Button
                variant="text"
                size="medium"
                onClick={() => openEdit("status")}
                startIcon={<GavelOutlined />}
              >
                Alterar Status
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => openEdit("promotion")}
                startIcon={<CurrencyExchange />}
              >
                Promover Funcionário
              </Button>
              <Button
                variant="text"
                size="medium"
                onClick={() => openEdit("contact")}
                startIcon={<Edit />}
              >
                Editar Contato
              </Button>
            </div>
          </div>
          <section className={styles.content}>
            <fieldset className={styles.info}>
              <legend>Informações de Contato</legend>
              <div className={styles.row}>
                <div className={styles.col}>
                  <Info label="Nome">
                    {employee.firstName} {employee.lastName}
                  </Info>
                  <Info label="Gênero">{employee.gender}</Info>
                  <Info label="Data de Nascimento">{employee.birth}</Info>
                  <Info label="Telefone">{employee.phone}</Info>
                  <Info label="Endereço">{employee.address}</Info>
                </div>
                <ImageProfile src={employee.profileURL} />
              </div>
            </fieldset>
            <fieldset className={styles.info}>
              <legend>Informações do Funcionário</legend>
              <Info label="Setor">{employee.sector}</Info>
              <Info label="Cargo">{employee.role}</Info>
              <Info label="Data de Admissão">{employee.admission}</Info>
              <Info label="Salário">{employee.wage}</Info>
            </fieldset>
          </section>
          <History idEmployee={id} />

          <>
            <Modal
              isOpen={openModalContact}
              title="Informações de Contato"
              onClose={closeModal}
            >
              <InfoContactForm data={infoContactData} />
            </Modal>
            <Modal
              isOpen={openModalEmployee}
              title="Informações do Funcionário"
              onClose={closeModal}
            >
              <InfoEmployeeForm data={infoEmployeeData} />
            </Modal>
            <Modal
              isOpen={openModalStatus}
              title="Status do Funcionário"
              onClose={closeModal}
            >
              <InfoStatusForm status={employee.status} id={employee.id} />
            </Modal>
          </>
        </>
      )}
    </div>
  );
}
