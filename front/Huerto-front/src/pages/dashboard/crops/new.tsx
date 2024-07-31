import React from "react";
import { Container } from "reactstrap";
import { FormikHelpers } from "formik";
import { ICrop } from "../../../../Types/ICrop";
import CropForm from "@/components/Crop/CropForm";
import { createCultivation } from "../../../../helper/api/crops";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useRouter } from "next/router";
import { initialCultiveData } from "../../../../utils/constants";

const NewCrop = () => {
  const router = useRouter();
  const onSubmit = async (
    data: ICrop,
    { setErrors, setStatus, setSubmitting, resetForm }: FormikHelpers<ICrop>,
  ) => {
    setSubmitting(true);
    const response = await createCultivation(data);
    if (response.success) {
      toast.success("Cultivo correctamente");
      setStatus({ success: true });
      setSubmitting(false);
      mutate("/getAllCultivation");
      router.push("/dashboard/crops");
      resetForm();
      return;
    }
    setStatus({ success: false });
    setSubmitting(false);
  };
  return (
    <div className="page-body">
      <Container fluid={true}>
        <CropForm onSubmit={onSubmit} title="Editar Cultivo" />
      </Container>
    </div>
  );
};

export default NewCrop;
