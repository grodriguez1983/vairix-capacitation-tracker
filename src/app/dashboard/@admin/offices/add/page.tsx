import { addOffice } from "@/lib/actions";

const AddOfficePage = () => {
  return (
    <div className="leading-loose text-black flex justify-center">
      <form
        action={addOffice}
        className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
      >
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-10"
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Type</label>
          <select
            className="w-full px-4 py-1 text-gray-700 bg-gray-200 rounded h-10"
            name="type"
            id="type"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <button
          className="px-4 py-1 text-white font-light mt-4 tracking-wider bg-gray-900 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddOfficePage;
