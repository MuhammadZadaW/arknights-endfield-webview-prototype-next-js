import Operator from "@/components/Operators/Operator_Details";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Arknights Endfield | Character Details",
};

const CharacterDetails = ({ params }: { params: { operator: string } }) => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Operator Details" />
      <div className="flex flex-col gap-10">
        <Operator operator={params.operator}/>
      </div>
    </DefaultLayout>
  );
};

export default CharacterDetails;
