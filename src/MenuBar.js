import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
//import { Link } from 'react-router-dom'; // react-router-domのLinkを使用する

const MenuBar = ({ onHomeClick, onEditUnitClick, onEditProblemClick}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    問題データベース
                </Typography>
                {/* <Button component={Link} to="/" color="inherit">ホーム</Button>
                <Button component={Link} to="/editunit" color="inherit">単元の編集</Button>
                <Button component={Link} to="/editproblem" color="inherit">問題の編集</Button> */}
                <Button onClick={onHomeClick} color='inherit'>ホーム</Button>
                <Button onClick={onEditUnitClick} color='inherit'>単元の編集</Button>
                <Button onClick={onEditProblemClick} color='inherit'>問題の編集</Button>
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;