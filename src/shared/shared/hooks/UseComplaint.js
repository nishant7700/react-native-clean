import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addComplaint,
  getComplaints,
  getComplaint,
  editComplaint,
  deleteComplaint,
  getAllComplaints,
} from "../../store/actions/complaint_action";
import { SEARCH_TERMS } from "../enums/complaints_enum";
// Get All Data
export const useAllComplaints = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.complaint);
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
        await dispatch(deleteComplaint(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getComplaints({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getComplaints({
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
    dispatch(getComplaints({}));
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
export const useSingleComplaint = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.complaint);
  useEffect(() => {
    dispatch(getComplaint(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllComplaints = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.complaint);
  useEffect(() => {
    dispatch(getAllComplaints());
  }, []);
  return [data];
};
// Add Data
export const useCreateComplaint = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addComplaint(data));
  };
  return [addData];
};
export const useUpdateComplaint = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editComplaint(id, data));
  };
  return [updateData];
};
