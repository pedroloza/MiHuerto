import React, { useEffect, useMemo, useState } from "react";
import { Container, FormGroup, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { downloadCSV, downloadExcel } from "../../../../utils/utils";
import { toast } from "react-toastify";
import { getUsersApp } from "../../../../helper/api/users";
import { CultiveUser } from "../../../../Types/Reports";
import { getCropsByUser } from "../../../../helper/api/reports";
import format from "date-fns/format";
import { downloadFormats } from "../../../../utils/constants";
import { getAllCultivation } from "../../../../helper/api/crops";
import { IUserCrop } from "../../../../Types/IUserCrop";

const CropsByUser = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [idCultive, setIdCultive] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const cropsByUser = useSWR(`/user-cultivation/list`, () => getCropsByUser());
  const users = useSWR(`/getAllUsersFarmers`, () => getUsersApp());
  const cultives = useSWR(`/getAllCultivation`, () => getAllCultivation());

  const columns = [
    {
      name: "Usuario",
      cell: (row: CultiveUser) => `${row.userName}`,
      sortable: true,
      center: false,
      width: "170px",
    },
    {
      name: "Cultivo",
      selector: (row: CultiveUser) => `${row.originalCultivationName}`,
      sortable: true,
      center: false,
    },
    {
      name: "Ubicación",
      selector: (row: CultiveUser) => `${row.location}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      selector: (row: CultiveUser) => `${row.status}`,
      sortable: true,
      center: false,
    },
    {
      name: "Fecha de Siembra",
      selector: (row: CultiveUser) =>
        ` ${format(new Date(row.datePlantation), "dd-MM-yyyy")}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      selector: (row: CultiveUser) => `${row.status}`,
      sortable: true,
      center: false,
    },
    {
      name: "Cant. De plantas",
      selector: (row: IUserCrop) => `${row?.harvestNumber ?? "0"}`,
      sortable: true,
      center: false,
      width: "170px",
    },
    {
      name: "Cant. De cosechas",
      selector: (row: IUserCrop) => `${row?.numberCultivation ?? "0"}`,
      sortable: true,
      center: false,
      width: "170px",
    },
  ];

  const exportToCSV = (data: any) => {
    if (!data) {
      toast.error("No hay datos disponibles");
      return;
    }
    if (downloadFormat === "CSV") {
      downloadCSV(data, columns, "crops-by-user");
    } else {
      downloadExcel(data, columns, "crops-by-user");
    }
    toast.success("Archivo descargado correctamente!");
  };

  const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const onCultiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdCultive(event.target.value);
  };

  const [downloadFormat, setDownloadFormat] = useState("Excel");
  const onFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDownloadFormat(event.target.value);
  };

  useEffect(() => {
    if (cropsByUser?.data?.data) {
      setFilteredData(cropsByUser?.data?.data);
    }
  }, [cropsByUser?.data?.data]);

  useEffect(() => {
    let filtered: any = cropsByUser?.data?.data ?? [];
    if (id) {
      filtered = filtered.filter((cultive: any) => cultive.userId === id);
    }
    if (idCultive) {
      filtered = filtered.filter(
        (cultive: any) => cultive.cultiveId === idCultive,
      );
    }

    setFilteredData(filtered);
  }, [id, idCultive, cropsByUser?.data?.data]);

  const Filters = useMemo(
    () => (
      <div className="filter-container">
        <FormGroup>
          <Label for="user">Usuario </Label>

          <Input
            type="select"
            id="user"
            onChange={onUserChange}
            style={{ minWidth: "180px" }}
          >
            <option value="">Todos</option>
            {users?.data?.data?.data?.map((user: any, index: number) => (
              <option value={user._id} key={`user-key-search-${index}`}>
                {user.username}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="user">Cultivo </Label>

          <Input
            type="select"
            id="user"
            onChange={onCultiveChange}
            style={{ minWidth: "180px" }}
          >
            <option value="">Todos</option>
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
            style={{ minWidth: "180px" }}
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
      users,
      users?.data,
      users?.data?.data,
      users?.data?.data?.data,
      downloadFormats,
      downloadFormat,
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
              exportToCSV(filteredData);
            },
          }}
          filterData={[users?.data?.data?.data, cultives?.data?.data?.data]}
          filter={Filters}
          columns={columns}
          data={filteredData}
        />
      </Container>
    </div>
  );
};

export default CropsByUser;
