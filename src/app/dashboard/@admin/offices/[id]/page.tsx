import UpdateForm from "@/components/Office/UpdateForm";
import { fetchOffice } from "@/lib/data";

interface Params {
  id: string;
}

const SingleOfficePage = async ({ params }: { params: Params }) => {
  const { id } = params;
  const office = await fetchOffice(id);

  if (!office) {
    // FIXME: Handle the case where office is null
    return <div>Loading...</div>;
  }

  return (
    <div className="leading-loose text-black flex justify-center">
        <UpdateForm office={office}/>
    </div>
  );
};

export default SingleOfficePage;
