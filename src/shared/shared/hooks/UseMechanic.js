import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMechanic,
  getMechanics,
  getMechanic,
  editMechanic,
  deleteMechanic,
  getAllMechanics,
} from "../../store/actions/mechanic_action";
import { SEARCH_TERMS } from "../enums/mechanics_enum";
// Get All Data
export const useAllMechanics = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mechanic);
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
        await dispatch(deleteMechanic(deleteEntry));
      }
      if (term && term.length > 0) {
        setQ(term);
        dispatch(
          getMechanics({
            termField: termField ? termField : termField,
            term: q ? q : "",
            pageNumber,
            start_from: dateFrom,
            start_to: dateTo,
          })
        );
      } else {
        dispatch(
          getMechanics({
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
    dispatch(getMechanics({}));
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
export const useSingleMechanic = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mechanic);
  useEffect(() => {
    dispatch(getMechanic(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useSelectAllMechanics = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mechanic);
  useEffect(() => {
    dispatch(getAllMechanics());
  }, []);
  return [data];
};
// Add Data
export const useCreateMechanic = () => {
  const dispatch = useDispatch();
  const addData = async (data) => {
    await dispatch(addMechanic(data));
  };
  return [addData];
};
export const useUpdateMechanic = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editMechanic(id, data));
  };
  return [updateData];
};
