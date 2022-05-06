import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addLocation,
  getLocations,
  getLocation,
  editLocation,
  deleteLocation,
  getAllLocations,
} from "../../store/actions/location_action";
import { SEARCH_TERMS } from "../enums/locations_enum";
// Get All Data
export const useAllLocations = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.location);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
  const [q, setQ] = useState(null);
  const [term, setTerm] = useState(null);
  const [termField, setTermField] = useState(SEARCH_TERMS[0]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  useEffect(() => {
    async function allQuery() {
      if (deleteEntry) {
        await dispatch(deleteLocation(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getLocations({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getLocations({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      }
    }
    allQuery();
  }, [deleteEntry, term, pageNumber, dateFrom, dateTo]);
  useEffect(() => {
    setPageNumber(1);
  }, [term, dateTo, dateFrom]);

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };
  const resetFilter = () => {
    setPageNumber(1);
    setQ(null);
    setTerm("");
    setDateFrom("");
    setDateTo("");
    dispatch(getLocations({}));
  };

  return [
    data,
    pageNumber,
    setPageNumber,
    q,
    term,
    setTerm,
    termField,
    setTermField,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    deleteBtnClicked,
    resetFilter,
  ];
};

// Get Single Data
export const useSingleLocation = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.location);
  useEffect(() => {
    dispatch(getLocation(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllLocations = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.location);
  useEffect(() => {
    dispatch(getAllLocations());
  }, []);
  return [data];
};
// Add Data
export const useCreateLocation = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addLocation(data));
  };
  return [addData];
};
export const useUpdateLocation = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editLocation(id, data));
  };
  return [updateData];
};
