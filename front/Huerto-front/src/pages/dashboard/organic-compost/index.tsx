import React, { useEffect, useState } from "react";
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
import {
  createOrganicFertiliser,
  editOrganicFertiliser,
  getAllOrganicFertiliser,
  getOneOrganicFertiliser,
  removeOrganicFertiliser,
} from "../../../../helper/api/organic-fertilizer";
import Swal from "sweetalert2";
import { removeCategory } from "../../../../helper/api/categories";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("Crear fertilizante");
  const router = useRouter();
  const [id, setId] = useState("");

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const fertiliser = useSWR(
    [`/getAllOrganicFertiliser`, page, rowPerPage],
    () => getAllOrganicFertiliser(page, rowPerPage),
  );

  const selectedFertiliser = useSWR(
    id ? `/getOneOrganicFertiliser/${id}` : null,
    () => getOneOrganicFertiliser(id!.toString()),
  );

  const columns = [
    {
      name: "Abono Orgánicos",
      selector: (row: IProtection) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: IProtection) => `${textEllipsis(row.description, 60)}`,
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
                handleOpenModal("edit", "Editar fertilizante", row)
              }
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="remove">
            <Link href="#" onClick={() => handleDeleteOrganicCompost(row?._id)}>
              <i className="icon-trash" style={{ color: "red" }} />
            </Link>
          </li>
        </ul>
      ),
      sortable: false,
      center: false,
    },
  ];

  const handleDeleteOrganicCompost = (id: string | undefined) => {
    Swal.fire({
      title: "Esta seguro?",
      text: `Esta acción eliminara el abono orgánico y puede causar inconsistencias!`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          removeOrganicFertiliser(id).then((res) => {
            mutate([`/getAllOrganicFertiliser`, page, rowPerPage]);
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
    title = "Crear fertilizante organico",
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
      const response = await createOrganicFertiliser(data);
      if (response.success) {
        toast.success("Abono organico creado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate([`/getAllOrganicFertiliser`, page, rowPerPage]);
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    if (data._id) {
      const response = await editOrganicFertiliser(data!._id, data);
      if (response.success) {
        toast.success("Fertilizante organico actualizado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate([`/getAllOrganicFertiliser`, page, rowPerPage]);
        mutate(`/getOneOrganicFertiliser/${data._id}`);
        setIsOpenEdit(false);
        resetForm();
        return;
      }
    }

    setStatus({ success: true });
    setSubmitting(false);
  };

  if (!fertiliser?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Abono Orgánicos"}
          button={{
            title: "Añadir abono orgánico",
            onClick: () => {
              handleOpenModal("create");
            },
          }}
          columns={columns}
          data={fertiliser.data.data.data}
          paginationTotalRows={fertiliser?.data?.data?.totalCount}
          onChangePage={(page, totalRows) => {
            setQueryStringValue("page", page, router);
          }}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
            setQueryStringValue("rowPerPage", currentRowsPerPage, router);
          }}
          paginationDefaultPage={page}
          paginationPerPage={rowPerPage}
        />

        <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <ProtectionForm onSubmit={onSubmit} title={title} action={action} />
        </FormModal>
        {selectedFertiliser?.data?.data && (
          <FormModal
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
            title={title}
          >
            <ProtectionForm
              onSubmit={onSubmit}
              data={selectedFertiliser?.data?.data}
              action={action}
            />
          </FormModal>
        )}
      </Container>
    </div>
  );
};

export default Index;
