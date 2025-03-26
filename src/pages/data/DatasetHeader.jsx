import PropTypes from 'prop-types';

import SearchDatasets from "./SearchDatasets";
import { useAuth } from "../../storage/AuthProvider";
import datalab from "/assets/datalab-logo-dark.svg";
import user_icon from "/assets/user.svg";

const DatasetHeader = ({ handleAuthModalToggle, onSearchResults, onSearchReset }) => {
  const { state, dispatch, actions } = useAuth();

  return (
    <div className='flex items-center justify-between gap-12'>
      <div className='flex items-center space-x-1'>
        <img src={datalab} alt="Datalab Logo" className="w-6 h-8" />
        <h2 className="h4 text-xl font-bold ">Datalab</h2>
      </div>


      <div className="hidden lg:flex flex-grow max-w-xl">
        <SearchDatasets onSearchResults={onSearchResults} onSearchReset={onSearchReset} className="w-full" />
      </div>


      <div className="">
        {state.userId ? (
          <>
            <span className='mr-4'>Welcome, {state.firstName}</span>
            <button
              onClick={() => dispatch(actions.LOGOUT())}
              className="py-2 px-8 border border-[#0F2542] rounded-md bg-[#474060] text-[#FFF] hover:bg-[#1B1B2E] transition-all duration-300 flex gap-1"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleAuthModalToggle}
            className="py-2 px-3 border border-[#0F2542] rounded-md bg-[#474060] text-[#FFF] hover:bg-[#1B1B2E] transition-all duration-300 flex gap-1"
          >
            <img src={user_icon} alt="User Icon" className="w-6 h-6" />
            Login
          </button>
        )}
      </div>
    </div>
  );
}

DatasetHeader.propTypes = {
  handleAuthModalToggle: PropTypes.func.isRequired,
  onSearchResults: PropTypes.func.isRequired,
  onSearchReset: PropTypes.func.isRequired,
}

export default DatasetHeader;