import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  getCategorys,
  getCategory,
  editCategory,
  deleteCategory,
  getAllCategorys,
} from "../../store/actions/category_action";
import { SEARCH_TERMS } from "../enums/categorys_enum";
// Get All Data
export const useAllCategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category);
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
        await dispatch(deleteCategory(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getCategorys({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getCategorys({
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
    dispatch(getCategorys({}));
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
export const useSingleCategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategory(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllCategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getAllCategorys());
  }, []);
  return [data];
};
// Add Data
export const useCreateCategory = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addCategory(data));
  };
  return [addData];
};
export const useUpdateCategory = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editCategory(id, data));
  };
  return [updateData];
};
