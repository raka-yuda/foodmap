interface Props {
  headerTable: string[];
  dataTable: any;
  dataPaging: any;
  hrefPaging: (page: number) => void;
}

const MainTable = ({
  headerTable,
  dataTable,
  dataPaging,
  hrefPaging,
}: Props) => {
  const pagination = (page: number, lastPage: number) => {
    let pageList: number[] = [];
    if (page === 1) {
      for (let i = 1; i <= 3; i++) {
        pageList = pageList.concat(i);
      }
    } else if (page === lastPage) {
      page = page - 2;
      for (let i = 1; i <= 3; i++) {
        pageList = pageList.concat(page);
        page++;
      }
    } else if (page < lastPage) {
      pageList = [page - 1, page, page + 1];
    }
    return pageList;
  };

  const totalPage = Math.ceil(dataPaging.length_all_data / dataPaging.length);
  const currentPage = dataPaging.page;
  const paging = pagination(currentPage, totalPage);
  const dataFrom = (dataPaging.page - 1) * dataPaging.length;

  const dataUntil = dataFrom + dataPaging.length;

  const handlerPagination = (page: number) => {
    hrefPaging(page);
  };

  return (
    <div className="align-middle inline-block min-w-full overflow-hidden bg-white shadow-dashboard pt-3">
      <table className="min-w-full">
        <thead>
          <tr>
            {headerTable &&
              headerTable.map((head, indexHead) => (
                <th
                  key={`header-${indexHead}`}
                  className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 text-base"
                >
                  {head}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {dataTable &&
            dataTable.map((item: any, indexData: number) => {
              return (
                <tr key={`data-${indexData}`}>
                  {item &&
                    Object.keys(item).map((itemKey, indexValue) => {
                      return (
                        <td
                          key={`value-${indexValue}`}
                          className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                        >
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm leading-5 text-gray-800">
                                {item[itemKey] ?? "-"}
                              </div>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between my-2 work-sans px-8 py-2">
        <div>
          <p className="text-sm leading-5 text-[#c23531]">
            Showing
            <span className="font-medium px-1">
              {isNaN(dataFrom) ? "0" : dataFrom}
            </span>
            to
            <span className="font-medium px-1">
              {isNaN(dataUntil) ? "0" : dataUntil}
            </span>
            of
            <span className="font-medium px-1">
              {dataPaging.length_all_data ?? "0"}
            </span>
            results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex shadow-sm">
            <div>
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Previous"
                onClick={() => {
                  handlerPagination(currentPage - 1);
                }}
                disabled={currentPage === 1}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div>
              {paging &&
                paging.map((page, index) => (
                  <button
                    key={`pagination-${index}`}
                    onClick={() => handlerPagination(page)}
                    className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium  focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary ${
                      page === currentPage
                        ? "text-[#c23531]"
                        : "text-gray-400 hover:text-[#c23531]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
            </div>
            <div v-if="pagination.current_page < pagination.last_page">
              <button
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Next"
                onClick={() => {
                  handlerPagination(currentPage + 1);
                }}
                disabled={currentPage === totalPage}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MainTable;
