import Operators from "@/components/Operators/Operators";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Arknights Endfield | Character",
};

const CharactersPage = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Operators" />
      <div className="flex flex-col gap-10">
        <Operators />
      </div>
    </DefaultLayout>
  );
};

export default CharactersPage;
