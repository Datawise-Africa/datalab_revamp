import { useState } from 'react';
import PropTypes from 'prop-types';
import DatasetCard from './DatasetCard';

const DatasetGrid = ({ datasets, handleSingleDataModal, handleDownloadDataClick }) => {
  const datasetsPerPage = 6; // Set the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indices for slicing the datasets array
  const indexOfLastDataset = currentPage * datasetsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - datasetsPerPage;
  const currentDatasets = datasets.slice(indexOfFirstDataset, indexOfLastDataset);

  const totalPages = Math.ceil(datasets.length / datasetsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className='md:col-span-3 lg:col-span-3 lg:mt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {currentDatasets.map((dataset, index) => (
          <DatasetCard
            key={index}
            dataset={dataset}
            handleSingleDataModal={handleSingleDataModal}
            handleDownloadDataClick={handleDownloadDataClick}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center mt-16 ml-20'>
        <button
          className=' className="mt-8 p-2 bg-[#0E0C15]  text-white text-lg rounded-lg shadow-md hover:bg-gray-600 transition '
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='px-4 py-2'>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className=' className="mt-8 p-2 bg-[#0E0C15] text-white text-lg rounded-lg shadow-md hover:bg-gray-600 transition '
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

DatasetGrid.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSingleDataModal: PropTypes.func.isRequired,
  handleDownloadDataClick: PropTypes.func.isRequired,
};

export default DatasetGrid;
