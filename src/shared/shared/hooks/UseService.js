import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addService,
  getServices,
  getService,
  editService,
  deleteService,
  getAllServices,
} from "../../store/actions/service_action";
import { SEARCH_TERMS } from "../enums/services_enum";
// Get All Data
export const useAllServices = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service);
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
        await dispatch(deleteService(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getServices({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getServices({
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
    dispatch(getServices({}));
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
export const useSingleService = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service);
  useEffect(() => {
    dispatch(getService(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllServices = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service);
  useEffect(() => {
    dispatch(getAllServices());
  }, []);
  return [data];
};
// Add Data
export const useCreateService = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addService(data));
  };
  return [addData];
};
export const useUpdateService = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editService(id, data));
  };
  return [updateData];
};
