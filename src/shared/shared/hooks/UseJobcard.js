import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addJobcard,
  getJobcards,
  getJobcard,
  editJobcard,
  deleteJobcard,
  getAllJobcards,
} from "../../store/actions/jobcard_action";
import { SEARCH_TERMS } from "../enums/jobcards_enum";
// Get All Data
export const useAllJobcards = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.jobcard);
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
        await dispatch(deleteJobcard(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getJobcards({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getJobcards({
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
    dispatch(getJobcards({}));
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
export const useSingleJobcard = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.jobcard);
  useEffect(() => {
    dispatch(getJobcard(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllJobcards = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.jobcard);
  useEffect(() => {
    dispatch(getAllJobcards());
  }, []);
  return [data];
};
// Add Data
export const useCreateJobcard = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addJobcard(data));
  };
  return [addData];
};
export const useUpdateJobcard = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editJobcard(id, data));
  };
  return [updateData];
};
