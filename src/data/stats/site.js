import dayjs from 'dayjs';

const data = [
  {
    label: 'Last updated at',
    key: 'pushed_at',
    format: (x) => dayjs(x).format('MMMM DD, YYYY'),
  },
];

export default data;
