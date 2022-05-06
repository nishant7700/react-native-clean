import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBrand,
  getBrands,
  getBrand,
  editBrand,
  deleteBrand,
  getAllBrands,
} from "../../store/actions/brand_action";
import { SEARCH_TERMS } from "../enums/brands_enum";
// Get All Data
export const useAllBrands = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.brand);
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
        await dispatch(deleteBrand(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getBrands({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getBrands({
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
    dispatch(getBrands({}));
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
export const useSingleBrand = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(getBrand(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllBrands = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(getAllBrands());
  }, []);
  return [data];
};
// Add Data
export const useCreateBrand = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addBrand(data));
  };
  return [addData];
};
export const useUpdateBrand = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editBrand(id, data));
  };
  return [updateData];
};
