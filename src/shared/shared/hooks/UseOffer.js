import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addOffer,
  getOffers,
  getOffer,
  editOffer,
  deleteOffer,
  getAllOffers,
} from "../../store/actions/offer_action";
import { SEARCH_TERMS } from "../enums/offers_enum";
// Get All Data
export const useAllOffers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.offer);
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
        await dispatch(deleteOffer(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getOffers({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getOffers({
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
    dispatch(getOffers({}));
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
export const useSingleOffer = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.offer);
  useEffect(() => {
    dispatch(getOffer(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllOffers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.offer);
  useEffect(() => {
    dispatch(getAllOffers());
  }, []);
  return [data];
};
// Add Data
export const useCreateOffer = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addOffer(data));
  };
  return [addData];
};
export const useUpdateOffer = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editOffer(id, data));
  };
  return [updateData];
};
