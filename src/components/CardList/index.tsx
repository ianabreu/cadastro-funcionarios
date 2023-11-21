import { EmployeeProps, StatusProps } from "../../@types/employee";
import EmployeeCard from "../Card";
import EmptyList from "../EmptyList";
import Loading from "../Loading";

interface CardListProps {
  employees: EmployeeProps[] | null;
  isLoading: boolean;
  status: StatusProps;
}
export function CardList({ employees, isLoading, status }: CardListProps) {
  const labelContent = {
    ACTIVE: "Não há funcionários ativos.",
    FIRED: "Nenhum funcionário foi demitido.",
    CONTRACT_END: "Nenhum funcionário teve seu contrato encerrado.",
  };
  return (
    <>
      {isLoading && <Loading />}

      {employees && employees.length === 0 && (
        <EmptyList label={labelContent[status]} />
      )}

      {employees &&
        employees.length > 0 &&
        employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
    </>
  );
}
