import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
    // <SvgColor icon_name={name} />
    <SvgColor src={name} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'ホーム',
    path: '/',
    icon: icon("house"),
  },
  {
    title: '問題一覧',
    path: '/questions',
    icon: icon('card-checklist'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
