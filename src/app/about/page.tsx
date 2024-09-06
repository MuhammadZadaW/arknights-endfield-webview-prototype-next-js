import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arknights Endfield | About this web",
};

const About = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="About" />
      <div className="flex flex-col gap-10">
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="w-auto p-20">
                <h2 className="font-semibold text-black dark:text-white">
                    About this Web
                </h2>
                <p className="mt-4.5">
                    This website is created for the purpose of learning and understanding web development using NextJS and TailwindCSS. 
                    The data used is sourced from <strong>Arknights: Endfield</strong> to support the creation of this website.
                </p>
                <h3 className="font-semibold text-black dark:text-white pt-10">
                    Source Data
                </h3>
                <p className="mt-1">
                    Official Twitter of <Link href={"https://x.com/AKEndfield"} target="_blank">Arknights: Endfield</Link>
                </p>
                <p>
                    Arknights: Endfield Technical Test Youtube Stream
                </p>
                <h3 className="font-semibold text-black dark:text-white pt-10">
                    Notes
                </h3>
                <p className="mt-1">
                    Unconsistent data, code, etc
                </p>
                <p>
                    Web is static
                </p>
                <h3 className="font-semibold text-black dark:text-white pt-10">
                    Credit
                </h3>
                <p className="mt-1">
                    Thanks to:
                </p>
                <p>
                    <Link href={"https://tailadmin.com/"} target="_blank">TailAdmin Template</Link> as base this project
                </p>
                <h4 className="font-semibold text-black dark:text-white pt-10">
                    Repository
                </h4>
                <p>
                    <Link href={"https://github.com/MuhammadZadaW/arknights-endfield-webview-prototype-next-js"} target="_blank">arknights-endfield-webview-prototype-next-js</Link>
                </p>
            </div>  
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;
