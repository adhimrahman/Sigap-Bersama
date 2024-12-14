import PropTypes from "prop-types";

export default function SearchBar({ query, onChange }) {
    return (
        <div className="flex justify-center mb-8">
            <input type="text" className="w-full max-w-2xl p-4 rounded-lg shadow-md outline-none outline-2 outline-gray-300 my-5" placeholder="Search by creator, name, or location..." value={query} onChange={onChange} />
        </div>
    );
}

SearchBar.propTypes = {
    query: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};