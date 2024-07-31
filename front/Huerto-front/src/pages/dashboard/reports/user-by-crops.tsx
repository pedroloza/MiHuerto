import React, { useMemo, useState } from "react";
import { Container, FormGroup, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { downloadCSV, downloadExcel } from "../../../../utils/utils";
import { toast } from "react-toastify";
import { CropReport } from "../../../../Types/Reports";
import { getCultiveById } from "../../../../helper/api/reports";
import format from "date-fns/format";
import { getAllCultivation } from "../../../../helper/api/crops";
import { downloadFormats } from "../../../../utils/constants";

const UserByCrops = () => {
  const router = useRouter();
  const [id, setId] = useState("");

  const crops = useSWR(
    id ? `/getCultivationByUserCultivation/${id}` : null,
    () => getCultiveById(id),
  );
  const cultives = useSWR(`/getAllCultivation`, () => getAllCultivation());

  const columns = [
    {
      name: "Nombre original",
      selector: (row: CropReport) => `${row.id_cultivation.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Nombre del Cultivo",
      selector: (row: CropReport) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Fecha de Plantación",
      selector: (row: CropReport) =>
        ` ${format(new Date(row.dateHarvest), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      selector: (row: CropReport) => `${row.status}`,
      sortable: true,
      center: false,
    },
    {
      name: "Usuario",
      selector: (row: CropReport) => `${row.id_user.username}`,
      sortable: true,
      center: false,
    },
    {
      name: "Ubicación",
      selector: (row: CropReport) => `${row.id_user.parish}`,
      sortable: true,
      center: false,
    },
  ];

  const exportToCSV = (data: any) => {
    if (!data) {
      toast.error("No hay datos disponibles");
      return;
    }

    if (downloadFormat === "CSV") {
      downloadCSV(data, columns, "user-by-crops");
    } else {
      downloadExcel(data, columns, "user-by-crops");
    }
    toast.success("Archivo descargado correctamente!");
  };

  const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const [downloadFormat, setDownloadFormat] = useState("Excel");
  const onFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDownloadFormat(event.target.value);
  };

  const Filters = useMemo(
    () => (
      <div className="filter-container">
        <FormGroup>
          <Label for="user">Cultivo </Label>

          <Input type="select" id="user" onChange={onUserChange}>
            <option value="">Selecciona una opción</option>
            {cultives?.data?.data?.data?.map((user: any, index: number) => (
              <option value={user._id} key={`cultive-key-search-${index}`}>
                {user.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="format">Formato de descarga</Label>

          <Input
            type="select"
            id="format"
            onChange={onFormatChange}
            defaultValue={downloadFormat}
          >
            {downloadFormats.map((format: any, index: number) => (
              <option value={format} key={`format-download-${index}`}>
                {format}
              </option>
            ))}
          </Input>
        </FormGroup>
      </div>
    ),
    [
      cultives,
      cultives?.data,
      cultives?.data?.data,
      cultives?.data?.data?.data,
    ],
  );

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Reporte de Cultivos por usuario"}
          button={{
            title: "Descargar reporte",
            onClick: () => {
              exportToCSV(crops?.data?.data);
            },
          }}
          filterData={cultives?.data?.data?.data}
          filter={Filters}
          columns={columns}
          data={crops?.data?.data}
        />
      </Container>
    </div>
  );
};

export default UserByCrops;
