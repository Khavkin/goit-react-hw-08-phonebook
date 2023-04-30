import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/phonebook/phonebookSlice';
import { selectFilter } from 'redux/selectors';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleOnChange = ({ currentTarget }) => {
    dispatch(setFilter(currentTarget.value));
  };

  return (
    <>
      <h3>Find contacts by name</h3>
      <input value={filter} onChange={handleOnChange}></input>
    </>
  );
};

export default Filter;
