import { Layout } from "@/components/layout/Layout";
import "./errorPage.scss";

const ErrorPage = () => {
  return (
    <Layout>
      <div className="error-page">
        <h1 className="error-message f-title1">문제가 발생했습니다.</h1>
        <p className="error-description f-body2">
          죄송합니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    </Layout>
  );
};

export default ErrorPage;
