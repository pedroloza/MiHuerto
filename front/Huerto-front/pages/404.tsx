import CommonErrorPage from "@/components/Others/Error/common/CommonErrorPage";

const NotFound = () => {
  return (
    <CommonErrorPage
      tittle={404}
      tittleClassName="font-danger"
      BtnClassName="btn-danger-gradien"
    />
  );
};

export default NotFound;
