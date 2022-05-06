import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBanner,
  getBanners,
  getBanner,
  editBanner,
  deleteBanner,
  getAllBanners,
} from "../../store/actions/banner_action";
import { SEARCH_TERMS } from "../enums/banners_enum";
// Get All Data
export const useAllBanners = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.banner);
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
        await dispatch(deleteBanner(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getBanners({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getBanners({
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
    dispatch(getBanners({}));
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
export const useSingleBanner = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.banner);
  useEffect(() => {
    dispatch(getBanner(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllBanners = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.banner);
  useEffect(() => {
    dispatch(getAllBanners());
  }, []);
  return [data];
};
// Add Data
export const useCreateBanner = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addBanner(data));
  };
  return [addData];
};
export const useUpdateBanner = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editBanner(id, data));
  };
  return [updateData];
};
