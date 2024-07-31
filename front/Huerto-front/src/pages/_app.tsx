import "../../public/assets/scss/app.scss";
import { useRouter } from "next/router";
import { withoutLayoutThemePath } from "Data/OthersPageData";
import { ToastContainer } from "react-toastify";
import { ProjectProvider } from "helper/project/ProjectProvider";
import "../../i18n";
import "../../public/assets/scss/app.scss";
import LayoutProvider from "helper/Layout/LayoutProvider";
import Layout from "../layout";
import { BookmarkProvider } from "helper/Bookmark/BookmarkProvider";
import { CustomizerProvider } from "helper/Customizer/CustomizerProvider";
import TodoListProvider from "helper/TodoList/TodoListProvider";
import ContactProvider from "helper/Contacts/ContactProvider";
import NoSsr from "utils/NoSsr";
import UserProvider from "../../helper/User/UserProvider";
import { useContext } from "react";
import layoutContext from "helper/Layout";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import "leaflet/dist/leaflet.css";

const Myapp = ({ Component, pageProps }: any) => {
  const getLayout =
    Component.getLayout || ((page: any) => <Layout>{page}</Layout>);
  const router = useRouter();
  const currentUrl = router.asPath;
  let updatedPath;
  if (currentUrl.includes("?")) {
    const tempt = currentUrl;
    updatedPath = tempt.split("?")[0];
  } else {
    updatedPath = currentUrl;
  }

  const { isLoading } = useContext(layoutContext);

  return (
    <NoSsr>
      {withoutLayoutThemePath.includes(updatedPath) ? (
        <Component {...pageProps} />
      ) : (
        <LayoutProvider>
          <UserProvider>
            <CustomizerProvider>
              <TodoListProvider>
                <ProjectProvider>
                  <BookmarkProvider>
                    <ContactProvider>
                      {getLayout(<Component {...pageProps} />)}
                    </ContactProvider>
                  </BookmarkProvider>
                </ProjectProvider>
              </TodoListProvider>
            </CustomizerProvider>
          </UserProvider>
        </LayoutProvider>
      )}
      <ToastContainer />
      {isLoading ? <LoadingModal /> : null}
    </NoSsr>
  );
};

export default Myapp;
