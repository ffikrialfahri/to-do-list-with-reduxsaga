import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilterStatus,
  setFilterCategory,
  setSearchKeyword,
} from '../redux/actions/filterActions';

function FilterControls() {
  const dispatch = useDispatch();
  const { status, category, keyword } = useSelector((state) => state.filter);

  return (
    <div className="filter-controls">
      <select value={status} onChange={(e) => dispatch(setFilterStatus(e.target.value))}>
        <option value="All">Semua Status</option>
        <option value="Active">Aktif</option>
        <option value="Completed">Selesai</option>
      </select>

      <select value={category} onChange={(e) => dispatch(setFilterCategory(e.target.value))}>
        <option value="All">Semua Kategori</option>
        <option value="Pribadi">Pribadi</option>
        <option value="Pekerjaan">Pekerjaan</option>
        <option value="Belajar">Belajar</option>
      </select>

      <input
        type="text"
        placeholder="Cari tugas..."
        value={keyword}
        onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
      />
    </div>
  );
}

export default FilterControls;
