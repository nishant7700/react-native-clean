import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
} from "../../store/actions/product_action";
import { SEARCH_TERMS } from "../enums/products_enum";
// Get All Data
export const useAllProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
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
        await dispatch(deleteProduct(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getProducts({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getProducts({
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
    dispatch(getProducts({}));
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
export const useSingleProduct = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return [data];
};
// Add Data
export const useCreateProduct = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addProduct(data));
  };
  return [addData];
};
export const useUpdateProduct = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editProduct(id, data));
  };
  return [updateData];
};
