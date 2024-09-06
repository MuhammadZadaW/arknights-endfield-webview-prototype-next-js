"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import datas from "@public/json/datas.json"
import Link from "next/link";

const Operators = () => {

  const router = useRouter()

  const [rowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDatas] = useState(datas.length)
  const [filteredData, setFilteredData] = useState(datas);

  const [filters, setFilters] = useState({
    name: '',
    rarity: '',
    class: '',
    faction: '',
    weapon: ''
  });

  const rarityList = Array.from(new Set(datas.map(data => data.rarity)))
  const classList = Array.from(new Set(datas.map(data => data.class)))
  const factionList = Array.from(new Set(datas.map(data => data.faction)))
  const weaponList = Array.from(new Set(datas.map(data => data.weapon)))

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {

    setFilteredData(applyFilters)
    setCurrentPage(1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const applyFilters = () => {
    let filtered = datas;

    if (filters.name) {
      filtered = filtered.filter((data) => data.codename.toLowerCase().includes(filters.name.toLowerCase()))
    }
    if (filters.rarity) {
      filtered = filtered.filter((data) => data.rarity === filters.rarity);
    }
    if (filters.class) {
      filtered = filtered.filter((data) => data.class === filters.class);
    }
    if (filters.faction) {
      filtered = filtered.filter((data) => data.faction === filters.faction);
    }
    if (filters.weapon) {
      filtered = filtered.filter((data) => data.weapon === filters.weapon);
    }

    return filtered;
  };

  const GenPageList = () => {
    var pageList = []
    if (totalPages <= 10) {
      for (let x = 1; x <= totalPages; x++ ) {

        if (x == currentPage) {
          pageList.push(
            <button
              key={x}
              aria-current="page" 
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {currentPage}
              </button>
          )
          continue
        }

        pageList.push(
          <button
            onClick={() => setCurrentPage(x)}
            key={x}   
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            {x}
          </button>
        )
      }
    } else {

      const leftSide = Math.max(1, currentPage - 2);
      const rightSide = Math.min(totalPages, currentPage + 2);

      if (leftSide >= 3) {
        for (let x = 1; x < 2; x++ ) {
          if (x == currentPage) {
            pageList.push(
              <button 
                key={x}
                aria-current="page" 
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {currentPage}
              </button>
            )
            continue
          }
  
          pageList.push(
            <button  
              onClick={() => setCurrentPage(x)}
              key={x} 
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {x}
            </button>
          )
        }
        pageList.push(
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
        )
      } else {
        for (let x = 1; x < leftSide; x++) {
          if (x == currentPage) {
            pageList.push(
              <button 
                key={x}
                aria-current="page" 
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {currentPage}
              </button>
            )
            continue
          }
  
          pageList.push(
            <button 
              onClick={() => setCurrentPage(x)}
              key={x}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                {x}
            </button>
          )
        }
      }

      for (let x = leftSide; x <= rightSide; x++) {
        if (x == currentPage) {
          pageList.push(
            <button 
              key={x}
              aria-current="page" 
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {currentPage}
            </button>
          )
          continue
        }

        pageList.push(
          <button  
            onClick={() => setCurrentPage(x)}
            key={x} 
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {x}
          </button>
        )
      }

      if (rightSide < totalPages - 1) {
        pageList.push(
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
        )
        pageList.push(
          <button 
            onClick={() => setCurrentPage(totalPages)}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {totalPages}
          </button>
        )
      } else {
        for (let x = rightSide + 1; x <= totalPages; x++) {
          if (x == currentPage) {
            pageList.push(
              <button 
                key={x}
                aria-current="page" 
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {currentPage}
              </button>
            )
            continue
          }
  
          pageList.push(
            <button
              onClick={() => setCurrentPage(x)}
              key={x}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                {x}
            </button>
          )
        }
      }
    }

    return pageList
  }

  var pageList = GenPageList()

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" />
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="max-w-[50px] px-4 py-4 font-medium text-black dark:text-white">
                  Rarity
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Class
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Faction
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Weapon
                </th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td></td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark xl:pl-11">
                    <input 
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                      placeholder="Search by Name"
                      className="min-w-[200px] rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <select name="rarity" onChange={handleFilterChange} className="mxn-w-[50px] h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                      <option defaultValue="" value="">All</option>
                      {rarityList.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <select name="class" onChange={handleFilterChange} className="min-w-[100px] h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                      <option defaultValue="" value="">All</option>
                      {classList.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <select name="faction" onChange={handleFilterChange} className="min-w-[120px] h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                      <option defaultValue="" value="">All</option>
                      {factionList.map((f, i) => (
                        <option key={i} value={f}>{f}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <select name="weapon" onChange={handleFilterChange} className="h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                      <option defaultValue="" value="">All</option>
                      {weaponList.map((w, i) => (
                        <option key={i} value={w}>{w}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              {currentRows.map((data, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <div>
                      <Image 
                        className="rounded-full aspect-square object-cover"
                        src={"/images/icon-endfield/" + data.icon} 
                        alt={data.codename} 
                        width={100} height={100} />
                    </div>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      <Link href={"/operator/" + data.codename.replace(" ", "_")} className="hover:text-sky-500">
                        {data.codename}
                      </Link>
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {data.rarity}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {data.class}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {data.faction}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-1.5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {data.weapon}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        {totalPages < 2 ? <></> : 
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined} 
            className={(currentPage === 1 ? "pointer-events-none " : "") + "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"}>
              Previous
          </button>
          
          <button 
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined} 
            className={(currentPage === totalPages ? "pointer-events-none " : "") + "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"}>
              Next
          </button>
        </div>}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium px-1">{1 + (currentPage - 1) * rowsPerPage}</span>
              to
              <span className="font-medium px-1">{(currentPage - 1) * rowsPerPage + currentRows.length}</span>
              of
              <span className="font-medium px-1">{totalDatas}</span>
              results
            </p>
          </div>
          <div hidden={totalPages < 2}>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : undefined}
                className={(currentPage === 1 ? "pointer-events-none " : "") + "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}>
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              
              {pageList}
   
              <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
                className={(currentPage === totalPages ? "pointer-events-none " : "") + "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}>
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operators;
