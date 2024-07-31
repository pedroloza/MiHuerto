import React, { useContext, useState } from "react";
import Link from "next/link";
import { Badge, Container } from "reactstrap";
import { useRouter } from "next/router";
import CustomTableData from "@/components/Table/CustomTableData/CustomTableData";
import useSWR, { mutate } from "swr";
import { setQueryStringValue, textEllipsis } from "../../../../utils/utils";
import FormModal from "@/components/FormModal";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import layoutContext from "helper/Layout";
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  removeCategory,
  updateCategory,
} from "../../../../helper/api/categories";
import { ICategory } from "../../../../Types/ICategory";
import CategoryForm from "@/components/Category/CategoryForm";
import Swal from "sweetalert2";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("Crear Rol");
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const page = router.query.page ? Number(router.query.page) : 1;
  const rowPerPage = router.query.rowPerPage
    ? Number(router.query.rowPerPage)
    : 10;

  const [initData, setInitData] = useState<ICategory>({
    _id: "",
    active: false,
    name: "",
    image: "",
    description: "",
  });

  const { showLoadingModal, hideLoadingModal } = useContext(layoutContext);

  const categories = useSWR([`/getAllCategory`, page, rowPerPage], () => {
    showLoadingModal();
    const allCategories = getAllCategory(page, rowPerPage);
    hideLoadingModal();
    return allCategories;
  });

  const category = useSWR(userId ? `/getOneCategory/${userId}` : null, () =>
    getOneCategory(userId!.toString()),
  );

  const columns = [
    {
      name: "Categoría",
      selector: (row: ICategory) => `${row.name}`,
      sortable: true,
      center: false,
    },
    {
      name: "Descripción",
      selector: (row: ICategory) => `${textEllipsis(row.description, 40)}`,
      sortable: true,
      center: false,
    },
    {
      name: "Estado",
      cell: (row: ICategory) =>
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
      cell: (row: ICategory) => (
        <ul className="action">
          <li className="edit">
            <Link
              href="#"
              onClick={() => handleOpenModal("edit", "Editar Rol", row)}
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="remove">
            <Link href="#" onClick={() => handleDeleteCategory(row?._id)}>
              <i className="icon-trash" style={{ color: "red" }} />
            </Link>
          </li>
        </ul>
      ),
      sortable: false,
      center: false,
    },
  ];

  const handleDeleteCategory = (id: string | undefined) => {
    Swal.fire({
      title: "Esta seguro?",
      text: `Esta acción eliminara la categoría y puede causar inconsistencias!`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          removeCategory(id).then((res) => {
            mutate([`/getAllCategory`, page, rowPerPage]);
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
    title = "Crear Categoria",
    data: ICategory = {
      _id: "",
      active: true,
      name: "",
      description: "",
      image: "",
    },
  ) => {
    setUserId(data!._id as string);
    if (action === "create") {
      setIsOpen(true);
    } else {
      setIsOpenEdit(true);
    }
    // setInitData(data);
    setAction(action);
    setTitle(title);
  };

  const onSubmit = async (
    data: ICategory,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<ICategory>,
  ) => {
    setSubmitting(true);
    if (action === "create") {
      const response = await createCategory(data);
      if (response.success) {
        toast.success("Categoria creada correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate([`/getAllCategory`, page, rowPerPage]);
        setIsOpen(false);
        resetForm();
        return;
      }
    }

    if (data._id) {
      const response = await updateCategory(data!._id, data);
      if (response.success) {
        toast.success("Categoria actualizada correctamente");
        setStatus({ success: true });
        setSubmitting(false);
        mutate([`/getAllCategory`, page, rowPerPage]);
        mutate(`/getOneCategory/${data._id}`);
        setIsOpenEdit(false);
        resetForm();
        return;
      }
    }

    setStatus({ success: true });
    setSubmitting(false);
  };

  if (!categories?.data?.data?.data) return null;

  return (
    <div className="page-body">
      <Container fluid={true}>
        <CustomTableData
          title={"Categorias"}
          button={{
            title: "Añadir categoria",
            onClick: () => {
              handleOpenModal("create");
            },
          }}
          columns={columns}
          data={categories.data.data.data}
          paginationTotalRows={categories?.data?.data?.totalCount}
          onChangePage={(page, totalRows) => {
            setQueryStringValue("page", page, router);
          }}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
            setQueryStringValue("rowPerPage", currentRowsPerPage, router);
          }}
          paginationDefaultPage={page}
          paginationPerPage={rowPerPage}
        />

        <FormModal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
          <CategoryForm onSubmit={onSubmit} data={initData} action={action} />
        </FormModal>
        {category?.data?.data && (
          <FormModal
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
            title={title}
          >
            <CategoryForm
              onSubmit={onSubmit}
              data={category?.data?.data}
              action={action}
            />
          </FormModal>
        )}
      </Container>
    </div>
  );
};

export default Index;
