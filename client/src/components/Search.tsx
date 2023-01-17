import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  fullWidth?: boolean;
}

export const Search = ({ search, setSearch, fullWidth }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleReset = () => {
    setSearch('');
  };

  return (
    <TextField
      id='search'
      fullWidth={fullWidth}
      value={search}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment:
          search.length > 0 ? (
            <InputAdornment position='end'>
              <IconButton onClick={handleReset}>
                <ClearIcon color='primary' />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};
