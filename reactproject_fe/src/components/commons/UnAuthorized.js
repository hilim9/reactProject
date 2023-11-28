import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UnAuthorized = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('접근권한이 없는 페이지에 접근하셨습니다')}</h1>;
    </>
  );
};

export default UnAuthorized;
