import { React, useEffect, useState } from 'react';
// import { React, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import './ViewPollsContainer.css';

const ViewPollsContainer = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleOnUpdate = e => {
    e.preventDefault();
    navigate('./update', {
      state: {
        begin_at: data.begin_at,
        end_at: data.end_at,
        nbr_voices: data.nbr_voices,
        logins_cands: data.logins_cands,
        logins_voters: data.logins_voters,
      },
    });
  };
  const handleOnDelete = e => {
    e.preventDefault();
    axios
      .delete('/api/7')
      .then(response => {
        // handle success
        console.log(response);
        navigate('./');
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get('/api/', {
        withCredentials: true,
      })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Container component="main" maxWidth="sm">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h2" variant="h6" color="primary">
            POLL NAME
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Begin at</b>
                </TableCell>
                <TableCell align="right">{data.begin_at}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>End at</b>
                </TableCell>
                <TableCell align="right">{data.end_at}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>nbr_voices</b>
                </TableCell>
                <TableCell align="right">{data.nbr_voices}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>logins_cands</b>
                </TableCell>
                <TableCell align="right">{data.logins_cands}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>logins_voters</b>
                </TableCell>
                <TableCell align="right">{data.logins_voters}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleOnUpdate}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={handleOnDelete}
            >
              Delete
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default ViewPollsContainer;
