import PropTypes from "prop-types";
import FilterSection from "./FilterSection";

const FilterPanel = ({ filters, setFilters }) => {
  // Mapping of original option values to user-friendly names
  const optionMappings = {
    accessLevel: {
      public: "Public Access",
      non_profit: "Non-Profit",
      commercial: "Commercial",
      students: "Student",
    },
    dataType: {
      education: "Education",
      healthcare: "Healthcare",
      agriculture: "Agricultural",
      environmental: "Environmental",
    },
    region: {
      "East Africa": "East African ",
      "West Africa": "West African ",
      "North Africa": "North African ",
      "Southern Africa": "Southern African ",
    },
    timeframe: {
      "Last Year": "Past Year",
      "Last 5 Years": "Past 5 Years",
      "5+ Years": "More than 5 Years",
    },
  };

  const handleManualReset = () => {
    setFilters({
      accessLevel: [],
      dataType: [],
      region: [],
      timeframe: [],
    });
  };

  return (
    <div className="lg:col-span-1">
      <div className="flex flex-col space-y-4 mt-5">
        <FilterSection 
          title="Access Level" 
          options={Object.values(optionMappings.accessLevel)} 
          category="accessLevel" 
          filters={filters} 
          setFilters={setFilters} 
        />
        <FilterSection 
          title="Data Type" 
          options={Object.values(optionMappings.dataType)} 
          category="dataType" 
          filters={filters} 
          setFilters={setFilters} 
        />
        <FilterSection 
          title="Region" 
          options={Object.values(optionMappings.region)} 
          category="region" 
          filters={filters} 
          setFilters={setFilters} 
        />
        <FilterSection 
          title="Timeframe" 
          options={Object.values(optionMappings.timeframe)} 
          category="timeframe" 
          filters={filters} 
          setFilters={setFilters} 
        />
        
        <button 
          onClick={handleManualReset} 
          className="mt-8 p-2 bg-[#26A37E]  text-white rounded-lg shadow-md hover:bg-[#F7FDFA] transition w-1/2">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
}

export default FilterPanel;
