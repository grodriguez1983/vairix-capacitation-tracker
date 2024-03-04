import { updateOffice } from "@/lib/actions";
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
      <form
        action={updateOffice}
        className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
      >
        <input type="hidden" name="id" value={office.id} />
        <div className="mb-4">
          <label className="block text-sm  mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder={office.name}
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Type</label>
          <select
            name="type"
            id="type"
            className="w-full px-4 py-1 text-gray-700 bg-gray-200 rounded h-10"
          >
            <option selected={office.type === "small"} value="small">
              Small
            </option>
            <option selected={office.type === "medium"} value="medium">
              Medium
            </option>
            <option selected={office.type === "large"} value="large">
              Large
            </option>
          </select>
        </div>
        <button className="px-4 py-1 text-white font-light mt-4 tracking-wider bg-gray-900 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default SingleOfficePage;
