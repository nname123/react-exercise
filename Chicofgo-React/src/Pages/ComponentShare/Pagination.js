import React, { useMemo } from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
  const { page } = styles;
  //   let pages = [];
  //   for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
  //     pages.push(i);
  //   }
  const pages = useMemo(() => {
    const total = parseInt(totalPosts);
    const perPage = parseInt(postsPerPage);
    // total / perPage 可以拿到分頁數 但可能是小數點 所以要Math.ceil無條件進位
    // new Array(Math.ceil(total / perPage)).fill()
    // 會得到[undefined, undefined, ...]看Math.ceil(total / perPage)值是多少就有幾個undefined
    // 再用map算出[1, 2, 3, ....]
    // 就拿到分業array
    return new Array(Math.ceil(total / perPage))
      .fill()
      .map((_, index) => index + 1);
  }, [totalPosts, postsPerPage]);
  return (
    <div className={`${page}`}>
      {pages.map((v, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              setCurrentPage(v);
            }}
            className="text-xl bg-indigo-300 mx-2 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
          >
            {v}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
