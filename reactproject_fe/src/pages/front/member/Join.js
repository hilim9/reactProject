import JoinContainer from '../../../containers/member/JoinContainer';
import { Helmet } from 'react-helmet-async';
import { MainTitle } from '../../../components/commons/TitleStyle';
import { useTranslation } from 'react-i18next';
import { OuterBox } from '../../../components/commons/OutlineStyle';

const Join = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('회원가입')}</title>
      </Helmet>
      <OuterBox>
        <MainTitle>{t('회원가입')}</MainTitle>
        <JoinContainer />
      </OuterBox>
    </>
  );
};

export default Join;
