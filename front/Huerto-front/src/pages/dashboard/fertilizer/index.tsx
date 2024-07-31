import React, { useState } from "react";
import Link from "next/link";
import { Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { setQueryStringValue, textEllipsis } from "../../../../utils/utils";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import {
  createFertiliser,
  getAllFertiliser,
  getOneFertiliser,
  removeFertilizer,
  updateFertiliser,
} from "../../../../helper/api/fertilizer";
import ProtectionForm from "@/components/Protection/ProtectionForm";
import FormModal from "@/components/FormModal";
import { IProtection } from "../../../../Types/IProtection";
import Swal from "sweetalert2";
import { removeCategory } from "../../../../helper/api/categories";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("Crear fertilizante");
  const router = useRouter();
  const [id, setId] = useState("");

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const fertiliser = useSWR([`/getAllFertiliser`, page, rowPerPage], () =>
    getAllFertiliser(page, rowPerPage),
  );

  const selectedFertiliser = useSWR(id ? `/getOneFertiliser/${id}` : null, () =>
    getOneFertiliser(id!.toString()),
  );

  const columns = [
    {
      name: "Fertilizante Inorgánico",
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
            <Link href="#" onClick={() => handleDeleteFertilizer(row?._id)}>
              <i className="icon-trash" style={{ color: "red" }} />
            </Link>
          </li>
        </ul>
      ),
      sortable: false,
      center: false,
    },
  ];

  const handleOpenModal = (
    action: string,
    title = "Crear fertilizante",
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
      const response = await createFertiliser(data);
      if (response.success) {
        toast.success("Fertilizante creado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate([`/getAllFertiliser`, page, rowPerPage]);
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    if (data._id) {
      const response = await updateFertiliser(data!._id, data);
      if (response.success) {
        toast.success("Fertilizante actualizado correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate([`/getAllFertiliser`, page, rowPerPage]);
        mutate(`/getOneFertiliser/${data._id}`);
        setIsOpenEdit(false);
        resetForm();
        return;
      }
    }

    setStatus({ success: true });
    setSubmitting(false);
  };

  const handleDeleteFertilizer = (id: string | undefined) => {
    Swal.fire({
      title: "Esta seguro?",
      text: `Esta acción eliminara el fertilizante y puede causar inconsistencias!`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          removeFertilizer(id).then((res) => {
            mutate([`/getAllFertiliser`, page, rowPerPage]);
            Swal.fire({
              text: "Acción completada con exito!",
              icon: "success",
            });
          });
        }
      }
    });
  };

  if (!fertiliser?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Fertilizantes Inorgánicos"}
          button={{
            title: "Añadir fertilizante Inorgánicos",
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
