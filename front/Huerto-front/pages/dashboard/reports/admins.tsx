import React, { useMemo, useState } from "react";
import useSWR from "swr";
import { Container, FormGroup, Input, Label } from "reactstrap";

import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import { downloadCSV, downloadExcel } from "../../../../utils/utils";
import { getAdministrators } from "../../../../helper/api/reports";
import { IAdmin } from "../../../../Types/Reports";
import format from "date-fns/format";
import { toast } from "react-toastify";
import { downloadFormats } from "../../../../utils/constants";

const Admins = () => {
  const admins = useSWR(`/administrators`, () => getAdministrators());

  const columns = [
    {
      name: "Cédula",
      selector: (row: IAdmin) => `${row.dni}`,
      sortable: true,
      center: false,
    },
    {
      name: "Nombre",
      selector: (row: IAdmin) => `${row.name} ${row.lastName}`,
      sortable: true,
      center: false,
    },
    {
      name: "Usuario",
      selector: (row: IAdmin) => `${row.username}`,
      sortable: true,
      center: false,
    },
    {
      name: "Correo",
      selector: (row: IAdmin) => `${row.email}`,
      sortable: true,
      center: false,
    },
    {
      name: "Rol",
      selector: (row: IAdmin) => `${row.idRole.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Teléfono",
      selector: (row: IAdmin) => `${row.phone}`,
      sortable: true,
      center: false,
    },
    {
      name: "Fecha de Creación",
      selector: (row: IAdmin) =>
        `${format(new Date(row.updatedAt), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
    },
  ];

  const exportToCSV = (data: any) => {
    if (downloadFormat === "CSV") {
      downloadCSV(data, columns, "admins");
    } else {
      downloadExcel(data, columns, "admins");
    }
    toast.success("Archivo descargado correctamente!");
  };

  const [downloadFormat, setDownloadFormat] = useState("Excel");
  const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDownloadFormat(event.target.value);
  };

  const Filters = useMemo(
    () => (
      <>
        <FormGroup>
          <Label for="format">Formato de descarga</Label>

          <Input
            type="select"
            id="format"
            onChange={onUserChange}
            defaultValue={downloadFormat}
          >
            {downloadFormats.map((format: any, index: number) => (
              <option value={format} key={`format-download-${index}`}>
                {format}
              </option>
            ))}
          </Input>
        </FormGroup>
      </>
    ),
    [downloadFormats, downloadFormat],
  );

  if (!admins?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Reporte de administradores"}
          button={{
            title: "Descargar reporte",
            onClick: () => exportToCSV(admins?.data?.data),
          }}
          filter={Filters}
          filterData={downloadFormats}
          columns={columns}
          data={admins.data.data}
        />
      </Container>
    </div>
  );
};

export default Admins;
