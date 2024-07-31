import React from "react";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { FormikHelpers } from "formik";

import { getOneCrop, updateCultivation } from "../../../../helper/api/crops";
import { ICrop } from "../../../../Types/ICrop";

import CropForm from "@/components/Crop/CropForm";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs";

const EditCrop = () => {
  const router = useRouter();
  const cultiveId = router?.query?.id;

  const cultive = useSWR(cultiveId ? `/getOneCrop/${cultiveId}` : null, () =>
    getOneCrop(cultiveId!.toString()),
  );

  const onSubmit = async (
    data: ICrop,
    { setErrors, setStatus, setSubmitting, resetForm }: FormikHelpers<ICrop>,
  ) => {
    if (!cultiveId) return;
    setSubmitting(true);
    const response = await updateCultivation(cultiveId as string, data);
    if (response.success) {
      toast.success("Cultivo actualizado correctamente");
      setStatus({ success: true });
      setSubmitting(false);
      mutate("/getAllCultivation");
      mutate(`/getOneCrop/${cultiveId}`);
      router.push("/dashboard/crops");
      resetForm();
      return;
    }
    setStatus({ success: false });
    setSubmitting(false);
  };

  if (!cultive?.data?.data) return null;
  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle={"Cultivos"}
        parentElement={{ title: "Cultivos", url: "/dashboard/crops" }}
        subParent={`${cultive?.data?.data.name}`}
      />
      <Container fluid={true}>
        <CropForm
          onSubmit={onSubmit}
          data={cultive?.data?.data}
          action="edit"
          title="Editar Cultivo"
        />
      </Container>
    </div>
  );
};

export default EditCrop;
