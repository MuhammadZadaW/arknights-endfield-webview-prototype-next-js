import Characters from "@/components/Operators/Operators";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Arknights Endfield | Character",
};

export default function Home() {

  redirect("/operators")

  return (
    <>
      <DefaultLayout>
        <Characters />
      </DefaultLayout>
    </>
  );
}
