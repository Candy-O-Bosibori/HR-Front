import { BiSearch } from "react-icons/bi";

export const Search = ({ search, setSearch }) => {
  return (
    <div className="relative mb-10 text-center lg:text-left items-center lg:items-start sm:mx-auto w-50 lg:w-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <BiSearch className="text-Heading dark:text-primary-light" />
      </div>
      <input
        className="w-full pl-10 pr-3 py-3 bg-variant1-light dark:bg-variant1-dark rounded-full text-sm text-primary-dark dark:text-primary-light placeholder-primary-dark dark:placeholder-primary-light outline-none"
        type="text"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
      />
    </div>
  );
};
