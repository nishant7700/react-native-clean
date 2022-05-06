import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBike,
  getBikes,
  getBike,
  editBike,
  deleteBike,
  getAllBikes,
} from "../../store/actions/bike_action";
import { SEARCH_TERMS } from "../enums/bikes_enum";
// Get All Data
export const useAllBikes = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bike);
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
        await dispatch(deleteBike(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getBikes({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getBikes({
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
    dispatch(getBikes({}));
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
export const useSingleBike = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bike);
  useEffect(() => {
    dispatch(getBike(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllBikes = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bike);
  useEffect(() => {
    dispatch(getAllBikes());
  }, []);
  return [data];
};
// Add Data
export const useCreateBike = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addBike(data));
  };
  return [addData];
};
export const useUpdateBike = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editBike(id, data));
  };
  return [updateData];
};
