import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBill,
  getBills,
  getBill,
  editBill,
  deleteBill,
  getAllBills,
} from "../../store/actions/bill_action";
import { SEARCH_TERMS } from "../enums/bills_enum";
// Get All Data
export const useAllBills = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bill);
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
        await dispatch(deleteBill(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getBills({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getBills({
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
    dispatch(getBills({}));
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
export const useSingleBill = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bill);
  useEffect(() => {
    dispatch(getBill(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllBills = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bill);
  useEffect(() => {
    dispatch(getAllBills());
  }, []);
  return [data];
};
// Add Data
export const useCreateBill = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addBill(data));
  };
  return [addData];
};
export const useUpdateBill = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editBill(id, data));
  };
  return [updateData];
};
