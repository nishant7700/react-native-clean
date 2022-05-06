import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCustomer,
  getCustomers,
  getCustomer,
  editCustomer,
  deleteCustomer,
  getAllCustomers,
} from "../../store/actions/customer_action";
import { SEARCH_TERMS } from "../enums/customers_enum";
// Get All Data
export const useAllCustomers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer);
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
        await dispatch(deleteCustomer(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getCustomers({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getCustomers({
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
    dispatch(getCustomers({}));
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
export const useSingleCustomer = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(getCustomer(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllCustomers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);
  return [data];
};
// Add Data
export const useCreateCustomer = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addCustomer(data));
  };
  return [addData];
};
export const useUpdateCustomer = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editCustomer(id, data));
  };
  return [updateData];
};
