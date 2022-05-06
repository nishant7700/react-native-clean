import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addWhyuspoint,
  getWhyuspoints,
  getWhyuspoint,
  editWhyuspoint,
  deleteWhyuspoint,
  getAllWhyuspoints,
} from "../../store/actions/whyuspoint_action";
import { SEARCH_TERMS } from "../enums/whyuspoints_enum";
// Get All Data
export const useAllWhyuspoints = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.whyuspoint);
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
        await dispatch(deleteWhyuspoint(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getWhyuspoints({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getWhyuspoints({
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
    dispatch(getWhyuspoints({}));
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
export const useSingleWhyuspoint = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.whyuspoint);
  useEffect(() => {
    dispatch(getWhyuspoint(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllWhyuspoints = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.whyuspoint);
  useEffect(() => {
    dispatch(getAllWhyuspoints());
  }, []);
  return [data];
};
// Add Data
export const useCreateWhyuspoint = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addWhyuspoint(data));
  };
  return [addData];
};
export const useUpdateWhyuspoint = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editWhyuspoint(id, data));
  };
  return [updateData];
};
