import { Helmet } from 'react-helmet-async';

import { QuestionsView } from 'src/sections/questions/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> 問題選択 | テスト対策アプリ </title>
      </Helmet>

      <QuestionsView />
    </>
  );
}
