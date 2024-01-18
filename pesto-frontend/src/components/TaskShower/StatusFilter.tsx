import { useFetchTasks } from '@/src/hooks/useFetchTasks';
import { ITask } from '@/src/types';
import React, { useState } from 'react';

const FilterAndSorters = () => {
    const [filters, setFilters] = useState<any>();
    const [orderBy, setOrderBy] = useState('asc');
    const { fetchTasks } = useFetchTasks();

    const handleFilterByStatus = async (status: ITask['status']) => {
        if (status) setFilters({ status });

        await fetchTasks(status ? { orderBy, status } : {});
    };
    const handleSort = async (orderBy: 'asc' | 'desc') => {
        setOrderBy(orderBy);
        await fetchTasks(orderBy ? filters ? { orderBy, ...filters } : { orderBy } : {});
    };

    return (
        <>
            <div>
                <label
                    htmlFor="sort_by"
                    className="block md:mb-2 text-lg font-medium text-gray-900 text-black"
                >
                    Filter By
                </label>
                <select
                    // multiple
                    id="sort_by"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    onChange={(e) => handleFilterByStatus(e.target.value as any)}
                >
                    <option selected value="">
                        Default
                    </option>
                    <option value="to_do">To Do</option>
                    <option value="in_progress">InProgress</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div>
                <label
                    htmlFor="sort_by"
                    className="block md:mb-2 text-lg font-medium text-gray-900 text-black"
                >
                    Sort By
                </label>
                <select
                    // multiple
                    id="sort_by"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    onChange={(e) => handleSort(e.target.value as any)}
                >
                    <option selected value="">
                        Default
                    </option>
                    <option value="asc">Due first</option>
                    <option value="desc">Due last</option>
                </select>
            </div>
        </>
    );
};

export default FilterAndSorters;
