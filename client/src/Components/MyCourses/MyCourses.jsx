import * as actions    from "../../Redux/actions"
import Paginated       from "../Paginated/Paginated";
import React           from "react";
import styles          from "./MyCourses.module.css";
import { useEffect }   from "react";
import { useDispatch } from "react-redux";

const MyCourses = () => {
  const dispatch = useDispatch();
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(actions.resetPaginated())
    dispatch(actions.getCoursesOfUser(userFromLocalStorage.id));
  }, [dispatch, userFromLocalStorage.id])

  return (
    <div className={styles["my-courses-main"]}>
      <Paginated /> 
    </div>
  );
};

export default MyCourses;