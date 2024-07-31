import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { setQueryStringValue, textEllipsis } from "../../../../utils/utils";
import { ICategory } from "../../../../Types/ICategory";
import {
  getAllCultivation,
  removeCultivation,
} from "../../../../helper/api/crops";
import { ICrop } from "../../../../Types/ICrop";
import Swal from "sweetalert2";

const Index = () => {
  const router = useRouter();

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const crops = useSWR([`/getAllCultivation`, page, rowPerPage], () =>
    getAllCultivation(page, rowPerPage),
  );

  const columns = [
    {
      name: "Nombre",
      selector: (row: ICrop) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: ICrop) => `${textEllipsis(row.description, 50)}`,
      sortable: true,
      center: false,
    },
    {
      name: "Categoría",
      // @ts-ignore
      selector: (row: ICrop) => `${row?.categoryId?.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Temporada",
      selector: (row: ICrop) => `${row.sowingSeason}`,
      sortable: true,
      center: false,
    },
    {
      name: "Clima",
      selector: (row: ICrop) => `${row.thermalFloor}`,
      sortable: true,
      center: false,
    },
    {
      name: "Tiempo de germinación",
      selector: (row: ICrop) => `${row.germinationTime}`,
      sortable: true,
      center: false,
    },
    {
      name: "Tiempo de cosecha",
      selector: (row: ICrop) => `${row.harvestTime}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      cell: (row: ICrop) =>
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
      cell: (row: ICrop) => (
        <ul className="action">
          <li className="edit">
            <Link href={`/dashboard/crops/${row._id}`}>
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="remove">
            <Link href="#" onClick={() => handleDeleteCrop(row?._id)}>
              <i className="icon-trash" style={{ color: "red" }} />
            </Link>
          </li>
        </ul>
      ),
      sortable: false,
      center: false,
    },
  ];

  const handleDeleteCrop = (id: string | undefined) => {
    Swal.fire({
      title: "Esta seguro?",
      text: `Esta acción eliminara el cultivo y puede causar inconsistencias!`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          removeCultivation(id).then((res) => {
            mutate([`/getAllCultivation`, page, rowPerPage]);
            Swal.fire({
              text: "Acción completada con exito!",
              icon: "success",
            });
          });
        }
      }
    });
  };

  if (!crops?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Cultivos"}
          button={{
            title: "Añadir Cultivo",
            onClick: () => {
              router.push("/dashboard/crops/new");
            },
          }}
          columns={columns}
          data={crops.data.data.data}
          progressPending={crops?.isLoading}
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
