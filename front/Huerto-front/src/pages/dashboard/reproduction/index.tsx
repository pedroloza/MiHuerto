import React, { useState } from "react";
import Link from "next/link";
import { Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { setQueryStringValue, textEllipsis } from "../../../../utils/utils";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import ProtectionForm from "@/components/Protection/ProtectionForm";
import FormModal from "@/components/FormModal";
import { IProtection } from "../../../../Types/IProtection";
import { updatePlague } from "../../../../helper/api/plague";
import {
  createReproduction,
  editReproduction,
  getAllReproductions,
  getOneReproduction,
  removeReproduction,
} from "../../../../helper/api/reproduction";
import Swal from "sweetalert2";
import { removeCategory } from "../../../../helper/api/categories";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("Crear plaga");
  const router = useRouter();
  const [id, setId] = useState("");

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const reproductions = useSWR([`/getAllReproductions`, page, rowPerPage], () =>
    getAllReproductions(page, rowPerPage),
  );

  const selectedReproduction = useSWR(
    id ? `/getOneReproduction/${id}` : null,
    () => getOneReproduction(id!.toString()),
  );

  const columns = [
    {
      name: "Metodo de reproducción",
      selector: (row: IProtection) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: IProtection) => `${textEllipsis(row.description, 50)}`,
      sortable: true,
      center: false,
    },
    {
      name: "Acción",
      cell: (row: IProtection) => (
        <ul className="action">
          <li className="edit">
            <Link
              href="#"
              onClick={() =>
                handleOpenModal("edit", "Editar método de reproducción", row)
              }
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="remove">
            <Link href="#" onClick={() => handleDeleteReproduction(row?._id)}>
              <i className="icon-trash" style={{ color: "red" }} />
            </Link>
          </li>
        </ul>
      ),
      sortable: false,
      center: false,
    },
  ];

  const handleDeleteReproduction = (id: string | undefined) => {
    Swal.fire({
      title: "Esta seguro?",
      text: `Esta acción eliminara el método de reproducción y puede causar inconsistencias!`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          removeReproduction(id).then((res) => {
            mutate([`/getAllReproductions`, page, rowPerPage]);
            Swal.fire({
              text: "Acción completada con exito!",
              icon: "success",
            });
          });
        }
      }
    });
  };

  const handleOpenModal = (
    action: string,
    title = "Crear método de reproducción",
    data: IProtection = {
      _id: "",
      name: "",
      description: "",
      image: "",
    },
  ) => {
    setId(data!._id as string);
    if (action === "create") {
      setIsOpen(true);
    } else {
      setIsOpenEdit(true);
    }
    setAction(action);
    setTitle(title);
  };
  const onSubmit = async (
    data: IProtection,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<IProtection>,
  ) => {
    setSubmitting(true);
    if (action === "create") {
      const response = await createReproduction(data);
      if (response.success) {
        toast.success("Método de reproducción creado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate([`/getAllReproductions`, page, rowPerPage]);
        setIsOpen(false);
        resetForm();
        return;
      }
      toast.error("Error al crear el metodo de reproducción");
    }

    if (data._id) {
      const response = await editReproduction(data!._id, data);
      if (response.success) {
        toast.success("Método de reproducción actualizado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate([`/getAllReproductions`, page, rowPerPage]);
        mutate(`/getOneReproduction/${data._id}`);
        setIsOpenEdit(false);
        resetForm();
        return;
      }
      toast.error("Error al actualizar el metodo de reproducción");
    }

    setStatus({ success: true });
    setSubmitting(false);
  };

  if (!reproductions?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Método de reproducción"}
          button={{
            title: "Añadir método de reproducción",
            onClick: () => {
              handleOpenModal("create");
            },
          }}
          columns={columns}
          data={reproductions.data.data.data}
          paginationTotalRows={reproductions?.data?.data?.totalCount}
          onChangePage={(page, totalRows) => {
            setQueryStringValue("page", page, router);
          }}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
            setQueryStringValue("rowPerPage", currentRowsPerPage, router);
          }}
          paginationDefaultPage={page}
          paginationPerPage={rowPerPage}
        />

        <FormModal title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
          <ProtectionForm onSubmit={onSubmit} title={title} action={action} />
        </FormModal>
        {selectedReproduction?.data?.data && (
          <FormModal
            title={title}
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
          >
            <ProtectionForm
              onSubmit={onSubmit}
              data={selectedReproduction?.data?.data}
              action={action}
            />
          </FormModal>
        )}
      </Container>
    </div>
  );
};

export default Index;
