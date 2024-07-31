import React from "react";
import { Container } from "reactstrap";
import UserForm from "@/components/User/UserForm";
import { UserProps } from "../../../../Types/IUser";
import { FormikHelpers } from "formik";
import { createUser } from "../../../../helper/api/users";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";

const NewUser = () => {
  const router = useRouter();
  const onSubmit = async (
    data: UserProps,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<UserProps>,
  ) => {
    setSubmitting(true);
    const response = await createUser(data);
    if (response.status === "success") {
      toast.success("Usuario creado correctamente");
      setStatus({ success: true });
      setSubmitting(false);
      mutate("/getAllUsers");
      router.push("/dashboard/users");
      // resetForm();
      return;
    }
    setStatus({ success: false });
    setSubmitting(false);
  };
  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle={"Users"}
        parentElement={{ title: "Users", url: "/dashboard/users" }}
        subParent={`Crear Usuario`}
      />
      <Container fluid={true}>
        <UserForm onSubmit={onSubmit} title="Crear Usuario" />
      </Container>
    </div>
  );
};

export default NewUser;
