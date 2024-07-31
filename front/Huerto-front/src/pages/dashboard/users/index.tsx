import React, { useEffect, useState } from "react";
import { Badge, Container } from "reactstrap";
import { AddNewUser, Users } from "utils/Constant";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import { UserProps } from "../../../../Types/IUser";
import Link from "next/link";
import useSWR from "swr";
import { getUsersPortal } from "../../../../helper/api/users";
import { setQueryStringValue } from "../../../../utils/utils";

const Index = () => {
  const router = useRouter();

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const {
    data: users,
    error,
    isLoading,
  } = useSWR([`/getAllUsers`, page, rowPerPage], () =>
    getUsersPortal(page, rowPerPage),
  );

  const columns = [
    {
      name: "Cédula",
      selector: (row: UserProps) => `${row.dni}`,
      sortable: true,
      center: false,
    },
    {
      name: "Nombre",
      selector: (row: UserProps) => `${row.name} ${row.lastName} `,
      sortable: true,
      center: false,
    },
    {
      name: "Username",
      selector: (row: UserProps) => `${row.username}`,
      sortable: true,
      center: false,
    },
    {
      name: "Email",
      selector: (row: UserProps) => `${row.email}`,
      sortable: true,
      center: false,
    },
    {
      name: "Parroquia",
      selector: (row: UserProps) => `${row.parish}`,
      sortable: true,
      center: false,
    },
    {
      name: "Rol",
      selector: (row: UserProps) => `${row.idRole?.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      cell: (row: UserProps) =>
        row.active ? (
          <Badge color="success">Activo</Badge>
        ) : (
          <Badge color="danger">Desactivado</Badge>
        ),

      sortable: true,
      center: false,
    },
    {
      name: "Acción",
      cell: (row: UserProps) => (
        <ul className="action">
          <li className="edit">
            <Link href={`/dashboard/users/${row._id}`}>
              <i className="icon-pencil-alt" />
            </Link>
          </li>
        </ul>
      ),
      sortable: true,
      center: false,
    },
  ];

  if (!users?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={Users}
          button={{
            title: AddNewUser,
            onClick: () => {
              router.push("/dashboard/users/new");
            },
          }}
          columns={columns}
          data={users.data.data}
          paginationTotalRows={users?.data?.totalCount}
          onChangePage={(page, totalRows) => {
            setQueryStringValue("page", page, router);
          }}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
            setQueryStringValue("rowPerPage", currentRowsPerPage, router);
          }}
          paginationDefaultPage={page}
          paginationPerPage={rowPerPage}
        />
      </Container>
    </div>
  );
};

export default Index;
