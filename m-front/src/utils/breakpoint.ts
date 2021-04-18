import { useWindowDimensions } from './dimensions'; // 画面サイズ 取得

// レスポンシブ ブレイクポイント 設定

// スマホ ~520px
const mobile: number[] = [0, 520];

// タブレット 520px~960px
const tablet: number[] = [520, 960];

// Web 960px~
const web: number[] = [960, 0];

////////////////////////////////////////////////////////////////

// スマホサイズかどうか
export const IsMobile = () => {
  const { width } = useWindowDimensions();
  if (width >= 0 && width < mobile[1]) {
    return true;
  } else {
    return false;
  }
};

// タブレットサイズかどうか
export const IsTablet = () => {
  const { width } = useWindowDimensions();
  if (width >= tablet[0] && width < tablet[1]) {
    return true;
  } else {
    return false;
  }
};

// Webサイズかどうか
export const IsWeb = () => {
  const { width } = useWindowDimensions();
  if (width >= web[0]) {
    return true;
  } else {
    return false;
  }
};
