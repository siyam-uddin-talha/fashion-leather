import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UsePostData from '../../../api/UsePostData'
import BackDropLoading from "../../Loading/BackDropLoading";
import { useHistory } from 'react-router';


export default function CancleOrder({ dialogOpen, setDialogOpen, id, cardId }) {

    const history = useHistory()

    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleCancleOrder = async () => {
        setDialogOpen(false);
        setLoading(true)
        try {
            const { data } = await UsePostData(`/api/order/my/orders/${id}`, { cardId: cardId ? cardId : '' })

            if (data.success) {
                setLoading(false)
                history.replace('/')
            }
        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }
    return (
        <div>

            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You sure ?"}
                </DialogTitle>
                <DialogContent dividers >
                    <DialogContentText id="alert-dialog-description">
                        Do you want to cancle your Order
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Disagree</Button>

                    <Button onClick={handleCancleOrder} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {loading && <BackDropLoading />}

        </div>
    );
}
