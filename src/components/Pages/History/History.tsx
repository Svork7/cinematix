import { Link } from "react-router-dom";
import {
  useAppSelector,
  useCurrentUser,
  useAppDispatch,
} from "../../../app/hooks";
import { User, deleteHistory } from "../../../redux/userSlice";
import PageHeader from "../PageHeader";
import styles from "./History.module.css";

export const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser() as User;
  const links: string[] = useAppSelector(
    (state) =>
      state.user[currentUser?.email as string].historySearch as string[]
  );

  const clearHistory = () => {
    dispatch(deleteHistory(currentUser?.email as string));
  };

  if (links.length > 0) {
    return (
      <div className={styles.history}>
        <PageHeader text={'Search history'} />
        <div className={styles.historyWrap}>
          <button onClick={clearHistory} className={styles.historyClear}>
            Clear History
          </button>
          {links.map((link, i) => (
            <Link to={link} className={styles.historyLink} key={i}>
              {link}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.history}>
      <PageHeader text={'History is empty'} />
    </div>
  );
};

