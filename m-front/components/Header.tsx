import React, { ReactNode } from 'react'
// material-ui コンポーネント
import { AppBar, Toolbar, Typography } from '@material-ui/core';

interface IProps {
  children: ReactNode;
  width: number;
  height: number;
}

const Header: React.FC<IProps> = (props: IProps) => {
  return (
    <AppBar position="fixed" color="secondary" style={{ flexDirection: 'row' }}>
      <Toolbar style={{ height: props.height, width: props.width, paddingRight: 0 }}>{props.children}</Toolbar>
      <div style={{ flexGrow: 1 }}>
        <Typography variant="h3">
          law-tutorial
    </Typography>
      </div>
    </AppBar>
  )
}

export default Header
