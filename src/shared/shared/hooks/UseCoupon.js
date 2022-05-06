import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCoupon,
  getCoupons,
  getCoupon,
  editCoupon,
  deleteCoupon,
  getAllCoupons,
} from "../../store/actions/coupon_action";
import { SEARCH_TERMS } from "../enums/coupons_enum";
// Get All Data
export const useAllCoupons = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coupon);
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
        await dispatch(deleteCoupon(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getCoupons({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getCoupons({
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
    dispatch(getCoupons({}));
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
export const useSingleCoupon = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(getCoupon(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllCoupons = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);
  return [data];
};
// Add Data
export const useCreateCoupon = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addCoupon(data));
  };
  return [addData];
};
export const useUpdateCoupon = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editCoupon(id, data));
  };
  return [updateData];
};
