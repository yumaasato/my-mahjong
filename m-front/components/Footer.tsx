import React, { useCallback } from 'react'
import { animateScroll } from 'react-scroll';
// utils
import { IsMobile } from '../src/utils/breakpoint';

// material-ui コンポーネント
import { AppBar, Toolbar, Box, Typography } from '@material-ui/core';

interface IProps {
  height: number;
}

const FooterComponent: React.FC<IProps> = (props: IProps) => {
  // mobileサイズかどうか
  const isMobile = IsMobile();

  // フッター 一番上へ移動するボタン 横幅
  const topToBtnWidth = !isMobile ? 100 : 50;

  // 一番上へ移動
  const scrollToTop = useCallback(() => animateScroll.scrollToTop(), []);

  return (
    <AppBar position="fixed" color="secondary" style={{ top: 'auto', bottom: 0 }}>
      <Toolbar style={{ height: props.height, paddingRight: 0 }}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h3">
          law-tutorial
          </Typography>
        </div>
        <Box bgcolor="secondary.main" onClick={scrollToTop} style={{ height: props.height, width: topToBtnWidth }}>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default FooterComponent;
