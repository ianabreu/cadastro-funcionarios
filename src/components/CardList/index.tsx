import { EmployeeProps } from "../../@types/employee";
import EmployeeCard from "../Card";
import EmptyList from "../EmptyList";
import Loading from "../Loading";

interface CardListProps {
  employees: EmployeeProps[] | null;
  isLoading: boolean;
}
export function CardList({ employees, isLoading }: CardListProps) {
  return (
    <>
      {isLoading && <Loading />}

      {employees && employees.length === 0 && <EmptyList />}

      {employees &&
        employees.length > 0 &&
        employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
    </>
  );
}
