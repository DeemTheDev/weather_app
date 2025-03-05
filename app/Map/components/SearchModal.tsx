import React from "react";
import CustomModal from "./CustomModal";
import Search from "./Search";
import { useMapContext } from "../context/MapContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { handleLocationSelect } = useMapContext();

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Search Location">
      <div className="w-full" style={{ position: "relative", zIndex: 10001 }}>
        <Search
          onLocationSelect={(lat, lon) => {
            handleLocationSelect(lat, lon);
            onClose();
          }}
        />
      </div>
    </CustomModal>
  );
};

export default SearchModal;
