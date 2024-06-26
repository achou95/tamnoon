import { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import CrownJewel from "./CrownJewel";

const headers = [
  {
    key: '_id',
    label: 'id'
  },
  {
    key: 'created',
    label: 'Creation Date'
  },
  {
    key: 'criticalityFactor',
    label: 'Criticality'
  },
  {
    key: 'enrich.assetType',
    label: 'Type'
  },
  {
    key: 'enrich.env',
    label: 'Env'
  },
  {
    key: 'enrich.isCrownJewel',
    label: 'Is Crown Jewel'
  },
  {
    key: 'name',
    label: 'Asset Name'
  },
  {
    key: 'owner.name',
    label: 'Owner Name'
  },
  {
    key: 'tags',
    label: 'Tags'
  }
]

const assetTypes = [
  'COMPUTE',
  'NETWORK',
  'IAM',
  'STORAGE'
]

function AssetTable({data}) {
  const [orderBy, setOrderBy] = useState('criticalityFactor')
  const [assetTypeFilter, setAssetTypeFilter] = useState([])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const displayTags = (tags) => {
    let res = ''
    for (let tag of tags) {
      res = res ? `${res}, ${tag.key}: ${tag.value}` : `${tag.key}: ${tag.value}` 
    }
    return res
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAssetTypeFilter(
      typeof value === 'string' ? value.split(',') : value,
    );

  };

  data.sort((a,b) => {
    const temp = orderBy.split('.')
    if (temp.length > 1) {
      if (!b[temp[0]][temp[1]] || a[temp[0]][temp[1]] < b[temp[0]][temp[1]]) {
        return -1
      } else if (!a[temp[0]][temp[1]] || a[temp[0]][temp[1]] > b[temp[0]][temp[1]]) {
        return 1
      }
  
      return 0      
    }

    if (a[orderBy] < b[orderBy]) {
      return -1
    } else if (a[orderBy] > b[orderBy]) {
      return 1
    }

    return 0
  })

  return (
    <Box>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="asset-type-filter-label">Asset Type</InputLabel>
        <Select
          labelId="asset-type-filter-label"
          id="asset-type-filter"
          multiple
          value={assetTypeFilter}
          label="Asset Type"
          onChange={handleChange}
        >
          {assetTypes.map((type) => (
            <MenuItem
              key={type}
              value={type}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer>

        <Table>
          <TableHead>
            <TableRow>
              {headers.map((h) => (
                <TableCell key={h.key} sx={{fontWeight: 'bold'}}>
                  <TableSortLabel active={orderBy === h.key} onClick={() => setOrderBy(h.key)}>{h.label}</TableSortLabel></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter((d) => {
              if (assetTypeFilter.length === 0) {
                return d
              } else if (assetTypeFilter.length > 0 && assetTypeFilter.includes(d.enrich.assetType)) {
                return d
              }

              return null
            }).map((d) => (
              <TableRow key={d._id}>
                <TableCell>{d._id}</TableCell>
                <TableCell>{formatDate(d.created)}</TableCell>
                <TableCell>{d.criticalityFactor}</TableCell>
                <TableCell>{d.enrich.assetType}</TableCell>
                <TableCell>{d.enrich.env}</TableCell>
                <TableCell><CrownJewel isCrownJewel={d.enrich.isCrownJewel} crownJewelIndicator={d.enrich.crownJewelIndicator} /></TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.owner.name}</TableCell>
                <TableCell>{displayTags(d.tags)}</TableCell>
              </TableRow>          
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AssetTable;
